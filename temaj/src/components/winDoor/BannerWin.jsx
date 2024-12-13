import React from "react";
import {FaFacebook, FaInstagram} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

const BannerWin = () => {
    return (
        <div id="banner" className="banner-win">
            <div className="banner-container">
                <h1>Zgjedhje e lehtë për një jetë kualitative</h1>
                <p>
                Teknologji e Avancuar dhe Cilësi Maksimale
                </p>
                {/* <button>Shiko më shume <img src="/assets/images/icons/arrowWh.png" alt="" /></button> */}
            </div>
            <div className="socials">
                <a href="https://www.facebook.com">
                    <FaFacebook color="#fff"/>
                </a>
                <a href="https://www.facebook.com">
                    <FaXTwitter color="#fff"/>
                </a>
                <a href="https://www.instagram.com">
                    <FaInstagram color="#fff"/>
                </a>
                <div className="line"></div>
            </div>
        </div>
    );
};

export default BannerWin;
