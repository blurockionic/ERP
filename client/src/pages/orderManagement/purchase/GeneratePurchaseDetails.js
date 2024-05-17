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

  // console.log(requiredToPurchase[0].requiredRecipeRawMaterial)

  let requiredRecipeRawMaterial= [];
if (Array.isArray(requiredToPurchase) && requiredToPurchase.length > 0) {
  requiredRecipeRawMaterial = requiredToPurchase[0]?.requiredRecipeRawMaterial;
  // You can now safely use requiredRecipeRawMaterial

} else {
  // Handle the case where requiredToPurchase is not an array or is empty
  console.error('requiredToPurchase is either not an array or is empty.');
}

// if (requiredRecipeRawMaterial !== undefined) {
//   console.log(requiredRecipeRawMaterial);
// }

  return (
    <>
      <div className="flex justify-between px-4 py-2 bg-gray-100 shadow">
        <span>Back</span>
        <span>Purchase Details</span>
        <span className="cursor-pointer">Print</span>
      </div>
      <div className="m-10 border">
        {/* //customer order details  */}

        <div className="">
          <h3 className="bg-gray-300 w-60 px-5 py-1">Customer Details</h3>
        </div>
        <div className="w-full flex justify-around px-1 py-6">
          <div className="flex flex-col text-center">
            <span className="text-xs uppercase">Customer Name</span>
            <span className="text-lg capitalize">{customerOrderDetails?.customerName}</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-xs uppercase">Status</span>
            <span className="text-lg capitalize">{customerOrderDetails?.orderStatus}</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-xs uppercase">Event Date</span>
            <span className="text-lg capitalize">{new Date(customerOrderDetails?.dateAndTime).toLocaleString()}</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-xs uppercase">Category</span>
            <div className="mx-2">
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

        {/* heading  */}
        <div className="mt-10">
          <h3 className="bg-gray-300 w-60 px-5 py-1">Required Ingredients</h3>
        </div>

        <table className="w-full divide-gray-200 p-10">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ingredient Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {requiredRecipeRawMaterial.map((ingredient, index) => (
              <tr key={index}>
                <td className=" text-center px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{index + 1}</div>
                </td>
                <td className="text-center px-6 py-4 whitespace-nowrap capitalize">
                  <div className="text-sm text-gray-900">
                    {ingredient.itemName}
                  </div>
                </td>
                <td className="text-center px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {ingredient.requiredQuantity} {ingredient.itemQuantityUnit}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GeneratePurchaseDetails;
