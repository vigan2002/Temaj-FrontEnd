import React from 'react'
import {SubSection, WishList} from '../components'
import {useMediaQuery} from "@mui/material";

const WishListPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <WishList/>
            <SubSection/>
        </div>
    )
}

export default WishListPage
