import React, {useEffect, useRef, useState} from 'react'
import {
    Banner,
    BestSeller,
    Brands,
    CategoriesSection,
    NewArrivals,
    NewSanitary,
    OffertBanner,
    SalePromote,
    SubSection
} from '../components'
import StaticBanner from '../components/hero/StaticBanner'
import {getBanners, getCategories, getNewest, getSanitary, getBestseller, getBrands, getonSale} from '../api/homePageApi';
import {useQueries} from '@tanstack/react-query';
import {useMediaQuery} from "@mui/material";

const HomePage = () => {
    // window.scrollTo({top: 0});

    const [isScroll, setScroll] = useState(false);

    const queries = useQueries({
        queries: [
            {
                queryKey: ['banners'],
                queryFn: getBanners,
                staleTime: 1000 * 60 * 5,
            },
            {
                queryKey: ['categories'],
                queryFn: getCategories,
                staleTime: 1000 * 60 * 5,
            },
            {
                queryKey: ['newArrivals'],
                queryFn: getNewest,
                staleTime: 1000 * 60 * 5,
            },
            {
                queryKey: ['newSanitary'],
                queryFn: getSanitary,
                staleTime: 1000 * 60 * 5,
                enabled: isScroll,
            },
            {
                queryKey: ['bestseller'],
                queryFn: getBestseller,
                staleTime: 1000 * 60 * 5,
                enabled: isScroll,
            },
            {
                queryKey: ['brands'],
                queryFn: getBrands,
                staleTime: 1000 * 60 * 5,
                enabled: isScroll,
            },
            {
                queryKey: ['getonSale'],
                queryFn: getonSale,
                staleTime: 1000 * 60 * 5,
                enabled: isScroll,
            },

        ],
    });

    const [bannerQuery, categoriesQuery, newArrivalsQuery, newSanitaryQuery, bestSellerQuery, brandsQuery, onSaleQuery] = queries;

    const data = {
        banner: {
            data: bannerQuery.data,
            isLoading: bannerQuery.isLoading,
            error: bannerQuery.error,
        },
        categories: {
            data: categoriesQuery.data,
            isLoading: categoriesQuery.isLoading,
            error: categoriesQuery.error,
        },
        newArrivals: {
            data: newArrivalsQuery.data,
            isLoading: newArrivalsQuery.isLoading,
            error: newArrivalsQuery.error,
        },
        bestSeller: {
            data: bestSellerQuery.data,
            isLoading: bestSellerQuery.isLoading,
            error: bestSellerQuery.error,
        },
        newSanitary: {
            data: newSanitaryQuery.data,
            isLoading: newSanitaryQuery.isLoading,
            error: newSanitaryQuery.error,
        },
        brands: {
            data: brandsQuery.data,
            isLoading: brandsQuery.isLoading,
            error: brandsQuery.error,
        },
        onsale: {
            data: onSaleQuery.data,
            isLoading: onSaleQuery.isLoading,
            error: onSaleQuery.error,
        },
    };

    const startFetchOtherparts = useRef(null);

    useEffect(() => {
        if (!data.banner.isLoading) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (entry.target === startFetchOtherparts.current) {
                                setScroll(true);
                                observer.unobserve(startFetchOtherparts.current);
                            }
                        }
                    });
                },
                {threshold: 1}
            ); 

            if (startFetchOtherparts.current) {
                observer.observe(startFetchOtherparts.current);
            }

            return () => {
                if (startFetchOtherparts.current) {
                    observer.unobserve(startFetchOtherparts.current);
                }
            };
        }
    }, [data.banner.data]);


    const isSmallDev = useMediaQuery("(max-width: 768px)");
    return (
        <div style={{
            marginTop: isSmallDev ? '80px' : '0px',
            paddingTop: isSmallDev ? '' : '140px',
        }}>
            <Banner dataBanner={data.banner}/>
            <CategoriesSection dataCategories={data.categories}/>
            <NewArrivals dataArrivals={data.newArrivals}/>
            <div ref={startFetchOtherparts}></div>
            <OffertBanner dataBanner={data.banner}/>
            <BestSeller bestSeller={data.bestSeller}/>
            {/* <NewSanitary dataSanitary={data.newSanitary} /> */}
            <Brands brandsdata={data.brands}/>
            {/* <SalePromote onsaledata={data.onsale}/> */}
            <StaticBanner dataBanner={data.banner}/>
            <SubSection/>
        </div>
    )
}

export default HomePage