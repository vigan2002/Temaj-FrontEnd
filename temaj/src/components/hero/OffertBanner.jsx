import React, {useEffect, useRef, useState} from "react";
import "./style.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import {Autoplay} from "swiper/modules";
import {useMediaQuery} from "@mui/material";

const OffertBanner = ({dataBanner}) => {
    const isSmallDev = useMediaQuery("(max-width: 768px)");
    const [banners, setBanners] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current !== null) {
            swiperRef.current.swiper.update();
        }
    }, [banners]);

    useEffect(() => {
        if (swiperRef.current !== null) {
            swiperRef.current.swiper.update();
        }
    }, [banners]);


    useEffect(() => {
        if (dataBanner.data && dataBanner.data.banner2) {
            setBanners(dataBanner.data.banner2);
        }
    }, [dataBanner.data]);


    return (
        <div className="hero-wrapper">
            <div className="hero-container">
                <Swiper
                    ref={swiperRef}
                    breakpoints={{
                        340: {
                            slidesPerView: 1,
                            spaceBetween: 7,
                        },
                        700: {
                            slidesPerView: 1,
                            spaceBetween: "20px",
                        },
                    }}
                    autoplay={{
                      delay: 7000,
                      disableOnInteraction: false,
                    }}
                    freeMode={true}
                    modules={[Autoplay ]}
                    style={{
                        maxWidth: "100%",
                    }}
                >
                    {banners?.map((el, index) => (
                        <SwiperSlide id="swipeslides" key={el.id || index}>
                            <div
                                className="banner-wrapper"
                                style={{
                                    height: isSmallDev ? "230px" : "700px",
                                }}
                            >
                                <a href={el.banner_redirect}>
                                    <img
                                        // src={isSmallDev ? el.banner_photo_mobile : el.banner_photo}
                                        src={el.banner_photo}
                                        alt={"oferta"}
                                        style={{
                                            borderRadius: "10px",
                                        }}
                                    />
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default OffertBanner;
