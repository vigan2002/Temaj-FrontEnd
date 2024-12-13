import React from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import {useMediaQuery} from "@mui/material";
import {blogs} from "../../utils/server";
import { useTranslation } from "react-i18next";

const BlogSection = () => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
    const pattern = [
        {xs: 12, sm: 6, md: 7},
        {xs: 12, sm: 6, md: 5},
        {xs: 12, sm: 6, md: 5},
        {xs: 12, sm: 6, md: 7},
    ];
    return (
        <div className="main-wrapper">
            <div className="main-container">
                <div className="main-title">
                    <h1>{`${t("newFrom")}`} Temaj</h1>
                </div>
                <Grid container spacing={2}>
                    {blogs?.slice(0, 4)?.map((el, index) => {
                        const {xs, sm, md} = pattern[index % pattern.length];
                        return (
                            <Grid item xs={xs} sm={sm} md={md} key={el.id}>
                                <div
                                    className="blog-card"
                                    style={{
                                        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0) 50%), url(${el.image})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                    }}
                                >
                                    <div className="card-content">
                                        <h1>{el.title}</h1>
                                        <a>
                                            <button>See More</button>
                                        </a>
                                    </div>
                                    <p>{el.date}</p>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </div>
    );
};

export default BlogSection;
