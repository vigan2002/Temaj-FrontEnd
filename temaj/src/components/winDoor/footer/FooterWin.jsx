import React from "react";
import "./style.scss";
import {NavLink} from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const FooterWin = () => {
  const isSmallDev = useMediaQuery("(max-width: 768px)");

    return (
        <div className="footerWin-section">
            <div className="footerWin-wrapper">
                <div className="main-container">
                    <div className="logo">
                        <img
                            src="/assets/images/windoor/logo.png"
                            alt=""
                            className="logo"
                        />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="socials">
                        <button>
                            <img src="/assets/images/icons/fb.png" alt=""/>
                        </button>
                        <div className="line"></div>
                        <button>
                            <img src="/assets/images/icons/insta.png" alt=""/>
                        </button>
                        <div className="line"></div>
                        <button>
                            <img src="/assets/images/icons/in.png" alt=""/>
                        </button>
                    </div>
                </div>
                <div
                    className="box-container"
                    style={{
                        marginTop: isSmallDev? '50px' : "0",
                    }}
                >
                    <ul>
                        <li>
                            <h1>KONTAKTI</h1>
                        </li>
                        <li>
                            <img src="/assets/images/icons/pin.png" alt=""/>
                            <p>Prishtine, Kosove</p>
                        </li>
                        <li>
                            <img src="/assets/images/icons/cell.png" alt=""/>
                            <p>(+383) 49 123 456</p>
                        </li>
                        <li>
                            <img src="/assets/images/icons/email.png" alt=""/>
                            <p>info@temajwindoor.eu</p>
                        </li>
                    </ul>
                </div>
                <div
                    className="box-container"
                    style={{                        
                        marginTop: isSmallDev? '50px' : "0",
                    }}
                >
                    <ul>
                        <li>
                            <h1>Resources</h1>
                        </li>
                        <li>
                            <NavLink to="/policies/faq">FAQ</NavLink>
                        </li>
                        <li>
                            <NavLink to="/policies/terms-of-conditions">
                                Terms of conditions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/policies/policy-privacy ">Policy privacy</NavLink>
                        </li>
                    </ul>
                </div>
                <div
                    className="box-container"
                    style={{
                        marginTop: isSmallDev? '50px' : "0",
                    }}
                >
                    <ul>
                        <li>
                            <h1>Kategoritë</h1>
                        </li>
                        <li>
                            <NavLink>Dritare</NavLink>
                        </li>
                        <li>
                            <NavLink>Dyer</NavLink>
                        </li>
                        <li>
                            <NavLink>Aksesorë</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="lower-part">
                <p>TE GJITHA TE DREJTAT E REZERVUARA. © TEMAJ 2024</p>
            </div>
        </div>
    );
};

export default FooterWin;
