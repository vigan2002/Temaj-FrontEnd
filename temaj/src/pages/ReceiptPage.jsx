import React from 'react'
import {Receipt, SubSection} from '../components'
import {useMediaQuery} from "@mui/material";

const ReceiptPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <Receipt/>
            <SubSection/>
        </div>
    )
}

export default ReceiptPage
