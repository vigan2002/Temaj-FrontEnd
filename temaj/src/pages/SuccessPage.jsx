import React from "react";
import { useMediaQuery } from "@mui/material";
import { Success } from "../components";

const SuccessPage = () => {
  window.scrollTo({ top: 0 });
  const isSmallDev = useMediaQuery("(max-width: 900px)");
  return (
    <div
      style={{
        paddingTop: isSmallDev ? "80px" : "140px",
      }}
    >
      <Success />
    </div>
  );
};

export default SuccessPage;
