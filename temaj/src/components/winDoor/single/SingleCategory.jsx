import React, {useEffect, useRef} from "react";
import "./style.scss";
import useCategory from "./useCategory";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import {FreeMode} from "swiper/modules";
import {useMediaQuery} from "@mui/material";

const SingleCategory = () => {
    const isSmallDev = useMediaQuery("(max-width: 768px)");
    const category = useCategory();
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
        }
    }, [category?.photos]);

    if (!category) return <div>Category not found</div>;

    const {name, title, image, link, desc1, photos, desc2, banner, desc3} =
        category;

    const createParagraphs = (text) => {
        return text
            .split("\n")
            .map((paragraph, index) => <p key={index}>{paragraph}</p>);
    };

    return (
        <div
            className="single-cat-wrapper"
        >
            <div className="single-cat-container">
                <div className="single-content">
                    <div className="single-img" style={{height: isSmallDev ? '400px' : "calc(100vh - 100px)"}}>
                        <img src={image} alt=""/>
                    </div>
                    <div className="content">
                        <h1>{title}</h1>
                        {createParagraphs(desc1)}
                    </div>
                    <div className="galery">
                        <Swiper
                            ref={swiperRef}
                            breakpoints={{
                                340: {
                                    slidesPerView: 1,
                                    spaceBetween: 2,
                                },
                                700: {
                                    slidesPerView: 2,
                                    spaceBetween: 5,
                                },
                            }}
                            freeMode={true}
                            modules={[FreeMode]}
                            style={{
                                maxWidth: "100%",
                            }}
                        >
                            {photos.map((photo, index) => (
                                <SwiperSlide key={index}>
                                    <div className="galery-card">
                                        <img src={photo} alt="no-pic"/>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="content">{createParagraphs(desc2)}</div>
                    <div className="single-img" style={{height: isSmallDev ? '300px' : "500px"}}>
                        <img src={banner} alt=""/>
                    </div>
                    <div className="content">{createParagraphs(desc3)}</div>
                </div>
                <div className="single-contact">
                    <div className="box">
                        <h1>Na kontakto</h1>
                        <form>
                            <input type="text" name="user_name" placeholder="Emri"/>
                            <input type="email" name="user_email" placeholder="Email"/>
                            <input
                                type="tel"
                                id="phone"
                                name="user_phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                required
                                placeholder="Telefoni"
                            />
                            <textarea name="message" placeholder="Mesazhi"/>
                            <button type="submit" className="primary-btn">
                                Dërgo
                            </button>
                        </form>
                        <h1>Kontakt</h1>
                        <div className="line">
                            <img src="/assets/images/windoor/assets/pin.png" alt=""/>
                            <p>Osman Rexhepi, Prizren</p>
                        </div>
                        <div className="line">
                            <img src="/assets/images/windoor/assets/tel.png" alt=""/>
                            <p>044 123 456</p>
                        </div>
                        <div className="line">
                            <img src="/assets/images/windoor/assets/email.png" alt=""/>
                            <p>info@temaj-windoor.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;
