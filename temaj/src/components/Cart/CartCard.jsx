import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {
  getCartsUser,
  deleteAllCartsUser,
  deleteCartUserById,
} from "../../api/cartApi";
import NotificationModal from "../notification/NotificationModal";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

const CartCard = ({ closeCart, isOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartRef = useRef(null);

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };

  const token = Cookies.get("accessToken");

  useEffect(() => {
    fetchCart();
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeCart]);

  const fetchCart = async () => {
    try {
      const response = await getCartsUser();
      const productsFromResponse = response.map((item) => {
        return {
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
        };
      });
      setProducts(productsFromResponse);
      // setCartItems(productsFromResponse); // Update cart items in context
    } catch (error) {
      console.error("Cart Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllProducts = async () => {
    showNotification("Products removed from cart!", "success");
    try {
      await deleteAllCartsUser();
      setProducts([]);
      setCartItems([]);
      console.log("All products removed from cart");
    } catch (error) {
      console.error("Error removing all products from cart:", error);
      showNotification("Could not remove all products.", "error");
    }
  };

  const deleteProduct = async (productId) => {
    showNotification("Product removed from cart!", "success");
    try {
      await deleteCartUserById(productId);
      const updatedProducts = products.filter((product) => product.productId !== productId);
      setProducts(updatedProducts);
      setCartItems(updatedProducts);
      console.log(`Product with id ${productId} removed from cart`);
    } catch (error) {
      console.error(
        `Error removing product with id ${productId} from cart:`,
        error
      );
      showNotification("Could not remove product.", "error");
    }
  };

  const calculateTotalCartPrice = () => {
    return products.reduce((total, product) => total + product.totalPrice, 0);
  };
  
  return (
    <div className={`cart-card ${isOpen ? 'open' : ''}`} ref={cartRef}>
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div className="inner-card">
        <div className="cart-title">
          <h1>{t("cart")}</h1>
          <button onClick={closeCart}>
            <IoMdClose color="var(--darker-color)" fontSize={"25px"} />
          </button>
        </div>
        {loading ? (
          <div style={{
            width: '100%'
          }}>
            <CircularProgress sx={{
              color: 'var(--primary-color)'
            }}/>
          </div>
        ) : (
          products.map((product) => (
            <div className="prod" key={product.productId}>
              <div
                className="prod-img"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/product/${product.product_unique_code}`);
                  closeCart();
                }}
              >
                {product.discount && (
                  <div className="promotion">
                    <p>- {product.discount}%</p>
                  </div>
                )}
                <img src={product.photo_texture_1} alt={product.product_name} />
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
                  <button onClick={() => {
                    deleteProduct(product.productId);
                  }}>
                    <BsTrash3 />
                  </button>
                </div>
                <p>{t("quantity")}: {product.quantity.toFixed(2)}</p>
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
          ))
        )}
        <div className="tot">
          <p>{t("totCart")}: <span>{calculateTotalCartPrice().toFixed(2)}€</span></p>
        </div>
        <div className="btn">
          <button
            onClick={() => {
              closeCart();
              navigate(`/receipt`);
            }}
          >
            {t("buyNow")}
          </button>
          <button
            onClick={() => {
              deleteAllProducts();
              closeCart();
            }}
            style={{
              backgroundColor: "var(--darker-color)",
              color: '#fff'
            }}
          >
            <BsTrash3 /> {t("deleteAll")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
