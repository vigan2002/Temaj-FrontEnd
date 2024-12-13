import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import BannerSkeletonLoader from "../loader/BannerSkeletonLoader";

const SelectiveBanner = ({ dataBanner }) => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (dataBanner && dataBanner.data && dataBanner.data.LANDING) {
      setBanners(dataBanner.data.LANDING);
    }
  }, [dataBanner]);

  if (dataBanner.isLoading || !banners.length) {
    return <BannerSkeletonLoader />;
  }

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="selective">
          <div
            className="box"
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/temaj-qeramik")}
          >
            <img
              src={banners[0]}
              alt="Banner 1"
              className="bck"
            />
            {/* <div className="content">
              <h1>Temaj Qeramikë</h1>
              <img 
                src="/assets/images/brand/finalLogoMobile.png"
                alt="Logo"
                className="logo"
              />
            </div> */}
          </div>
          <div
            className="box"
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/temaj-windoor")}
          >
            <img src={banners[1]} alt="Windoor Banner" className="bck" />
            {/* <div className="content">
              <h1>Temaj WinDoor</h1>
              <img
                src="/assets/images/windoor/logo.png"
                alt="Windoor Logo"
                className="logo"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectiveBanner;
