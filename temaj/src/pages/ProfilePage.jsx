import React from 'react'
import {Profile, SubSection} from '../components'
import {useMediaQuery} from "@mui/material";

const ProfilePage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <Profile/>
            <SubSection/>
        </div>
    )
}

export default ProfilePage
