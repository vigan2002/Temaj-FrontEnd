import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer-section">
      <div className="footer-wrapper">
        <div className="main-container">
          <div className="logo">
            <img src="/assets/images/brand/finalLogo/logomobile.png" alt="" className="logo" />
          </div>
          <p>Vizitoni showroom-et tona në Prishtinë Çagllavicë dhe Prizren Arbanë.</p>
          <div className="socials">
            <a href="https://www.facebook.com/temaj.qeramike"><button>
              <img src="/assets/images/icons/fb.png" alt="" />
            </button></a>
            <div className="line"></div>
            <a href="https://www.instagram.com/temaj.qeramike/"><button>
              <img src="/assets/images/icons/insta.png" alt="" />
            </button></a>
            <div className="line"></div>
            <a href="https://www.tiktok.com/@temaj.qeramike">
            <button>
              {/* <img src="/assets/images/icons/in.png" alt="" /> */}
              <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_69_5346)">
<path d="M13.1323 3.63577C13.0154 3.57638 12.9018 3.51141 12.7915 3.44084C12.471 3.23279 12.1772 2.9876 11.9165 2.71056C11.2639 1.97711 11.0202 1.23323 10.9302 0.712149H10.9339C10.8589 0.279692 10.8901 0 10.8947 0H7.92244V11.2894C7.92244 11.4411 7.92244 11.5909 7.91575 11.7389C7.91575 11.7573 7.91414 11.7743 7.91298 11.7942C7.91327 11.8026 7.91265 11.8111 7.91114 11.8194V11.8257C7.87988 12.2307 7.7478 12.6219 7.5265 12.965C7.3052 13.3081 7.00147 13.5925 6.64202 13.7933C6.26725 14.0028 5.84334 14.1126 5.41214 14.112C4.02765 14.112 2.90506 13.0029 2.90506 11.633C2.90506 10.2631 4.02742 9.1539 5.41214 9.1539C5.67434 9.1537 5.93492 9.19425 6.18422 9.27403L6.18699 6.301C5.43025 6.20516 4.66151 6.26444 3.92928 6.4751C3.19704 6.68576 2.51721 7.04322 1.93269 7.52493C1.4204 7.96207 0.989674 8.48364 0.659882 9.06618C0.534356 9.27856 0.0610915 10.1315 0.00363527 11.5184C-0.0323614 12.3049 0.208078 13.1197 0.32276 13.4565V13.4633C0.394984 13.6616 0.67442 14.3384 1.13038 14.9091C1.4976 15.3668 1.93145 15.7688 2.41795 16.1022V16.095L2.4251 16.1022C3.86336 17.0621 5.45875 16.9991 5.45875 16.9991C5.73564 16.9882 6.66002 16.9991 7.71062 16.51C8.87589 15.9678 9.53929 15.16 9.53929 15.16C9.96317 14.6773 10.3002 14.1272 10.5359 13.5333C10.8049 12.8389 10.8947 12.0059 10.8947 11.6732V5.68382C10.9307 5.7049 11.4109 6.017 11.4109 6.017C11.4109 6.017 12.1031 6.45263 13.1823 6.73617C13.9567 6.93812 15.0002 6.98096 15.0002 6.98096V4.08228C14.6347 4.12126 13.8926 4.00793 13.1323 3.63577Z" fill="#FAAA31"/>
</g>
<defs>
<clipPath id="clip0_69_5346">
<rect width="15" height="17" fill="white"/>
</clipPath>
</defs>
</svg>

            </button>
            </a>
          </div>
        </div>
        <div
          className="box-container"
          style={{
            marginTop: "50px",
          }}
        >
          <ul>
            <li>
              <h1>{`${t("contact")}`}</h1>
            </li>
            <li>
              <img src="/assets/images/icons/pin.png" alt="" />
              <p>Prishtine, Kosove</p>
            </li>
            <li>
              <img src="/assets/images/icons/cell.png" alt="" />
              <p>(+383) 49 678 001</p>
            </li>
            <li>
              <img src="/assets/images/icons/email.png" alt="" />
              <p>info@temaj.eu</p>
            </li>
          </ul>
        </div>
        <div
          className="box-container"
          style={{
            marginTop: "50px",
          }}
        >
          <ul>
            <li>
              <h1>{`${t("resources")}`}</h1>
            </li>
            {/* <li>
              <NavLink to="/policies/faq">FAQ</NavLink>
            </li> */}
            <li>
              <NavLink to="/policies/policy-privacy ">Policy privacy</NavLink>
            </li>
            <li>
              <NavLink to="/policies/terms-of-conditions">
                Terms of conditions
              </NavLink>
            </li>
            <li>
              <NavLink to="/policies/refund-policy">Returns & Refunds</NavLink>
            </li>
          </ul>
        </div>
        <div
          className="box-container"
          style={{
            marginTop: "50px",
          }}
        >
          <ul>
            <li>
              <h1>{`${t("categories")}`}</h1>
            </li>
            <li>
              <NavLink>Exterier</NavLink>
            </li>
            <li>
              <NavLink>Banjo</NavLink>
            </li>
            <li>
              <NavLink>Enterier</NavLink>
            </li>
            <li>
              <NavLink>Kuzhina</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
