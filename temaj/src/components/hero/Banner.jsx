// src/components/Banner.js
import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useMediaQuery } from "@mui/material";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import BannerSkeletonLoader from "../../components/loader/BannerSkeletonLoader";
import { useTranslation } from "react-i18next";

const Banner = ({ dataBanner }) => {
  const { t } = useTranslation();
  const [banners, setBanners] = useState([]);
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (dataBanner.data && dataBanner.data.banner1) {
      setBanners(dataBanner.data.banner1);
    }
  }, [dataBanner.data]);

  useEffect(() => {
    if (dataBanner.data && dataBanner.data.banner1) {
      setBanners(dataBanner.data.banner1);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [dataBanner.data]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  }, [banners]);

  if (isLoading) {
    return <BannerSkeletonLoader />;
  }

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="banner-section">
      {/* <div className="navigation-btn" style={{
        display: isSmallDev ? 'none' : 'flex'
      }}>
        <button onClick={handlePrev}>
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.921961 9.08341C0.921961 9.27605 0.995591 9.46888 1.14266 9.61595L8.6751 17.1484C8.96943 17.4427 9.44605 17.4427 9.74019 17.1484C10.0343 16.8541 10.0345 16.3774 9.74019 16.0833L2.74029 9.08341L9.74019 2.08351C10.0345 1.78918 10.0345 1.31256 9.74019 1.01842C9.44586 0.724279 8.96925 0.724091 8.6751 1.01842L1.14266 8.55086C0.995591 8.69793 0.921961 8.89077 0.921961 9.08341Z"
              fill="black"
            />
          </svg>
        </button>
        <button onClick={handleNext}>
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.07816 9.08341C9.07816 9.27605 9.00453 9.46888 8.85746 9.61595L1.32502 17.1484C1.03069 17.4427 0.554074 17.4427 0.259932 17.1484C-0.0342097 16.8541 -0.034398 16.3774 0.259932 16.0833L7.25983 9.08341L0.259932 2.08351C-0.0343986 1.78918 -0.0343987 1.31256 0.259931 1.01842C0.554262 0.724279 1.03088 0.724091 1.32502 1.01842L8.85746 8.55086C9.00453 8.69793 9.07816 8.89077 9.07816 9.08341Z"
              fill="black"
            />
          </svg>
        </button>
      </div> */}
      <Swiper
        ref={swiperRef}
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: "0px",
          },
          700: {
            slidesPerView: 1,
            spaceBetween: "0px",
          },
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        style={{
          maxWidth: "100%",
          backgroundColor: "var(--bck-color)",
        }}
      >
        {banners.map((el, index) => (
          <SwiperSlide id="swipeslides" key={el.id || index}>
            <div className="banner-wrapper">
              <div className="banner-wrapper-shadow"></div>
              <img src={el.banner_photo} alt={"banner"} />
              <div className="banner-content">
                <div className="banner-content-inner">
                  <h1>{el.banner_title}</h1>
                  <p>{el.banner_description}</p>
                  <a
                    href={el.banner_redirect}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="transparentWh-btn">{`${t("seeMore")}`}</button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
