import React from 'react'
import {AboutQer, AboutWin, BlogSection, Galery, SelectiveBanner, SubSection} from '../components'
import {useMediaQuery} from "@mui/material";
import { getImagesBanners, getLandingBanner } from '../api/mainPageApi';
import {useQueries} from '@tanstack/react-query';

const PrimaryPage = () => {
    window.scrollTo({top: 0})
    const isSmallDev = useMediaQuery("(max-width: 900px)");

    const queries = useQueries({
        queries: [
            {
                queryKey: ['landingBanner'],
                queryFn: getLandingBanner,
            },
            {
                queryKey: ['imagesBanners'],
                queryFn: getImagesBanners,
            },
        ]
    });

    const [
        bannerQuery,
        galleryQuery,
    ] = queries;

    const data = {
        banner: {
            data: bannerQuery.data,
            isLoading: bannerQuery.isLoading,
            error: bannerQuery.error,
        },
        gallery: {
            data: galleryQuery.data,
            isLoading: galleryQuery.isLoading,
            error: galleryQuery.error,
        },
    };

    if (Object.values(data).some(({ isLoading }) => isLoading)) return <div>Loading...</div>;
    if (Object.values(data).some(({ error }) => error)) return <div>Error loading data.</div>;


    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px'
        }}>
            <SelectiveBanner dataBanner={data.banner}/>
            <BlogSection/>
            <AboutQer/>
            <AboutWin/>
            <Galery dataGallery={data.gallery}/>
            <SubSection/>
        </div>
    )
}

export default PrimaryPage
