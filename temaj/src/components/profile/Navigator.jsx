import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Navigator = ({ activeTab }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navigator">
      <div>
        <h1>Profile</h1>
      </div>
      <button
        className={activeTab === "info" ? "active" : ""}
        onClick={() => navigate("/profile")}
      >
        <img src={"/assets/images/icons/profile/user.png"} alt="img" />
        {`${t("profile")}`}
      </button>
      <button
        className={activeTab === "order" ? "active" : ""}
        onClick={() => navigate("/profile/orders")}
      >
        <img src={"/assets/images/icons/profile/order.png"} alt="img" />
        {`${t("order")}`}
      </button>
      <button
        className={activeTab === "wish-list" ? "active" : ""}
        onClick={() => navigate("/profile/wish-list")}
      >
        <img src={"/assets/images/icons/profile/wish.png"} alt="img" />
        {`${t("wish")}`}
      </button>
      {user?.group === "superuser" && (
        <>
          <button
            className={activeTab === "pending-orders" ? "active" : ""}
            onClick={() => navigate("/profile/pending-orders")}
          >
            <img src={"/assets/images/icons/profile/order.png"} alt="img" />
            Porosit e pa aprovuara
          </button>
          <button
            className={activeTab === "pending-promotion" ? "active" : ""}
            onClick={() => navigate("/profile/pending-promotion")}
          >
            <img src={"/assets/images/icons/profile/user.png"} alt="img" />
            Users e pa aprovuar
          </button>
          <button
            className={activeTab === "onSale-section" ? "active" : ""}
            onClick={() => navigate("/profile/on-sale")}
          >
            <img src={"/assets/images/icons/profile/user.png"} alt="img" />
            Produktet ne Zbritje
          </button>
        </>
      )}
      <button
        onClick={() => {
          logout();
          navigate("/temaj-qeramik");
        }}
      >
        <img src={"/assets/images/icons/profile/logout.png"} alt="img" />
        {`${t("logout")}`}
      </button>
    </div>
  );
};

export default Navigator;
