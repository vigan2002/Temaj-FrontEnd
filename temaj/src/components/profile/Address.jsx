import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Address = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("address");
    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="navigator">
                    <div>
                        <h1>Pershendetje, Filan Fisteku</h1>
                    </div>
                    <button
                        className={activeTab === "info" ? "active" : ""}
                        onClick={() => navigate("/profile")}
                    >
                        <img src={"/assets/images/icons/info.png"} alt="img"/> Të dhënat e
                        profilit
                    </button>
                    <button
                        className={activeTab === "order" ? "active" : ""}
                        onClick={() => navigate("/profile/orders")}
                    >
                        <img src={"/assets/images/icons/info.png"} alt="img"/> Porositë
                    </button>
                    <button
                        className={activeTab === "wish-list" ? "active" : ""}
                        onClick={() => navigate("/profile/wish-list")}
                    >
                        <img src={"/assets/images/icons/info.png"} alt="img"/> Lista e
                        dëshirave
                    </button>
                    <button className={activeTab === "address" ? "active" : ""}>
                        <img src={"/assets/images/icons/info.png"} alt="img"/> Adresa
                    </button>
                    <button>
                        <img src={"/assets/images/icons/info.png"} alt="img"/> Shkyqu
                    </button>
                </div>
                <div className="content">

                    <div
                        className="address-inner"
                        style={{display: activeTab === "address" ? "flex" : "none"}}
                    >
                        <div className="title">
                            <h1>Adresa</h1>
                            <button className="transparentD-btn">Shto adres të re</button>
                        </div>
                        <div className="address-container">
                            <div className="line">
                                <button className="primary-btn">
                                    <img src={"/assets/images/icons/info.png"} alt="img"/>
                                </button>
                                <div className="address">
                                    <p>Adressa</p>
                                </div>
                                <div className="functions">
                                    <button className="transparentWh-btn">
                                        <img src={"/assets/images/icons/info.png"} alt="img"/>
                                    </button>
                                    <button className="transparentWh-btn">
                                        <img src={"/assets/images/icons/info.png"} alt="img"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
