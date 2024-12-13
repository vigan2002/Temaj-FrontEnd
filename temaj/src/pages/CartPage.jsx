import React from "react";
import {Cart, SubSection} from "../components";
import {useMediaQuery} from "@mui/material";

const CartPage = () => {
    window.scrollTo({top: 0});
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div
            style={{
                marginTop: isSmallDev ? "80px" : "0px",
            paddingTop: isSmallDev ? '' : '140px'
            }}
        >
            <Cart/>
            <SubSection/>
        </div>
    );
};

export default CartPage;
