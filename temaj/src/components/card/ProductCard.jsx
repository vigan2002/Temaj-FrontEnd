import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/color";
import "./style.scss";
import CardSkeleton from "../loader/CardSkeleton";
import { addToCartById } from "../../api/cartApi";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import NotificationModal from "../notification/NotificationModal";
import CartPopup from "../Cart/CartPopup";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product, loading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItemToCart } = useCart();
  const token = Cookies.get("accessToken");
  const defaultInputValue = 0.72;
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = async () => {
    if (!token) {
      showNotification("User is not logged in", "error");
      return;
    }

    try {
      const response = await addToCartById(product.id, defaultInputValue);
      const newItem = {
        productId: product.id,
        product_name: product.product_name,
        price: product.price,
        quantity: 1,
        totalPrice: product.price,
        product_unique_code: product.product_unique_code,
      };
      addItemToCart(newItem);
      setSelectedProduct(newItem);
      setIsPopupVisible(true);
    } catch (error) {
      showNotification("Error adding product to cart", "error");
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };

  if (loading) {
    return <CardSkeleton />;
  }

  const handleProductClick = (productCode) => {
    window.scrollTo(0, 0);
    navigate(`/product/${productCode}`);
  };

  return (
    <div className="product-card">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div
        className="product-img"
        style={{ cursor: "pointer" }}
        // onClick={() => navigate(`/product/${product.product_unique_code}`)}
        onClick={() => handleProductClick(product.product_unique_code)}
      >
        {product.discount && (
          <div className="promotion">
            <p>- {product.discount}%</p>
          </div>
        )}
        {product.new === true && (
          <div className="promotion-new">
            <p>
            {`${t("new")}`}
            </p>
          </div>
        )}
        <img src={product.photo_texture_1} alt={product.product_name} onContextMenu={(e) => e.preventDefault()} />
      </div>
      <div className="product-content">
        <p>{product.base_category}</p>
        <h1
        // onClick={() => navigate(`/product/${product.product_unique_code}`)} 
        onClick={() => handleProductClick(product.product_unique_code)}
        style={{
          textTransform: 'capitalize'
        }}>
          {product.product_name.replace(/^Pllake, /i, '')}
        </h1>
        <div className="product-content-inner">
          <div className="price">
            {product.discount && (
              <div className="discount">
                <p>
                  {(product.price * (1 - product.discount / 100)).toFixed(2)} €
                </p>
              </div>
            )}
            <p className={product.discount ? "before" : ""}>
              {product.price} €
            </p>
          </div>
          <div
            className="color-indicator"
            style={{
              backgroundColor: colors[product.color] || "transparent",
            }}
          />
        </div>
        <div className="product-btn">
          <button className="primary-btn" onClick={handleAddToCart}>
            <img
              src="/assets/images/icons/cartB.png"
              alt="cart"
              className="cart"
            />
            {`${t("addCart")}`}
          </button>
        </div>
      </div>
      <CartPopup
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
        product={selectedProduct}
        deleteProduct={(id) => showNotification(`Delete product with id ${id}`, "success")}
      />
    </div>
  );
};

export default ProductCard;
