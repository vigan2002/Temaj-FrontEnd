import React, { useState, useEffect } from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { ProductCard } from "../";
import { useTranslation } from "react-i18next";

const SalePromote = ({ onsaledata }) => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (onsaledata.data) {
      setProducts(onsaledata.data);
    }
  }, [onsaledata.data]);

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <div className="hero-title">
          <div className="txt">
            <h1>{`${t("saleProducts")}`}</h1>
          </div>
          <div className="nav">
            <button
              className="transparent-btn"
              onClick={() => navigate("/products")}
              style={{
                display: isSmallDev ? "none" : "",
              }}
            >
              {`${t("seeMore")}`}
            </button>
          </div>
        </div>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {products?.map((el) => (
            <Grid item xs={6} sm={4} md={3} key={el.id}>
              <ProductCard product={el} />
            </Grid>
          ))}
        </Grid>
        <div
          className="hero-title"
          style={{
            display: isSmallDev ? "flex" : "none",
            justifyContent: "center",
          }}
        >
          <div className="nav">
            <button
              className="transparent-btn"
              onClick={() => navigate("/products")}
            >
              {`${t("seeMore")}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePromote;
