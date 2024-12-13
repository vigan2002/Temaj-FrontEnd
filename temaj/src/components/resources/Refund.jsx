import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

const Refund = () => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 900px)");

  return (
    <div
      className="res-wrapper"
      style={{
        marginTop: isSmallDev ? "80px" : "0px",
        paddingTop: isSmallDev ? "" : "140px",
      }}
    >
      <div className="res-container">
        <h1>{t("policies")} Temaj.eu</h1>
        <div className="txt">
        <h2>1. {t("policies1")}</h2>
        <p>{t("policies2")}</p>
        <h2>2. {t("policies3")}</h2>
        <p>{t("policies4")}</p>
        <h2>3. {t("policies5")}</h2>
        <p>{t("policies6")}</p>
        <h2>4. {t("policies7")}</h2>
        <p>{t("policies8")}</p>
        </div>
      </div>
    </div>
  );
};

export default Refund;
