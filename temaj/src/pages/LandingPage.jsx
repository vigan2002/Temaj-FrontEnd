import React from "react";
import { useMediaQuery } from "@mui/material";
import { Landing } from "../components";

const LandingPage = () => {
  window.scrollTo({ top: 0 });
  const isSmallDev = useMediaQuery("(max-width: 900px)");
  return (
    <div
      style={{
        marginTop: isSmallDev ? "80px" : "0px",
        paddingTop: isSmallDev ? "" : "140px",
      }}
    >
        <Landing/>
    </div>
  );
};

export default LandingPage;
