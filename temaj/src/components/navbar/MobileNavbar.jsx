//    import React, { useEffect, useState } from "react";
// import "./style.scss";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "../../utils/axios";
// import { IoMdClose } from "react-icons/io";
// import { MdOutlineMenu } from "react-icons/md";
// import { profileUrl } from "../../utils/consts";
// import CartCard from "../Cart/CartCard";
// import { useAuth } from "../../context/AuthContext";
// import { useCart } from "../../context/CartContext";
// import LanguageDropdown from "./LanguageDropdown";
// import { useTranslation } from "react-i18next";

// const MobileNavbar = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const [navLinks, setNavLinks] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [showBotItems1, setShowBotItems1] = useState(true);
//   const [toggleBtn, setToggleBtn] = useState(false);
//   const pathname = window.location.pathname;

//   useEffect(() => {
//     if (location.pathname === "/") {
//       setNavLinks([
//         { to: "/contact", label: `${t("contact")}` },
//         { to: "/about", label: `${t("about")}` },
//       ]);
//       setShowBotItems1(false);
//     } else if (
//       location.pathname === "/temaj-qeramik" ||
//       (location.pathname !== "/" &&
//         location.pathname !== "/contact" &&
//         location.pathname !== "/about")
//     ) {
//       setNavLinks([
//         { to: "/", label: `${t("home")}` },
//         { to: "/products", label: `${t("products")}` },
//         { to: "/about", label: `${t("about")}` },
//         { to: "/products/brands", label: `${t("brands")}` },
//         { to: "/contact", label: `${t("contact")}` },
//       ]);
//       setShowBotItems1(true);
//     } else {
//       setShowBotItems1(false);
//     }
//   }, [location.pathname]);

//   const [profileInfo, setProfileInfo] = useState();

//   const token = Cookies.get("accessToken");
//   useEffect(() => {
//     axios
//       .get(profileUrl, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setProfileInfo(response.data);
//       })
//       .catch((error) => {
//         setProfileInfo(null);
//       });
//   }, [token]);

//   const toggleMenu = () => {
//     if (window.innerWidth <= 1200) {
//       setToggleBtn(!toggleBtn);
//     }
//   };

//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   const closeCart = () => {
//     setIsCartOpen(false);
//   };

//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = () => {
//     const query = searchQuery.trim();
//     if (query) {
//       navigate(
//         `/products?product_name__icontains=${encodeURIComponent(query)}`
//       );
//       toggleMenu();
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="mob-nav">
//       <div className="top">
//         <div className="logo">
//           <NavLink to="/">
//             <img
//               src="/assets/images/brand/logo.png"
//               alt="logo"
//               className="logo"
//             />
//           </NavLink>
//         </div>
//         <div className="top-items">
//           <button
//             onClick={() => navigate(token ? "/profile" : "/login")}
//             style={{
//               cursor: "pointer",
//             }}
//           >
//             <img src="/assets/images/icons/mob/profile.png" alt="" />
//           </button>
//           {user?.user_id && pathname !== "/" && (
//             <>
//               <button
//                 onClick={() => toggleMenu && navigate("/profile/wish-list")}
//               >
//                 <img src="/assets/images/icons/mob/wish.png" alt="" />
//               </button>
//               <button
//                 onClick={toggleCart}
//                 style={{
//                   position: "relative",
//                 }}
//               >
//                 {cartItems.length > 0 && (
//                   <div className="count">
//                     <p>{cartItems.length}</p>
//                   </div>
//                 )}
//                 <img src="/assets/images/icons/mob/cart.png" alt="" />
//               </button>
//             </>
//           )}
//           <button
//             className={`btn-menu ${toggleBtn ? "close" : ""}`}
//             onClick={toggleMenu}
//           >
//             {toggleBtn ? (
//               <IoMdClose color="var(--darker-color)" fontSize={"25px"} />
//             ) : (
//               <MdOutlineMenu color="var(--darker-color)" fontSize={"25px"} />
//             )}
//           </button>
//         </div>
//       </div>
//       <div className={`${toggleBtn ? "open" : ""} bot`}>
//         {pathname !== "/" && (
//           <div className="search-btn">
//             <input
//               type="text"
//               placeholder="Kërko Produktin ..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             <button onClick={handleSearch}>
//               <img
//                 src="/assets/images/icons/searchB.png"
//                 alt=""
//                 style={{
//                   opacity: ".6",
//                 }}
//               />
//             </button>
//           </div>
//         )}
//         <div className="nav-links">
//           {navLinks.map((link, index) => (
//             <NavLink key={index} to={link.to} onClick={toggleMenu}>
//               {link.label}
//             </NavLink>
//           ))}
//         </div>
//         <div style={{
//           display: 'none'
//         }}>
//           <button>En</button>
//           <button>Al</button>
//         </div>
//         <div className="info">
//           <ul>
//             <li>
//               <img src="/assets/images/icons/pin.png" alt="" />
//               <p>Prishtine, Kosove</p>
//             </li>
//             <li
//               onClick={() => {
//                 window.location.assign("tel:+38349678001");
//               }}
//             >
//               <img src="/assets/images/icons/cell.png" alt="" />
//               <p>(+383) 49 678 001</p>
//             </li>
//             <li>
//               <img src="/assets/images/icons/email.png" alt="" />
//               <p>info@temaj.eu</p>
//             </li>
            
