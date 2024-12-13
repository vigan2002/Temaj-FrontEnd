import React, {useEffect, useRef} from "react";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import {Autoplay, FreeMode} from "swiper/modules";
import {aboutCom, team} from "../../utils/server";
import {Grid} from "@mui/material";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
        }
    }, [aboutCom]);

    return (
        <div className="static-wrapper">
            <div className="static-title">
                <h1>{`${t("about")}`}</h1>
                <p>
                Zbuloni elegancën e pllakave tona premium. Transformoni hapësirën tuaj me cilësi dhe stil.
                </p>
            </div>
            <div className="static-container">
                <div className="left">
                    <img src="/assets/content/qeramik/Ed1t0.jpg" alt=""/>
                </div>
                <div className="right">
                    <h1>{`${t("whatWe")}`}</h1>
                    <p>
                    Stafi ynë profesional dhe arkitektët janë këtu për t'ju ndihmuar të bëni zgjedhjen ideale për hapësirën tuaj. Nga dizajni te instalimi, ne jemi këtu për ju.
                    </p>
                    <div className="boxes">
                        <div className="box">
                            <h1>50+</h1>
                            <p>Employees</p>
                        </div>
                        <div className="box">
                            <h1>20+</h1>
                            <p>Brands</p>
                        </div>
                        <div className="box">
                            <h1>1k+</h1>
                            <p>Products</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="static-title">
                <h1>
                    Temaj Qeramike is the <br/>
                    best around the world
                </h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit
                    aspernatur neque repellendus molestias consequatur laborum sit
                    reiciendis vel illo, quo delectus earum! Harum delectus rerum
                </p>
                <button onClick={() => navigate("/contact")} className="primary-btn">
                    Contact us
                </button>
            </div>
            <div className="about-com">
                <Swiper
                    ref={swiperRef}
                    breakpoints={{
                        340: {
                            slidesPerView: 1.5,
                            spaceBetween: 0,
                        },
                        700: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                        },
                    }}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    freeMode={true}
                    modules={[Autoplay, FreeMode]}
                    style={{
                        height: '450px',
                        maxWidth: '100%'
                    }}
                >
                    {aboutCom.map((el, index) => (
                        <SwiperSlide key={`${el.id}-${index}`}>
                            <div className="about-card">
                                <img src={el.image} alt="no-pic"/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="team">
                <h1>Our Team</h1>
                <Grid container spacing={3}>
                    {team?.map((el) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            xl={3}
                            key={el.id}
                            sx={{
                                height: "100%",
                            }}
                        >
                            <img
                                src={el.image}
                                alt=""
                                style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    objectPosition: "0 0",
                                }}
                            />
                            <div>
                                <h1
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: "400",
                                        marginTop: "8px",
                                    }}
                                >
                                    {el.name}
                                </h1>
                                <p
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "400",
                                        lineHeight: "22px",
                                        color: "#CBCBCB",
                                    }}
                                >
                                    {el.position}
                                </p>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        lineHeight: "22px",
                                        color: "#CBCBCB",
                                    }}
                                >
                                    {el.email}
                                </p>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default About;
