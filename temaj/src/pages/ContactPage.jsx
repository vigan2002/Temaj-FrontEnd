import React from "react";
import {Contact, SubSection} from "../components";
import {useMediaQuery} from "@mui/material";

const ContactPage = () => {
    window.scrollTo({top: 0});
    const isSmallDev = useMediaQuery("(max-width: 900px)");

    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <Contact/>
            <SubSection/>
        </div>
    );
};

export default ContactPage;