//             <LanguageDropdown />
//           </ul>
//         </div>
//         <div className="socials">
//           <button>
//             <img src="/assets/images/icons/fb.png" alt="" />
//           </button>
//           <div className="line"></div>
//           <button>
//             <img src="/assets/images/icons/insta.png" alt="" />
//           </button>
//           <div className="line"></div>
//           <button>
//             <img src="/assets/images/icons/in.png" alt="" />
//           </button>
//         </div>
//       </div>
//       {isCartOpen && <CartCard closeCart={closeCart} />}
//     </div>
//   );
// };

// export default MobileNavbar;


import React, { useEffect, useState } from "react";
import "./style.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../../utils/axios";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { profileUrl } from "../../utils/consts";
import CartCard from "../Cart/CartCard";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "react-i18next";

const MobileNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [navLinks, setNavLinks] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showBotItems1, setShowBotItems1] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(false);
  const pathname = window.location.pathname;

  useEffect(() => {
    if (location.pathname === "/") {
      setNavLinks([
        { to: "/contact", label: `${t("contact")}` },
        { to: "/about", label: `${t("about")}` },
      ]);
      setShowBotItems1(false);
    } else if (
      location.pathname === "/temaj-qeramik" ||
      (location.pathname !== "/" &&
        location.pathname !== "/contact" &&
        location.pathname !== "/about")
    ) {
      setNavLinks([
        { to: "/", label: `${t("home")}` },
        { to: "/products", label: `${t("products")}` },
        { to: "/about", label: `${t("about")}` },
        { to: "/brands", label: `${t("brands")}` },
        { to: "/contact", label: `${t("contact")}` },
      ]);
      setShowBotItems1(true);
    } else {
      setShowBotItems1(false);
    }
  }, [location.pathname, t]);

  const [profileInfo, setProfileInfo] = useState();

  const token = Cookies.get("accessToken");
  useEffect(() => {
    axios
      .get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfileInfo(response.data);
      })
      .catch((error) => {
        setProfileInfo(null);
      });
  }, [token]);

  const toggleMenu = () => {
    if (window.innerWidth <= 1200) {
      setToggleBtn((prev) => !prev);
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
      setToggleBtn(false); // Close the menu after search
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleNavLinkClick = (to) => {
    navigate(to);
    setToggleBtn(false); // Close the menu after navigation
  };

  return (
    <div className="mob-nav">
      <div className="top">
        <div className="logo">
          <NavLink to="/temaj-qeramik">
            <img
              src="/assets/images/brand/finalLogo/logomobile.png"
              alt="logo"
              className="logo"
              style={{
                height: '50px'
              }}
            />
          </NavLink>
        </div>
        <div className="top-items">
          <button
            onClick={() => navigate(token ? "/profile" : "/login")}
            style={{
              cursor: "pointer",
            }}
          >
            {/* <img src="/assets/images/icons/mob/User.png" alt="" /> */}
            <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" transform="matrix(-1 0 0 1 12.2422 1.00732)" stroke="black" strokeWidth="1.3"/>
            <path d="M1.24219 14.942C1.24219 14.0816 1.78304 13.3142 2.59328 13.0248V13.0248C6.24623 11.7202 10.2381 11.7202 13.8911 13.0248V13.0248C14.7013 13.3142 15.2422 14.0816 15.2422 14.942V16.2575C15.2422 17.4449 14.1905 18.3571 13.015 18.1892L12.0606 18.0528C9.52783 17.691 6.95654 17.691 4.42381 18.0528L3.46939 18.1892C2.29389 18.3571 1.24219 17.4449 1.24219 16.2575V14.942Z" stroke="black" strokeWidth="1.3"/>
            </svg>
          </button>
          {user?.user_id && pathname !== "/" && (
            <>
              <button
                onClick={() => handleNavLinkClick("/profile/wish-list")}
              >
                {/* <img src="/assets/images/icons/mob/wish.png" alt="" /> */}
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66275 11.1722L8.82377 17.6652C10.0068 18.912 11.9932 18.912 13.1762 17.6652L19.3372 11.1722C21.5542 8.83573 21.5543 5.04756 19.3373 2.71109C17.1203 0.374622 13.5258 0.374623 11.3088 2.71109V2.71109C11.1409 2.88799 10.8591 2.88799 10.6912 2.71109V2.71109C8.47421 0.374623 4.87975 0.374622 2.66275 2.71109C0.44575 5.04757 0.445751 8.83573 2.66275 11.1722Z" stroke="black" strokeWidth="1.5"/>
</svg>

              </button>
              <button
                onClick={toggleCart}
                style={{
                  position: "relative",
                }}
              >
                {cartItems.length > 0 && (
                  <div className="count">
                    <p>{cartItems.length}</p>
                  </div>
                )}
                {/* <img src="/assets/images/icons/mob/cart.png" alt="" /> */}
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.732 15.3682C5.6093 15.3682 4.69922 16.2783 4.69922 17.401C4.69922 18.5237 5.60935 19.4337 6.732 19.4337C7.85471 19.4337 8.76479 18.5236 8.76479 17.401C8.76483 16.2783 7.85471 15.3682 6.732 15.3682ZM6.732 18.5303C6.10829 18.5303 5.60269 18.0247 5.60269 17.401C5.60269 16.7773 6.10829 16.2717 6.732 16.2717C7.35572 16.2717 7.86132 16.7773 7.86132 17.401C7.86136 18.0247 7.35572 18.5303 6.732 18.5303Z" fill="black" stroke="black" strokeWidth="0.4"/>
<path d="M15.3101 15.3682C14.1874 15.3682 13.2773 16.2783 13.2773 17.401C13.2773 18.5237 14.1875 19.4337 15.3101 19.4337C16.4328 19.4337 17.3429 18.5236 17.3429 17.401C17.3429 16.2783 16.4328 15.3682 15.3101 15.3682ZM15.3101 18.5303C14.6864 18.5303 14.1808 18.0247 14.1808 17.401C14.1808 16.7773 14.6864 16.2717 15.3101 16.2717C15.9338 16.2717 16.4394 16.7773 16.4394 17.401C16.4395 18.0247 15.9338 18.5303 15.3101 18.5303Z" fill="black" stroke="black" strokeWidth="0.4"/>
<path d="M19.8989 3.51054C19.8048 3.40778 19.6761 3.34345 19.5375 3.32983L4.8336 3.12655L4.42705 1.88427C4.14063 1.05382 3.36297 0.493182 2.48457 0.483887H0.971266C0.721772 0.483887 0.519531 0.686128 0.519531 0.935622C0.519531 1.18512 0.721772 1.38736 0.971266 1.38736H2.48457C2.97573 1.39821 3.40823 1.71359 3.56875 2.1779L6.43726 10.8286L6.21142 11.3481C5.9595 11.9977 6.03516 12.7288 6.4147 13.3131C6.7906 13.887 7.42301 14.2412 8.10871 14.2618H16.895C17.1445 14.2618 17.3467 14.0595 17.3467 13.81C17.3467 13.5606 17.1445 13.3583 16.895 13.3583H8.10867C7.72144 13.3486 7.36499 13.1449 7.16002 12.8162C6.95735 12.4915 6.91572 12.0916 7.0471 11.732L7.22781 11.3255L16.7368 10.3317C17.7813 10.2166 18.6405 9.45694 18.8826 8.43436L19.9667 3.89444C20.0156 3.76371 19.9897 3.61668 19.8989 3.51054ZM18.0017 8.23113C17.855 8.88938 17.2962 9.37493 16.6239 9.42823L7.22781 10.3994L5.12724 4.03002L18.9729 4.2333L18.0017 8.23113Z" fill="black" stroke="black" strokeWidth="0.4"/>
</svg>

              </button>
            </>
          )}
          <button
            className={`btn-menu ${toggleBtn ? "close" : ""}`}
            onClick={toggleMenu}
          >
            {toggleBtn ? (
              <IoMdClose color="var(--darker-color)" fontSize={"25px"} />
            ) : (
              // <MdOutlineMenu color="var(--darker-color)" fontSize={"25px"} />
              // <img src="/assets/images/icons/mob/menu.png" alt="" />
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.695312 0.879883H20.8785" stroke="black" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M6.08594 7.03955L20.8767 7.03955" stroke="black" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M12.5 13.1992H20.8786" stroke="black" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              
            )}
          </button>
        </div>
      </div>
      <div className={`${toggleBtn ? "open" : ""} bot`}>
      <div className="line" style={{
          height: '0.5px',
          width: '100%',
          backgroundColor: '#000',
          position: 'absolute',
          top: '25px',
          opacity: '.5'
        }}></div>
        {pathname !== "/" && (
          <div className="search-btn">
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>
              <img
                src="/assets/images/icons/searchB.png"
                alt=""
                style={{
                  opacity: ".6",
                }}
              />
            </button>
          </div>
        )}
        <div className="nav-links">
          {navLinks.map((link, index) => (
            <NavLink key={index} to={link.to} onClick={() => handleNavLinkClick(link.to)}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="info">
          <ul>
            <li>
              <img src="/assets/images/icons/pin.png" alt="" />
              <p>Prishtine, Kosove</p>
            </li>
            <li
              onClick={() => {
                window.location.assign("tel:+38349678001");
              }}
            >
              <img src="/assets/images/icons/cell.png" alt="" />
              <p>(+383) 49 678 001</p>
            </li>
            <li>
              <img src="/assets/images/icons/email.png" alt="" />
              <p>info@temaj.eu</p>
            </li>
            <LanguageDropdown />
          </ul>
        </div>
        <div className="socials">
          <button>
            <img src="/assets/images/icons/fb.png" alt="" />
          </button>
          <div className="line"></div>
          <button>
            <img src="/assets/images/icons/insta.png" alt="" />
          </button>
          <div className="line"></div>
          <button>
            <img src="/assets/images/icons/in.png" alt="" />
          </button>
        </div>
      </div>
      {isCartOpen && <CartCard closeCart={closeCart} />}
    </div>
  );
};

export default MobileNavbar;
