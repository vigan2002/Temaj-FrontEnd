import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import Navigator from "./Navigator";
import { colors } from "../../utils/color";
import {getUserWishlist,deleteAllWishlist,deleteWishlistById} from '../../api/wishlistApi';
import NotificationModal from "../notification/NotificationModal";
import { useTranslation } from "react-i18next";

const WishList = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("wish-list");
  const [products, setProducts] = useState([]);
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
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
      try{
        const response = await getUserWishlist();
        const productsFromResponse = response.map((item) => {
          return {
            wishlistItemId: item.id,
            product_name: item.product_name,
            price: item.price,
            new: item.new,
            discount: item.discount,
            photo_texture_1: item.photo_texture_1,
            base_category: item.base_category,
            product_unique_code: item.product_unique_code,
          };
        });
        setProducts(productsFromResponse);
      } catch(error) {
        console.error("Wishlist Error fetching data:", error);
      };
  };


  const deleteAllProducts = async() => {
    try{
      const response = await deleteAllWishlist();
      setProducts([]);
      showNotification("All products removed from wishlist", "success");
    } catch(error) {
        console.error("Error removing all products from wishlist:", error);
      };
  };

  const deleteProduct = async(wishlistItemId) => {
    try{
      const response = await deleteWishlistById(wishlistItemId);
        fetchWishlist();
        showNotification(`Product ${wishlistItemId} deleted from wishlist`, "success");
      } catch(error) {
        console.error(
          `Error removing product with wishlist item id ${wishlistItemId} from wishlist:`,
          error
        );
      }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = `${mainUrl}login/`;
  };

  return (
    <div className="profile-wrapper">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div className="profile-container">
        <Navigator activeTab="wish-list" />
        <div className="content">
          <div
            className="wish-list-inner"
            style={{ display: activeTab === "wish-list" ? "flex" : "none" }}
          >
            <div className="title">
              <h1>{`${t("wish")}`}</h1>
              <button className="transparentD-btn" onClick={deleteAllProducts}>
                {`${t("deleteAll")}`}
              </button>
            </div>
            <div className="wish-list-container">
              <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                {products?.map((el) => (
                  <Grid item xs={6} sm={6} md={4} key={el.wishlistItemId}>
                    <div
                      className="product-card"
                      onClick={() =>
                        navigate(`/product/${el.product_unique_code}`)
                      }
                    >
                      <div
                        className="product-img"
                        style={{ cursor: "pointer" }}
                      >
                        {el.discount && (
                          <div className="promotion">
                            <p>- {el.discount}%</p>
                          </div>
                        )}
                        {el.new === true && (
                          <div className="promotion-new">
                            <p>{`${t("new")}`}</p>
                          </div>
                        )}
                        <img src={el.photo_texture_1} alt={el.product_name} />
                      </div>
                      <div className="product-content">
                        <p>{el.base_category}</p>
                        <h1>{el.product_name}</h1>
                        <div className="product-content-inner">
                          <div className="price">
                            {el.discount && (
                              <div className="discount">
                                <p>
                                  {(el.price * (1 - el.discount / 100)).toFixed(
                                    2
                                  )}{" "}
                                  €
                                </p>
                              </div>
                            )}
                            <p className={el.discount ? "before" : ""}>
                              {el.price} €
                            </p>
                          </div>
                          <div
                            className="color-indicator"
                            style={{
                              backgroundColor:
                                colors[el.color] || "transparent",
                            }}
                          />
                        </div>
                        <div className="product-btn">
                          <button
                            className="primary-btn"
                            onClick={(e) => { e.stopPropagation(); deleteProduct(el.wishlistItemId); }}
                          >
                            {`${t("remove")}`}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
