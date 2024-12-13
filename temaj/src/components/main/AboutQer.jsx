import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AboutQer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div
          className="inner-container"
          style={{
            borderTop: "1px solid var(--darker-color)",
            borderBottom: "1px solid var(--darker-color)",
            padding: "60px 0",
          }}
        >
          <div className="left">
            <img src="/assets/content/qeramik/rrethTemaj1.jpg" alt="" />
          </div>
          <div className="right">
            <h1 style={{
              marginBottom: '20px'
            }}>Rreth Temaj Qeramikë</h1>
            <p>
            Temaj Qeramikë është një kompani lidere në tregun e Kosovës, e specializuar në furnizimin me pllaka qeramike dhe produkte sanitare të cilësisë më të lartë. Me mbi 20 vjet përvojë, ne ofrojmë një gamë të gjerë produktesh moderne dhe funksionale që plotësojnë kërkesat e stilit të jetesës së klientëve tanë. Përmes partneriteteve me brendet më të njohura ndërkombëtare dhe një rrjeti të gjerë dyqanesh dhe showrooms, Temaj Qeramikë synon të sjellë inovacion dhe elegancë në çdo hapësirë.
            </p>
            <p>Produkte tona përfshijnë pllaka për banjo, kuzhina dhe ambiente të jashtme, si dhe pajisje sanitare si lavamanë, kabina dushi dhe vaska, të cilat ofrojnë zgjidhje të përshtatura për çdo lloj hapësire. Ne jemi të përkushtuar në ofrimin e shërbimeve profesionale, duke ndihmuar klientët në përzgjedhjen e produkteve të duhura për projektet e tyre dhe në garantimin e një procesi të lehtë dhe të kënaqshëm nga fillimi deri në fund.</p>
            <button className="transparent-btn" onClick={() => navigate('temaj-qeramik')} >{`${t("buy")}`} Online</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutQer;
