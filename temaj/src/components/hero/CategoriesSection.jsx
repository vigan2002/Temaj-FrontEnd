import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

const CategoriesSection = ({ dataCategories }) => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const [categoriesData, setCategoriesData] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  useEffect(() => {
    if (dataCategories.data) {
      setCategoriesData(dataCategories.data);
    }
  }, [dataCategories.data]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [categoriesData]);

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <div className="hero-title" style={{
          marginTop: isSmallDev ? '50px': '',
        }}>
          <div className="txt" style={{
            paddingBottom: isSmallDev ? '40px' : '',
          }}>
            <h1>{`${t("categoriesTit")}`}</h1>
            <p>{`${t("categoriesSub")}`}</p>
          </div>
        </div>
        <Swiper
          ref={swiperRef}
          breakpoints={{
            340: {
              slidesPerView: 1.2,
              spaceBetween: 7,
            },
            700: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          freeMode={true}
          modules={[FreeMode]}
          style={{
            maxWidth: "100%",
          }}
        >
          {categoriesData.map((el) => (
            <SwiperSlide key={el.count}>
              <div
                className="category-card"
                onClick={() =>
                  navigate(`/products?category=${el.category_type}`)
                }
                style={{
                  cursor: "pointer",
                }}
              >
                <img src={el.category_photo} alt="no-pic" />
                <div className="category-content">
                  <button className="white-btn">{el.category_type}</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoriesSection;
