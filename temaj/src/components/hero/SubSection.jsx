import React from 'react'
import "./style.scss";
import {useMediaQuery} from "@mui/material";
import { useTranslation } from "react-i18next";

const SubSection = () => {
    const { t } = useTranslation();
    const isSmallDev = useMediaQuery('(max-width: 768px)');

    return (
        <div className="hero-wrapper">
            <div className="hero-container" style={{
                alignItems: 'center',
                gap: '20px'
            }}>
                <h1 style={{
                    fontSize: isSmallDev ? '16px' : '22px',
                    textAlign: 'center'
                }}>
                    {`${t("latest")}`}
                </h1>
                <div className="sub-functions">
                    <input type="text" placeholder='Email Address'/>
                    <button className='primary-btn'>{`${t("subscribe")}`}</button>
                </div>
            </div>
        </div>
    )
}

export default SubSection
