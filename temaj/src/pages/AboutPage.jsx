import React from 'react'
import {About, SubSection} from '../components'
import {useMediaQuery} from '@mui/material';

const AboutPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <About/>
            <SubSection/>
        </div>
    )
}

export default AboutPage