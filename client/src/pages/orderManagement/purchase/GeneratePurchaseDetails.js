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
          response?.data;

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

  console.log(...requiredToPurchase);

  return (
    <>
      {/* //customer order details  */}
      <div className="flex justify-between px-4 py-2 bg-gray-100 shadow">
        <span>Back</span>
        <span>Purchase Details</span>
        <span className="cursor-pointer">Print</span>
      </div>
      <div className="w-full flex justify-around">
        <div className="flex flex-col">
          <span>Customer Name</span>
          <span>{customerOrderDetails?.customerName}</span>
        </div>
        <div className="flex flex-col">
          <span>Status</span>
          <span>{customerOrderDetails?.orderStatus}</span>
        </div>
        <div className="flex flex-col">
          <span>Event Date</span>
          <span>{customerOrderDetails?.dateAndTime}</span>
        </div>
        <div className="flex flex-col">
          <span>Category</span>
          <div>
            {customerOrderDetails.isLightOrdered && (
              <span className="bg-yellow-100 px-2 mx-1 rounded-lg cursor-pointer">
                Light
              </span>
            )}
            {customerOrderDetails.isTentOrdered && (
              <span className="bg-green-100 px-2 mx-1 rounded-lg cursor-pointer">
                Tent
              </span>
            )}
            {customerOrderDetails.isDecorationOrdered && (
              <span className="bg-slate-100 px-2 mx-1 rounded-lg cursor-pointer">
                Decoration
              </span>
            )}
            {customerOrderDetails.isBistarOrdered && (
              <span className="bg-blue-100 px-2 mx-1 rounded-lg cursor-pointer capitalize">
                beding
              </span>
            )}
            {customerOrderDetails.isCateringOrdered && (
              <span className="bg-red-100 px-2 mx-1 rounded-lg cursor-pointer">
                Catering
              </span>
            )}
          </div>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ingredient Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* {requiredToPurchase.map((ingredient, index) =>
            ingredient.map((material, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {material.itemName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {material.requiredQuantity}
                  </div>
                </td>
              </tr>
            ))
          )} */}
        </tbody>
      </table>
    </>
  );
};

export default GeneratePurchaseDetails;
