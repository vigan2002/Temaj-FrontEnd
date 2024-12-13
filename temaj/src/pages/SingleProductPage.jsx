import React from 'react'
import {RelatedProducts, Single, SubSection} from '../components'
import {useMediaQuery} from "@mui/material";

const SingleProductPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <Single/>
            <RelatedProducts/>
            <SubSection/>
        </div>
    )
}

export default SingleProductPage
