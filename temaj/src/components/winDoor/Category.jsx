import React from 'react'
import './style.scss'
import Grid from "@mui/material/Grid";
import {winCategory} from '../../utils/server'

const Category = () => {
    return (
        <div className='win-wrapper'>
            <div className="win-container">
                <div className="win-title">
                    <h1>Kategoria</h1>
                </div>
                <Grid container spacing={{xs: 1, sm: 2, md: 3}}>
                    {winCategory?.map((el) => (
                        <Grid item xs={12} sm={6} md={4} key={el.id}>
                            <div
                                className="win-category"
                                style={{
                                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0) 50%), url(${el.image})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                }}
                            >
                                <div className="category-content">
                                    <h1>{el.name}</h1>
                                    <a href={el.link}>
                                        <button><img src="/assets/images/icons/arrowWh.png" alt=""/></button>
                                    </a>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default Category
