import React, { useEffect, useState } from "react";
import "./style.scss";
import Cookies from "js-cookie";
import Navigator from "./Navigator";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
} from "@mui/material";
import { getOrdersUser } from "../../api/cartApi";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const isSmallDevice = useMediaQuery("(max-width: 768px)");
  const token = Cookies.get("accessToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrdersUser();
      setOrders(response);
    } catch (error) {
      console.error("Orders Error fetching data:", error);
    }
  };

  const getButtonStyle = (state) => {
    let backgroundColor;
    switch (state) {
      case "Pending":
        backgroundColor = "var(--primary-color)";
        break;
      case "Declined":
        backgroundColor = "red";
        break;
      case "Approved":
        backgroundColor = "#00b500";
        break;
      default:
        backgroundColor = "transparent";
    }
    return { backgroundColor, color: "#000", padding: "12px" };
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <Navigator activeTab="order" />
        <div className="content">
          <div className="order-inner">
            <div className="title">
              <h1>{`${t("order")}`}</h1>
            </div>
            {orders.map((el) => (
              <div className="order-container" key={el.product}>
                <div className="line">
                  <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                    <AccordionSummary
                      // expandIcon={
                      //   <button className="expand-icon">
                      //     <img
                      //       src="/assets/images/icons/expand.png"
                      //       alt=""
                      //       style={{ transform: "rotate(180deg)" }}
                      //     />
                      //   </button>
                      // }
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{
                      }}
                    >
                       <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: isSmallDevice ? "10px" : "20px",
                          padding: "10px 0",
                          flexDirection: isSmallDevice ? "column" : "row"
                        }}
                      >
                        <button
                          className="id"
                          style={{
                            padding: "10px 20px",
                            width: isSmallDevice ? '100%' : '',
                            borderRadius: "30px",
                            color: "#000",
                            border: "none",
                          }}
                        >
                          <p>#{el.cart_id}</p>
                        </button>
                        <a
                          href={`${el.order_bill}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            
                            width: isSmallDevice ? '100%' : '',
                          }}
                        >
                          <button
                            className="pdf"
                            style={{
                              padding: "10px 20px",
                              width: isSmallDevice ? '100%' : '',
                              borderRadius: "30px",
                              border: "1px solid #000",
                              backgroundColor: "transparent",
                              color: "#000",
                              cursor: 'pointer'
                            }}
                          >
                            <p>PDF</p>
                          </button>
                        </a>

                        <button
                          className="transparentD-btn"
                          style={{
                            ...getButtonStyle(el.state),
                            padding: "10px 20px",
                            width: isSmallDevice ? '100%' : '',
                            borderRadius: "30px",
                            border: "none",
                          }}
                        >
                          {el.state === "success" ? "Kompletuar" : el.state}
                        </button>
                        <button
                          className="price"
                          style={{
                            padding: "10px 20px",
                            width: isSmallDevice ? '100%' : '',
                            borderRadius: "30px",
                            border: "1px solid #000",
                            backgroundColor: "transparent",
                            color: "#000",
                          }}
                        >
                          <p>€{el.total_amount}</p>
                        </button>

                        <button
                          className="details"
                          style={{
                            width: isSmallDevice ? '100%' : '',
                            padding: "10px 20px",
                            borderRadius: "30px",
                            backgroundColor: "#000",
                            color: "#fff",
                            border: "none",
                              cursor: 'pointer'
                          }}
                        >
                          Detajet
                        </button>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="content">
                        <p>
                          Adresa: {el.address}, {el.city}, {el.country}
                        </p>
                        <p>Number: {el.phone_number}</p>
                        <p>
                          Pershkrimi:{" "}
                          {el.description === null
                            ? el.description
                            : "Ska pershkrim"}
                        </p>
                        <p>Cmimi i pergjithshem: {el.total_amount}€</p>
                        <p>
                          Metoda e Blerjes:{" "}
                          {el.total_price > 300.0 ? "Bank Transfer" : "Cash"}
                        </p>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
