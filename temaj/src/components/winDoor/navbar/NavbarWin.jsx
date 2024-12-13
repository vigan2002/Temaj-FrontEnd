import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "./style.scss";

const NavbarWin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [toggleBtn, setToggleBtn] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [shouldTrackScroll, setShouldTrackScroll] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        if (shouldTrackScroll) {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (shouldTrackScroll) {
                window.removeEventListener("scroll", handleScroll);
            }
        };
    }, [shouldTrackScroll]);

    useEffect(() => {
        // Check if the current route is a category route
        if (location.pathname.startsWith("/temaj-windoor/category/")) {
            setIsFixed(true);
            setShouldTrackScroll(false);
        } else {
            setShouldTrackScroll(true);
        }
    }, [location]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setToggleBtn(false);
        }
    };

    const handleContactClick = () => {
        // Check if already on the homepage, then scroll directly
        if (location.pathname === "/temaj-windoor/") {
            scrollToSection("contact");
        } else {
            // Navigate to the homepage and then scroll
            navigate("/temaj-windoor/");
            setTimeout(() => scrollToSection("contact"), 100); // Add a slight delay to ensure the navigation completes
        }
    };

    const toggleMenu = () => {
        setToggleBtn(!toggleBtn);
    };

    return (
        <div className={`win-nav-wrapper ${toggleBtn ? "mobile-menu" : ""} ${isFixed ? "fixed" : ""}`}>
            <div className="win-nav-container">
                <div className="win-nav-logo">
                    <NavLink to="/temaj-windoor" onClick={toggleMenu}>
                        <img
                            src="/assets/images/windoor/logo.png"
                            alt="logo"
                            className="logo"
                        />
                    </NavLink>
                </div>
                <div className={`navbar-list ${toggleBtn ? "show-mobile-menu" : ""}`}>
                    <ul>
                        <li>
                            <button onClick={() => toggleMenu && navigate("/")}>
                                Ballina
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    toggleMenu && navigate("/temaj-windoor/category/1")
                                }
                            >
                                Dritare
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    toggleMenu && navigate("/temaj-windoor/category/2")
                                }
                            >
                                Dyer
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    toggleMenu && navigate("/temaj-windoor/category/3")
                                }
                            >
                                Aksesorë
                            </button>
                        </li>
                        {/* <li>
                            <button onClick={() => toggleMenu && scrollToSection("about")}>
                                rreth nesh
                            </button>
                        </li> */}
                        <li>
                            <button
                               onClick={() => { toggleMenu(); handleContactClick(); }}
                                style={{
                                    backgroundColor: "var(--primary-color)",
                                }}
                            >
                                kontakti
                            </button>
                        </li>
                    </ul>
                </div>

                <button className="mobile-menu-toggle" onClick={toggleMenu}>
                    {toggleBtn ? <IoClose /> : <FaBars />}
                </button>
            </div>
        </div>
    );
};

export default NavbarWin;
