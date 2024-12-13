import React from "react";
import {BrandsGalery, SubSection} from "../components";
import {useMediaQuery} from "@mui/material";

const BrandPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <BrandsGalery/>
            <SubSection/>
        </div>
    );
};

export default BrandPage;
