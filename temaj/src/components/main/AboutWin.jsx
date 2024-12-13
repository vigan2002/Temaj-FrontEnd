import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AboutWin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="inner-container">
          <div className="left">
            <img src="/assets/content/windoor/2.jpg" alt="" />
          </div>
          <div className="right">
            <h1 style={{
              marginBottom: '20px'
            }}>Rreth Temaj WinDoor</h1>
            <p>
            Temaj WinDoor është një fabrikë moderne e specializuar në prodhimin e dyerve dhe dritareve plastike (PVC) të cilësisë më të lartë. Me një përkushtim të madh ndaj cilësisë dhe teknologjisë së avancuar, Temaj WinDoor ofron zgjidhje inovative dhe të qëndrueshme për shtëpi, biznese dhe projekte ndërtimore të ndryshme. Çdo produkt që krijohet në fabrikën tonë kalon nëpër një proces të rreptë të kontrollit të cilësisë, duke siguruar që klientët tanë të përfitojnë produkte që garantojnë izolim të shkëlqyer termik dhe akustik, qëndrueshmëri afatgjatë dhe dizajn estetik.
Me sloganin tonë, "Kur kualiteti ndriçon shtëpinë," ne theksojmë rëndësinë e cilësisë së lartë që sjell dritë dhe ngrohtësi në çdo ambient. Ekspertiza jonë në prodhimin e dyerve dhe dritareve PVC na mundëson të përmbushim nevojat individuale të klientëve, duke ofruar një gamë të gjerë dizajnesh, ngjyrash dhe specifikash teknike. Temaj WinDoor është zgjedhja e parë për ata që kërkojnë kombinimin e funksionalitetit, efikasitetit energjetik dhe stilit modern.

            </p>
            <button className="transparent-btn" onClick={() => navigate('temaj-windoor')}>{`${t("seeMore")}`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWin;
