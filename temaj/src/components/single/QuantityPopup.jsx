import React, { useState, useEffect, useRef } from "react";
import "./popup.scss";
import { useTranslation } from "react-i18next";

const QuantityPopup = ({
  selectedVariation,
  inputValue,
  quantity,
  calculateAdjustedQuantity,
  formatNumber,
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const popupRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-container" ref={popupRef}>
        {selectedVariation.quantity === null ? (
          <p>
            {t("quantityM2")}{" "}
            {formatNumber(
              calculateAdjustedQuantity(
                selectedVariation.dimensions,
                inputValue
              )
            )}{" "}
            m²
          </p>
        ) : (
          <p>
            {t("quantityM2")}{" "}
            {formatNumber(
              calculateAdjustedQuantity(selectedVariation.dimensions, quantity)
            )}{" "}
            m²
          </p>
        )}
      </div>
    </div>
  );
};

export default QuantityPopup;
