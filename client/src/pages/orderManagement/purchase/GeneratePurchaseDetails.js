import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../../config/config";

const GeneratePurchaseDetails = () => {
  const [customerOrderDetails, setCutomerOrderDetails] = useState([]);
  const [requiredToPurchase, setRequiredToPurchase] = useState([]);

  //load the details
  useEffect(() => {
    const fetchGeneratedOrder = async (orderId) => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/recipe/specific/order/recipe/${orderId}`,
          { withCredentials: true }
        );

        const { success, customerActualOrder, requiredRecipeIngredient } =
          response.data;
        if (success) {
          setCutomerOrderDetails(customerActualOrder);
          setRequiredToPurchase(...requiredRecipeIngredient);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchGeneratedOrder(localStorage.getItem("purchaseId"));
  }, []);

  console.log(requiredToPurchase)
  return (
    <>
      {/* //customer order details  */}
      <div className="w-full">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default GeneratePurchaseDetails;
