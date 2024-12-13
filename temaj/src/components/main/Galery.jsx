import React, { useEffect, useState } from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import BannerSkeletonLoader from "../loader/BannerSkeletonLoader";

const Galery = ({ dataGallery }) => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const [gallery, setGallery] = useState([]);

  const pattern = [
    { xs: 12, sm: 6, md: 6 },
    { xs: 12, sm: 6, md: 6 },
    { xs: 12, sm: 6, md: 8 },
    { xs: 12, sm: 6, md: 4 },
  ];

  useEffect(() => {
    if (dataGallery && dataGallery.data && dataGallery.data.MAIN) {
      setGallery(dataGallery.data.MAIN);
    }
  }, [dataGallery]);

  if (dataGallery.isLoading || !gallery.length) {
    return <BannerSkeletonLoader />;
  }

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="main-title">
          <h1>{`${t("showRoom")}`}</h1>
        </div>
        <Grid container spacing={2}>
          {gallery?.slice(0, 8)?.map((el, index) => {
            // const { xs, sm, md } = pattern[index % pattern.length];
            console.log(el); // Log the entire object to inspect its structure
            return (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <div className="galery-card">
                  <img src={el} alt={`Gallery ${index}`} className="galery-card"/>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Galery;
