import React, { useEffect, useState } from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { productsUrl } from "../../utils/consts";
import { ProductCard } from "../";
import { getRelatedProducts } from "../../api/productApi";
import { useTranslation } from "react-i18next";

const RelatedProducts = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await getRelatedProducts(id);
        setRelatedProducts(response);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(404);
          navigate("/error", { state: { status: 404 } });
        } else {
          setError(err.response ? err.response.status : 500);
          navigate("/error", {
            state: { status: err.response ? err.response.status : 500 },
          });
        }
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "var(--bck-color)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error fetching related products: {error.message}, id: {id}
      </div>
    );
  }

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <div className="hero-title">
          <h1>{`${t("relatedProducts")}`}</h1>
          <div className="nav"></div>
        </div>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {relatedProducts.map((el) => (
            <Grid item xs={6} sm={4} md={3} key={el.id}>
              {/* <ProductCard product={el}/> */}
              <div
                onClick={() => {
                  window.location.reload();
                }}
              >
                <ProductCard product={el} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default RelatedProducts;
