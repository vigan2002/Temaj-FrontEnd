import React, { useEffect, useState, useRef } from "react";
import "./scroll.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CartCard from "../Cart/CartCard";
import ProfileDropdown from "./ProfileDropdown";
import { useTranslation } from "react-i18next";

const ScrollNavbar = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [navLinks, setNavLinks] = useState([]);
    const [showBotItems1, setShowBotItems1] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const profileButtonRef = useRef(null);
    const pathname = window.location.pathname;
  
    useEffect(() => {
      if (pathname === "/") {
        setNavLinks([
          { to: "/contact", label: `${t("contact")}` },
          { to: "/about", label: `${t("about")}` },
        ]);
        setShowBotItems1(false);
      } else if (
        pathname === "/temaj-qeramik" ||
        (pathname !== "/" && pathname !== "/contact" && pathname !== "/about")
      ) {
        setNavLinks([
          { to: "/temaj-qeramik", label: `${t("home")}` },
          { to: "/products", label: `${t("products")}` },
          { to: "/about", label: `${t("about")}` },
          { to: "/brands", label: `${t("brands")}` },
          { to: "/contact", label: `${t("contact")}` },
        ]);
  
        setShowBotItems1(true);
      } else {
        setShowBotItems1(false);
      }
    }, [pathname, t]);
  
    const toggleMenu = () => {
      if (window.innerWidth <= 1200) {
        setToggleBtn(!toggleBtn);
        document.body.classList.toggle("scroll-y");
      }
    };
  
    const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
    };
  
    const closeCart = () => {
      setIsCartOpen(false);
    };
  
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleSearch = () => {
      const query = searchQuery.trim();
      if (query) {
        navigate(
          `/products?product_name__icontains=${encodeURIComponent(query)}`
        );
      }
    };
  
    const toggleDropdown = () => {
      if (user) {
        if (profileButtonRef.current) {
          const rect = profileButtonRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
          });
        }
        setIsDropdownVisible(!isDropdownVisible);
      } else {
        navigate("/login");
      }
    };
  

  return (
    <div className="sc-nav-wrapper">
      <div className="sc-nav-container">
        <div className="left">
          <NavLink to="/">
            <img
              src="/assets/images/brand/logo.png"
              alt="logo"
              className="sc-logo"
            />
          </NavLink>
          <div className="sc-nav-links">
            <NavLink to="/temaj-qeramik">{t("home")}</NavLink>
            <NavLink to="/products">{t("products")}</NavLink>
            <NavLink to="/about">{t("about")}</NavLink>
            <NavLink to="/brands">{t("brands")}</NavLink>
            <NavLink to="/contact">{t("contact")}</NavLink>
          </div>
        </div>
        <div className="right">
          <button style={{
            backgroundColor: 'transparent'
          }}>
            <img
              src="/assets/images/icons/searchB.png"
              alt=""
              style={{
                opacity: ".6",
                height: '20px'
              }}
            />
          </button>
          <button
            className="login-btn"
            ref={profileButtonRef}
            onClick={toggleDropdown}
            style={{
              cursor: "pointer",
            }}
          >
            <img src="/assets/images/icons/accB.png" alt="" />
            <p>{user?.username || "Kyqu | Regjistrohu"}</p>
          </button>
          <button
            className="light-btn"
            onClick={() => toggleMenu && navigate("/profile/wish-list")}
          >
            <img src="/assets/images/icons/wish.png" alt="" />
          </button>
          <button className="darker-btn" onClick={toggleCart}>
            <img src="/assets/images/icons/cart.png" alt="" />
            Cart
          </button>
        </div>
      </div>
      {isCartOpen && <CartCard closeCart={closeCart} />}
      <ProfileDropdown
        isVisible={isDropdownVisible}
        toggleDropdown={toggleDropdown}
        position={dropdownPosition}
      />
    </div>
  );
};

export default ScrollNavbar;
