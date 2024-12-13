import React from "react";
import {useMediaQuery} from "@mui/material";
import {SingleCategory} from "../components";

const WinCategoryPage = () => {
    window.scrollTo({top: 0});
    const isSmallDev = useMediaQuery("(max-width: 768px)");
    return (
        <div
            style={{
                paddingTop: isSmallDev ? "80px" : "0px",
            }}
        >
            <SingleCategory/>
        </div>
    );
};

export default WinCategoryPage;
