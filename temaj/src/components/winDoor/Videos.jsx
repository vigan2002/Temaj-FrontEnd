import React from "react";
import "./style.scss";
import { videoWin } from "../../utils/server";
import { Grid } from "@mui/material";

const Videos = () => {
  return (
    <div className="win-wrapper">
      <div className="win-container">
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {videoWin.slice(0, 6)?.map((el) => (
            <Grid item xs={12} sm={6} md={4} key={el.id}>
              <div className="win-work">
                <video src={el.video} autoPlay muted loop playsInline />
              </div>
            </Grid>
          ))}
        </Grid>
        <div className="win-btn">
          {/* <button>Shiko më shumë  <img src="/assets/images/icons/arrowB.png" alt="" /></button> */}
        </div>
      </div>
    </div>
  );
};

export default Videos;
