import React, { useEffect, useState } from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import { OffertBanner } from "..";
import axios from "axios";
import { brandProductsUrl } from "../../utils/consts";
import { getBrands } from "../../api/homePageApi";
import { useTranslation } from "react-i18next";

const BrandsGalery = () => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);

  const pattern = [
    { xs: 12, sm: 6, md: 2.4 },
    { xs: 12, sm: 6, md: 2.4 },
    { xs: 12, sm: 6, md: 2.4 },
    { xs: 12, sm: 6, md: 2.4 },
  ];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        setBrands(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <>
      <div className="hero-wrapper">
        <div
          className="hero-container"
          style={{
            alignItems: "center",
          }}
        >
          <div
            className="hero-title"
            style={{
              height: "100%",
              width: "80%",
              gap: "20px",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <h1> {`${t("ourBrand")}`}</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit
              aspernatur neque repellendus molestias consequatur laborum sit
              reiciendis vel illo, quo delectus earum! Harum delectus rerum
              sapiente magni voluptates quasi dolor reiciendis aut iusto
              recusandae veniam laborum, nostrum dolore sunt non, dolorum
              consectetur numquam ab fugiat corrupti amet doloribus! Unde, odit!
              At, enim repellendus quas dolores porro natus placeat laborum in
              facilis neque cum recusandae nam ratione sequi cupiditate
              necessitatibus, blanditiis culpa officiis ducimus. Animi id
              temporibus accusamus sequi voluptatibus consectetur vel, eius
              totam quod, neque aliquid porro dolor quia cumque eos officia
              incidunt a, maiores illum! Provident quod quis repellendus!
            </p>
          </div>
          <Grid container spacing={2}>
            {brands?.slice(0, 10)?.map((el, index) => {
              const { xs, sm, md } = pattern[index % pattern.length];
              return (
                <Grid
                  item
                  xs={xs}
                  sm={sm}
                  md={md}
                  key={el.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      height: "150px",
                      width: "150px",
                      backgroundColor: "#fff",
                      borderRadius: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        height: "80%",
                        width: "80%",
                        borderRadius: "50px",
                      }}
                      src={el.brand_logo}
                      alt="logo"
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default BrandsGalery;
