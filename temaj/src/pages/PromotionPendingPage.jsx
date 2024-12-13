import React from 'react'
import { PromotionPending } from '../components'
import {useMediaQuery} from "@mui/material";

const PromotionPendingPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <PromotionPending/>
        </div>
    )
}

export default PromotionPendingPage
