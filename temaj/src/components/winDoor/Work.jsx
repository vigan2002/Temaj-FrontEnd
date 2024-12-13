import React from 'react'
import './style.scss'
import {galeryWin} from '../../utils/server'
import {Grid} from '@mui/material'

const Work = () => {
    return (
        <div className='win-wrapper'>
            <div className="win-container">
                <div className="win-title">
                    <h1>Punët tona</h1>
                </div>
                <Grid container spacing={{xs: 1, sm: 2, md: 3}}>
                    {galeryWin.slice(0, 6)?.map((el) => (
                        <Grid item xs={12} sm={6} md={4} key={el.id}>
                            <div
                                className="win-work"
                                style={{
                                    backgroundImage: `url(${el.image})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                }}
                            >
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div className="win-btn">
                    {/* <button>Shiko më shumë  <img src="/assets/images/icons/arrowB.png" alt="" /></button> */}
                </div>
            </div>
        </div>
    )
}

export default Work
