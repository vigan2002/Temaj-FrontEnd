import React, { useEffect, useState } from "react";
import "./style.scss";
import Navigator from "./Navigator";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
} from "@mui/material";
import { getPendingOrdersUser } from "../../api/cartApi";
import { addPendingOrdersUser } from "../../api/cartApi";
import NotificationModal from "../notification/NotificationModal";

const OrderPending = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const isSmallDevice = useMediaQuery("(max-width: 768px)");
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getPendingOrdersUser();
      setPendingOrders(response);
    } catch (error) {
      console.error("Pending Orders Error fetching data:", error);
    }
  };

  const handleApprove = async (cart_id) => {
    try {
      await addPendingOrdersUser(cart_id, "Approved");
      fetchOrders();
      setNotification({
        isVisible: true,
        message: "Order approved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error approving order:", error);
      setNotification({
        isVisible: true,
        message: "Failed to approve order.",
        type: "error",
      });
    }
  };

  const handleDecline = async (cart_id) => {
    try {
      await addPendingOrdersUser(cart_id, "Declined");
      fetchOrders();
      setNotification({
        isVisible: true,
        message: "Order declined successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error declining order:", error);
      setNotification({
        isVisible: true,
        message: "Failed to decline order.",
        type: "error",
      });
    }
  };

  return (
    <div className="profile-wrapper">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div className="profile-container">
        <Navigator activeTab="pending-orders" />
        <div className="content">
          <div className="order-inner">
            <div className="title">
              <h1>Porosit e pa aprovuara</h1>
            </div>
            {pendingOrders.map((el) => (
              <div className="order-container" key={el.cart_id}>
                <div className="line">
                  <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                    <AccordionSummary
                      aria-controls="panel1-content"
                      id="panel1-header"
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
                          flexDirection: isSmallDevice ? "column" : "row",
                        }}
                      >
                        <button
                          className="id"
                          style={{
                            padding: "10px 20px",
                            width: isSmallDevice ? "100%" : "",
                            borderRadius: "30px",
                            color: "#000",
                            border: "none",
                          }}
                        >
                          <p>#{el.cart_id}</p>
                        </button>
                        <button
                          className="details"
                          style={{
                            width: isSmallDevice ? "100%" : "",
                            padding: "10px 20px",
                            borderRadius: "30px",
                            backgroundColor: "#000",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Detajet
                        </button>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        className="content"
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
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
                            {el.total_amount > 300.0 ? "Bank Transfer" : "Cash"}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                          <button
                            onClick={() => handleApprove(el.cart_id)}
                            style={{
                              backgroundColor: "#00b500",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecline(el.cart_id)}
                            style={{
                              backgroundColor: "red",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Decline
                          </button>
                        </div>
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

export default OrderPending;