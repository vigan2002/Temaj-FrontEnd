import React from "react";
import {
    AboutSection,
    BannerWin,
    Category,
    ContactWin,
    Testimonials,
    Videos,
    Work,
} from "../components";
import {useMediaQuery} from "@mui/material";

const WinDoorPage = () => {
    window.scrollTo({top: 0});
    const isSmallDev = useMediaQuery("(max-width: 768px)");
    return (
        <div>
            <BannerWin/>
            <AboutSection/>
            <Category/>
            <Work/>
            <Videos/>
            {/* <Testimonials/> */}
            <ContactWin/>
        </div>
    );
};

export default WinDoorPage;
