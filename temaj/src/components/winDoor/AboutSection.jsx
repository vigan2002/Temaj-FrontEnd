import React from "react";
import "./style.scss";

const AboutSection = () => {
  return (
    <div id="about" className="about-wrapper">
      <div className="about-container">
        <div className="left">
          <h1>Kush jemi ne?</h1>
          <p>
            Temaj WinDoor, kur kualiteti ndriçon shtepinë tuaj Ne jemi
            përkushtuar në ofrimin e produkteve të cilësisë dhe sigurisë
            maksimale, duke e bërë ambientin tuaj të qëndrimit një vend të
            rehatshëm, me ndriçim dhe të sigurtë
          </p>
          <p>
            Me një teknologji të avancuar dhe një përkushtim të paepur për
            cilësinë, ne ofrojmë dritare nga PVC që përmbushin dhe tejkalojnë
            standardet më të larta industriale. Përdorimi i pajisjeve automatike
            dhe teknologjisë CNC siguron që secila dritare është e prodhuar me
            kujdes dhe me precizitet milimetrik.
          </p>
          <p>
            Në Temaj WinDoor, jemi të përkushtuar për të siguruar që shtëpitë
            tuaja të përfitojnë maksimumin nga drita natyrale. Dritaret dhe
            dyert tona nga PVC ofrojnë një hyrje të mjaftueshme të dritës së
            diellit, duke zvogëluar nevojën për ndriçim artificial dhe duke ulur
            shpenzimet e energjisë elektrike.
          </p>
          <p>
            Siguria është prioriteti ynë. Dritaret tona nga PVC janë projektuar
            për të siguruar një ambient të qetë dhe të sigurt për ju dhe
            familjen tuaj. Përdorimi i materialeve të kualitetit më të lartë dhe
            teknologjisë së fundit garanton një performancë të qëndrueshme
            afatgjate.
          </p>
          {/* <button>Shiko më shumë <img src="/assets/images/icons/arrowWh.png" alt="" /></button> */}
        </div>
        <div className="right">
          {/* <img src="/assets/content/windoor/1.jpg" alt="" /> */}
          <video
            src="/assets/content/videos/7.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
