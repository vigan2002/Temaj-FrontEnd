import React from "react";
import "./cart.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartPopup = ({ isVisible, onClose, product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        <h1>{t("cartSuccess")}</h1>
        <div className="prod" key={product.productId}>
          <div className="prod-content">
            <h1
              style={{
                cursor: "pointer",
              }}
            >
              {product.product_name}
            </h1>
            <p>{t("quantity")}: {product.quantity}</p>
            <p>{t("price")}: {product.price}€</p>
          </div>
        </div>
        <div className="cart-popup-buttons">
          <button className="primary-btn" onClick={onClose}>
          {t("continueShop")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
