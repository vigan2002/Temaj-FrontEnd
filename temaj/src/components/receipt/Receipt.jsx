import React, { useEffect, useState } from "react";
import "./style.scss";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getCartsUser, addOrders } from "../../api/cartApi";
import NotificationModal from "../notification/NotificationModal";
import { getProfile } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import { useMediaQuery } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

const Receipt = () => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [radioChecked, setRadioChecked] = useState(true);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });
  const { isAuthenticated, user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const { setCartItems } = useCart();

  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getCartsUser();
        const productsFromResponse = response.map((item) => ({
          productId: item.product.id,
          product_name: item.product.product_name,
          price: item.product.price,
          new: item.product.new,
          discount: item.product.discount,
          photo_texture_1: item.product.photo_texture_1,
          base_category: item.product.base_category,
          product_unique_code: item.product.product_unique_code,
          quantity: item.quantity,
          totalPrice: item.price,
        }));
        setProducts(productsFromResponse);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setProfileData(profile); // Set the fetched profile data
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProduct();
    if (isAuthenticated && user) {
      fetchProfile(); // Fetch profile data if the user is authenticated
    }
  }, [id, token, isAuthenticated, user]);

  useEffect(() => {
    const totalInvoicePrice = products
      .reduce((total, product) => total + product.totalPrice, 0)
      .toFixed(2);
    // setRadioChecked(totalInvoicePrice >= 300);
  }, [products]);

  // const handleRadioChange = () => {
  //   setRadioChecked(!radioChecked);
  // };

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
  };

  if (loading) {
    return <div style={{
      backgroundColor: 'var(--bck-color)'
    }}>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found in the cart.</div>;
  }

  const totalInvoicePrice = products
    .reduce((total, product) => total + product.totalPrice, 0)
    .toFixed(2);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    last_Name: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    // if (totalInvoicePrice < 300 && !radioChecked) {
    //   showNotification(
    //     "Please select the payment method for orders below 300€",
    //     "error"
    //   );
    //   return;
    // }

    const requestData = {
      address: values.address,
      company: values.company,
      city: values.city,
      country: values.country,
      phone_number: values.phone_number,
      description: values.description,
      quantity: Number(values.quantity),
      discount: Number(values.discount),
      total_price: Number(values.total_price),
      product: Number(id),
    };

    try {
      const response = await addOrders(requestData);
      showNotification("Order proceeded", "success");

      setCartItems([]);
      localStorage.removeItem("cartItems");

      navigate(`/receipt/success`, { state: { order: response.data } });
    } catch (error) {
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  return (
    <div className="receipt-wrapper">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div className="receipt-container">
        <div className="info-container">
          <div className="info-inner">
            <h1>{t("data")}</h1>
            <Formik
              initialValues={{
                name: profileData?.user?.first_name || "",
                last_Name: profileData?.user?.last_name || "",
                address: profileData?.address || "",
                company: profileData?.company || "",
                city: profileData?.city || "",
                country: profileData?.country || "",
                phone_number: profileData?.phone_number || "",
                email: profileData?.user?.email || "",
                description: "",
                quantity: 1,
                discount: 0,
                total_price: totalInvoicePrice || "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <div className="info-row">
                    <Field name="name" placeholder="Name" required />
                    <Field name="last_Name" placeholder="Last Name" required />
                  </div>
                  <Field name="company" placeholder="company (opsionale)" />
                  <Field name="address" placeholder="adresa" required />
                  <div className="info-row">
                    <Field name="city" placeholder="Qyteti" />
                    <Field name="country" placeholder="Shteti" />
                  </div>
                  <div className="info-row">
                    <Field
                      name="phone_number"
                      placeholder="Telefoni"
                      required
                    />
                    <Field name="email" placeholder="Email" required />
                  </div>
                  <p>
                    {t("dataWrite")} ({t("optional")})
                  </p>

                  <Field
                    name="description"
                    placeholder={`${t("dataWrite")}`}
                    as="textarea"
                  />
                  <p>{t("payTxt")}</p>
                  <p style={{
                    color: 'var(--dark-color)',
                    fontSize: '14px'
                  }}><i>{t("payTxt1")}</i></p>
                  <div
                    className="check"
                    style={{
                      width: '95%',
                      display: isSmallDev ? "flex" : "none",
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end'
                    }}
                  >
                    {/* <div>
                      <input
                        type="checkbox"
                        id="paymentMethod"
                        checked={radioChecked}
                        onChange={handleRadioChange}
                        style={{
                          width: "10px",
                        }}
                      />
                      <label htmlFor="paymentMethod">{t("cash")}</label>
                    </div> */}

                    <button
                      className="primary-btn"
                      type="submit"
                      // disabled={!radioChecked}
                    >
                      {t("buyNow")}
                    </button>
                  </div>
                  <button
                    className="primary-btn"
                    type="submit"
                    // disabled={!radioChecked && totalInvoicePrice < 300}
                    style={{
                      display: isSmallDev ? "none" : "flex",
                    }}
                  >
                    {t("buyNow")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="product-container">
          <div className="product-card">
            <div className="inner-card">
              <h1 className="title-h1">{t("yourOrder")}</h1>
              {products.map((product) => (
                <div className="prod" key={product.productId}>
                  <div
                    className="prod-img"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/product/${product.product_unique_code}`)
                    }
                  >
                    {product.discount && (
                      <div className="promotion">
                        <p>- {product.discount}%</p>
                      </div>
                    )}
                    <img
                      src={product.photo_texture_1}
                      alt={product.product_name}
                    />
                  </div>
                  <div className="prod-content">
                    <div className="f-line">
                      <h1
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(`/product/${product.product_unique_code}`)
                        }
                      >
                        {product.product_name}
                      </h1>
                    </div>
                    <p>
                      {t("quantity")}: {product.quantity}
                    </p>
                    <div className="calculate">
                      <p>{product.price}€</p>
                      <p
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        {t("price")}: {product.totalPrice}€
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="line"></div>
              <div
                className="product-inner"
                style={{ color: "var(--dark-color)" }}
              >
                <p>{t("transport")}</p>
                <p>{t("free")}</p>
              </div>
              <div className="product-inner">
                <p>{t("totReceipt")}</p>
                <p>{totalInvoicePrice}€</p>
              </div>
            </div>
          </div>
          {/* <div
            className="check-list"
            style={{
              display: isSmallDev ? "none" : "",
            }}
          >
            <div className="check-inner">
              <div className="check">
                <input
                  type="checkbox"
                  id="paymentMethod"
                  checked={radioChecked}
                  onChange={handleRadioChange}
                />
                <label htmlFor="paymentMethod"> {t("cash")}</label>
              </div>
              <p>
                {t("payTxt")}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Receipt;
