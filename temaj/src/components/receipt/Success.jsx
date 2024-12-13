import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/consts";
import { IoMdClose } from "react-icons/io";

const Success = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { order } = state || {};

  if (!order) {
    return <div>No order data available.</div>;
  }

  const { order_id, first_name, created_at, total_price, order_bill } = order;

  const paymentMethod = total_price > 300.0 ? "Bank Transfer" : "Cash";

  return (
    <div className="receipt-wrapper">
      <div className="success-container">
        <div className="icon">
          <img src="/assets/images/icons/success.png" alt="" />
        </div>
        <button className="close" onClick={() => navigate("/profile/orders")}>
          <IoMdClose />
        </button>
        <h1>Payment Success!</h1>
        <p>Your payment has been successfully done</p>
        <div className="line"></div>
        <p>Total Payment</p>
        <h1>{(total_price).toFixed(2)}€</h1>
        <div className="boxes">
          <div className="box">
            <p>Sku</p>
            <h1>{order_id}</h1>
          </div>
          <div className="box">
            <p>Order Time</p>
            <h1>{new Date(created_at).toLocaleString()}</h1>
          </div>
          <div className="box">
            <p>Payment Method</p>
            <h1>{paymentMethod}</h1>
          </div>
          <div className="box">
            <p>Client Name</p>
            <h1>{first_name}</h1>
          </div>
          <div className="box">
            <p>View PDF</p>
            <a
              href={`${BASE_URL}${order_bill}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bill
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
