import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./profile.scss";
import { useTranslation } from "react-i18next";

const ProfileDropdown = ({ isVisible, toggleDropdown, position }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, toggleDropdown]);

  if (!isVisible) return null;

  const style = {
    top: position.top,
    left: position.left,
  };

  return (
    <div className="profile-dropdown" style={style} ref={dropdownRef}>
      <button onClick={() => { toggleDropdown(); navigate("/profile"); }}>
        <img src={"/assets/images/icons/profile/user.png"} alt="img" /> {`${t("profile")}`}
      </button>
      <button onClick={() => { toggleDropdown(); navigate("/profile/orders"); }}>
        <img src={"/assets/images/icons/profile/order.png"} alt="img" />  {`${t("order")}`}
      </button>
      <button onClick={() => { toggleDropdown(); navigate("/profile/wish-list"); }}>
        <img src={"/assets/images/icons/profile/wish.png"} alt="img" /> {`${t("wish")}`}
      </button>
      {user?.group === "superuser" && (
        <>
          <button
            onClick={() => navigate("/profile/pending-orders")}
          >
            <img src={"/assets/images/icons/profile/order.png"} alt="img" />
            Porosit e pa aprovuara
          </button>
          <button
            onClick={() => navigate("/profile/pending-promotion")}
          >
            <img src={"/assets/images/icons/profile/user.png"} alt="img" />
            Users e pa aprovuar
          </button>
          <button
            onClick={() => navigate("/profile/on-sale")}
          >
            <img src={"/assets/images/icons/profile/user.png"} alt="img" />
            Produktet ne Zbritje
          </button>
        </>
      )}
      <button onClick={() => { 
        toggleDropdown(); 
        logout(); 
        navigate('/temaj-qeramik');
      }}>
        <img src={"/assets/images/icons/profile/logout.png"} alt="img" /> {`${t("logout")}`}
      </button>
    </div>
  );
};

export default ProfileDropdown;
