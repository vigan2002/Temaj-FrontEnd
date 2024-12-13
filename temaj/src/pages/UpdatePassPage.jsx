import React from 'react'
import { SubSection, UpdatePassword} from '../components'
import {useMediaQuery} from "@mui/material";

const UpdatePassPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <UpdatePassword/>
            <SubSection/>
        </div>
    )
}

export default UpdatePassPage
