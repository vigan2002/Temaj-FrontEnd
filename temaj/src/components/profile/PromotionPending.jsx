// import React, { useEffect, useState } from "react";
// import "./style.scss";
// import Cookies from "js-cookie";
// import Navigator from "./Navigator";
// import {
//   getPendingPromotionUser,
//   addPendingPromotionUser,
// } from "../../api/cartApi";

// const PromotionPending = () => {
//   const [pendingPromotion, setPendingPromotion] = useState([]);
//   const token = Cookies.get("accessToken");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await getPendingPromotionUser();
//       setPendingPromotion(response);
//     } catch (error) {
//       console.error("Pending Promotions Error fetching data:", error);
//     }
//   };

//   const approveClient = async (id) => {
//     try {
//       const data = {
//         action: "Architect",
//       };
//       await addPendingPromotionUser(id, data);
//       fetchOrders();
//     } catch (error) {
//       console.error("Error approving client:", error);
//     }
//   };

//   const declineClient = async (id) => {
//     try {
//       const data = {
//         action: "Decline",
//       };
//       await addPendingPromotionUser(id, data);
//       fetchOrders();
//     } catch (error) {
//       console.error("Error declining client:", error);
//     }
//   };

//   return (
//     <div className="profile-wrapper">
//       <div className="profile-container">
//         <Navigator activeTab="pending-promotion" />
//         <div className="content">
//           <div className="order-inner">
//             <div className="title">
//               <h1>Users e pa aprovuar</h1>
//             </div>
//             {pendingPromotion.map((el) => (
//               <div className="order-container" key={el.id}>
//                 <div className="line">
//                   <div>
//                     <p>
//                       {el.first_name} {el.last_name}
//                     </p>
//                     <p>email: {el.email}</p>
//                     <p>date: {el.date_joined}</p>
//                   </div>
//                   <div style={{ display: "flex", gap: "20px" }}>
//                     <button
//                       style={{
//                         backgroundColor: "#00b500",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => approveClient(el.id)}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       style={{
//                         backgroundColor: "red",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => declineClient(el.id)}
//                     >
//                       Decline
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PromotionPending;

import React, { useEffect, useState } from "react";
import "./style.scss";
import Cookies from "js-cookie";
import Navigator from "./Navigator";
import NotificationModal from "../notification/NotificationModal";
import {
  getPendingPromotionUser,
  addPendingPromotionUser,
} from "../../api/cartApi";

const PromotionPending = () => {
  const [pendingPromotion, setPendingPromotion] = useState([]);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "", // For example, "success" or "error"
  });
  const token = Cookies.get("accessToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getPendingPromotionUser();
      setPendingPromotion(response);
    } catch (error) {
      console.error("Pending Promotions Error fetching data:", error);
      setNotification({
        isVisible: true,
        message: "Error fetching promotions.",
        type: "error",
      });
    }
  };

  const approveClient = async (id) => {
    try {
      const data = {
        action: "Architect",
      };
      await addPendingPromotionUser(id, data);
      fetchOrders();
      setNotification({
        isVisible: true,
        message: "Client approved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error approving client:", error);
      setNotification({
        isVisible: true,
        message: "Failed to approve client.",
        type: "error",
      });
    }
  };

  const declineClient = async (id) => {
    try {
      const data = {
        action: "Decline",
      };
      await addPendingPromotionUser(id, data);
      fetchOrders();
      setNotification({
        isVisible: true,
        message: "Client declined successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error declining client:", error);
      setNotification({
        isVisible: true,
        message: "Failed to decline client.",
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
        <Navigator activeTab="pending-promotion" />
        <div className="content">
          <div className="order-inner">
            <div className="title">
              <h1>Users e pa aprovuar</h1>
            </div>
            {pendingPromotion.map((el) => (
              <div className="order-container" key={el.id}>
                <div className="line">
                  <div>
                    <p>
                      {el.first_name} {el.last_name}
                    </p>
                    <p>email: {el.email}</p>
                    <p>date: {el.date_joined}</p>
                  </div>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <button
                      style={{
                        backgroundColor: "#00b500",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => approveClient(el.id)}
                    >
                      Approve
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => declineClient(el.id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionPending;
