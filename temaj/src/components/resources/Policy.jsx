import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

const Policy = () => {
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
        <h1>{t("privacy")} Temaj.eu</h1>
        <div className="txt">
        <h2>1. {t("privacy1")}</h2>
        <p>{t("privacy2")}</p>
        <h2>2. {t("privacy3")}</h2>
        <p>{t("privacy4")}</p>
        <h2>3. {t("privacy5")}</h2>
        <p>{t("privacy6")}</p>
        <h2>4. {t("privacy7")}</h2>
        <p>{t("privacy8")}</p>
        <h2>5. {t("privacy9")}</h2>
        <p>{t("privacy10")}</p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
