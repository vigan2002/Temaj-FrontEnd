import React from "react";
import { Navbar, Footer, MobileNavbar, FooterWin, NavbarWin } from "../../components";
import { useMediaQuery } from "@mui/material";
import { Routes, Route } from "react-router-dom";

const Layout = ({ children, hideNavbar, hideFooter }) => {
    const isSmallScreen = useMediaQuery("(max-width: 900px)");

    return (
        <>
            {!hideNavbar && (
                <Routes>
                    <Route path="/temaj-windoor/*" element={<NavbarWin />} />
                    <Route path="/*" element={isSmallScreen ? <MobileNavbar /> : <Navbar />} />
                </Routes>
            )}
            {children}
            {!hideFooter && (
                <Routes>
                    <Route path="/temaj-windoor/*" element={<FooterWin />} />
                    <Route path="/*" element={<Footer />} />
                </Routes>
            )}
        </>
    );
};

export default Layout;
