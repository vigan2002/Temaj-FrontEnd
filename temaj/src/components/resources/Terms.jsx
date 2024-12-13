import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

const Terms = () => {
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
        <h1>{t("terms")} Temaj.eu</h1>
        <div className="txt">
        <h2>1. {t("terms1")}</h2>
        <p>{t("terms2")}</p>
        <h2>2. {t("terms3")}</h2>
        <p>{t("terms4")}</p>
        <h2>3. {t("terms5")}</h2>
        <p>{t("terms6")}</p>
        <h2>4. {t("terms7")}</h2>
        <p>{t("terms8")}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
