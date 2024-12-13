import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const StaticBanner = ({ dataBanner }) => {
  const isSmallDev = useMediaQuery('(max-width: 768px)');
  const [banner3, setBanner3] = useState(null);
  const [banner4, setBanner4] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataBanner.data && dataBanner.data.banner3 && dataBanner.data.banner4) {
      setBanner3(dataBanner.data.banner3[0]);
      setBanner4(dataBanner.data.banner4[0]);
    }
  }, [dataBanner.data]);


  if (!banner3 || !banner4) {
    return <div style={{
      backgroundColor: 'var(--bck-color)'
    }}>Loading...</div>;
  }

  return (
    <div className="hero-wrapper">
      <div className="hero-container" style={{ flexDirection: isSmallDev ? 'column' : 'row', gap: '0px' }}>
        <div className="left">
          <img src={banner3.banner_photo} alt={banner3.banner_title} onClick={() => navigate(`${banner3.banner_redirect}`)} />
        </div>
        <div className="right">
          <img src={banner4.banner_photo} alt={banner4.banner_title} onClick={() => navigate(`${banner4.banner_redirect}`)} />
        </div>
      </div>
    </div>
  );
};

export default StaticBanner;
