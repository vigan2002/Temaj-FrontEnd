import React from 'react'
import {Orders, SubSection} from '../components'
import {useMediaQuery} from "@mui/material";

const OrderPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <Orders/>
            <SubSection/>
        </div>
    )
}

export default OrderPage
