// import React, { useState, useEffect } from "react";
// import { addDiscountToArchitect, addDiscountToClient } from "../../api/productApi";
// import "./discount.scss";
// import ArchitectLists from "./ArchitectLists";

// const DiscountForm = ({ productId }) => {
//   const [discountPercent, setDiscountPercent] = useState("");
//   const [discountPercentArch, setDiscountPercentArch] = useState("");

//   useEffect(() => {
//     // Reset discountPercent if productId changes
//     setDiscountPercentArch("");
//     setDiscountPercent("");
//   }, [productId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const body = {
//       user_id: null,
//       product_ids: [parseInt(productId, 10)],
//       discount_percent: parseFloat(discountPercent),
//       discount_target: "client",
//     };

//     try {
//       await addDiscountToClient(body);
//       alert("Discount applied successfully");
//     } catch (error) {
//       alert("Failed to apply discount");
//     }
//   };

//   const handleApplyClick = () => {
//     addDiscountToClient(userId, productIds, discountPercent, discountTarget);
//   };

//   const handleSubmitArch = async (e) => {
//     e.preventDefault();

//     const body = {
//       user_id: null,
//       product_ids: [parseInt(productId, 10)],
//       discount_percent: parseFloat(discountPercentArch),
//       discount_target: "client",
//     };

//     try {
//       await addDiscountToArchitect(body);
//       alert("Discount applied successfully");
//     } catch (error) {
//       alert("Failed to apply discount");
//     }
//   };
//   const handleApplyClickArch = () => {
//     // Trigger the discount function with necessary parameters
//     addDiscountToArchitect(userId, productIds, discountPercentArch, discountTarget);
//   };


//   return (
//     <div className="sale-section">
//       <p>This is only for Admin</p>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="discountPercent">Sale for Clients:</label>
//           <input
//             id="discountPercent"
//             type="number"
//             placeholder="%"
//             value={discountPercent}
//             size={2}
//             onChange={(e) => setDiscountPercent(e.target.value)}
//           />
//           <button onClick={handleApplyClick}>Apply Discount</button>
//         </form>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="discountPercentArch">Sale for Architect:</label>
//           <ArchitectLists name="userinfo.job" label="Role" />
//           <input
//             id="discountPercentArch"
//             type="number"
//             placeholder="%"
//             value={discountPercentArch}
//             size={2}
//             onChange={(e) => setDiscountPercent(e.target.value)}
//           />
//           <button onClick={handleApplyClick}>Apply Discount</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DiscountForm;


import React, { useState, useEffect } from "react";
import { addDiscountToArchitect, addDiscountToClient } from "../../api/productApi";
import "./discount.scss";
import ArchitectLists from "./ArchitectLists";

const DiscountForm = ({ productId }) => {
  const [discountPercent, setDiscountPercent] = useState("");
  const [discountPercentArch, setDiscountPercentArch] = useState("");
  const [selectedArchitect, setSelectedArchitect] = useState(null);

  useEffect(() => {
    setDiscountPercent("");
    setDiscountPercentArch("");
    setSelectedArchitect(null);
  }, [productId]);

  const handleSubmitClient = async (e) => {
    e.preventDefault();

    const body = {
      user_id: null,
      product_ids: [parseInt(productId, 10)],
      discount_percent: parseFloat(discountPercent),
      discount_target: "client",
    };

    try {
      await addDiscountToClient(body);
      alert("Discount applied successfully");
    } catch (error) {
      alert("Failed to apply discount");
    }
  };

  const handleSubmitArchitect = async (e) => {
    e.preventDefault();

    if (!selectedArchitect) {
      alert("Please select an architect.");
      return;
    }

    const body = {
      user_id: selectedArchitect.id,
      product_ids: [parseInt(productId, 10)],
      discount_percent: parseFloat(discountPercentArch),
      discount_target: "architect",
    };

    try {
      await addDiscountToArchitect(body);
      alert("Discount applied successfully to architect");
    } catch (error) {
      alert("Failed to apply discount to architect");
    }
  };

  return (
    <div className="sale-section">
      <p>This is only for Admin</p>
      <div>
        <form onSubmit={handleSubmitClient}>
          <label htmlFor="discountPercent">Sale for Clients:</label>
          <input
            id="discountPercent"
            type="number"
            placeholder="%"
            value={discountPercent}
            size={2}
            onChange={(e) => setDiscountPercent(e.target.value)}
          />
          <button type="submit">Apply Discount</button>
        </form>
        <form onSubmit={handleSubmitArchitect}>
          <label htmlFor="discountPercentArch">Sale for Architect:</label>
          <ArchitectLists 
            name="selectedArchitect" 
            label="Select Architect"
            onChange={(architect) => setSelectedArchitect(architect)}
          />
          <input
            id="discountPercentArch"
            type="number"
            placeholder="%"
            value={discountPercentArch}
            size={2}
            onChange={(e) => setDiscountPercentArch(e.target.value)}
          />
          <button type="submit">Apply Discount</button>
        </form>
      </div>
    </div>
  );
};

export default DiscountForm;
