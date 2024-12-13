import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { winTestimonials } from "../../utils/server";
import { useMediaQuery } from "@mui/material";

const Testimonials = () => {
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.update();
    }
  }, [swiperRef]);

  return (
    <div className="testimonials-wrapper">
      <div className="testimonials-title">
        <h1>Cka thonë të tjerët për ne?</h1>
      </div>
      <div className="testimonials-container">
        <div className="carousel-wrapper">
          <Swiper
            ref={swiperRef}
            breakpoints={{
              340: {
                slidesPerView: 1.2,
                spaceBetween: 7,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            freeMode={true}
            modules={[FreeMode]}
            style={{
              maxWidth: "100%",
            }}
          >
            {winTestimonials.map((el) => {
              return (
                <SwiperSlide id="swipeslides" key={el.id}>
                  <div className="testimonials-card">
                    <div className="rates">
                      <p>( {el.rate} )</p>
                    </div>
                    <p>{el.desc}</p>
                    <h1>{el.name}</h1>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {isSmallDev ? (
            <></>
          ) : (
            <div className="testimonials-nav">
              <button>
                <img
                  src="/assets/images/icons/arrowB.png"
                  alt=""
                  style={{ transform: "rotate(180deg)" }}
                />
              </button>
              <button>
                <img src="/assets/images/icons/arrowB.png" alt="" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
