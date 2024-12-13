import React from 'react'
import {OrderPending} from '../components'
import {useMediaQuery} from "@mui/material";

const OrderPendingPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <OrderPending/>
        </div>
    )
}

export default OrderPendingPage
