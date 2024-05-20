import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../../../config/config";
import { Link } from "react-router-dom";

const GeneratePurchaseDetails = () => {
  const [customerOrderDetails, setCutomerOrderDetails] = useState([]);
  const [requiredToPurchase, setRequiredToPurchase] = useState([]);
  const printableRef = useRef();

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
          console.log( "response data ",response.data);
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

  let requiredRecipeRawMaterial = [];
  if (Array.isArray(requiredToPurchase) && requiredToPurchase.length > 0) {
    requiredRecipeRawMaterial =
      requiredToPurchase[0]?.requiredRecipeRawMaterial;
    // You can now safely use requiredRecipeRawMaterial
  } else {
    // Handle the case where requiredToPurchase is not an array or is empty
    console.error("requiredToPurchase is either not an array or is empty.");
  }

  // if (requiredRecipeRawMaterial !== undefined) {
  //   console.log(requiredRecipeRawMaterial);
  // }

  // console.log(customerOrderDetails.cateringOrder)

  //handle for generate purchase

  useEffect(() => {
    console.log("details", customerOrderDetails);
  });

  //handle on print
  const handleOnGeneratePurchase = () => {
    const printWindow = window.open("", "", "width=1000, height=900");
    printWindow.document.write(
      getPrintableDetails(customerOrderDetails, requiredRecipeRawMaterial)
    );
    printWindow.document.close();
    printWindow.print();
  };
  // getprintable details
  const getPrintableDetails = (customerDetails) => {
    let printableContent = `
          <html>
          <head>
              <title>Order Details</title>
              <style>
              body {
                  font-family: Arial, sans-serif;
              }
              h1 {
                  text-align: center;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
              }
              th, td {
                  border: 1px solid #dddddd;
                  padding: 8px;
                  text-align: left;
              }
              .thank_you{
                text-align: center;
              }
              .last_hr{
                margin-top: 80px;
              }
              .contact{
                text-align: center;
              }
          </style>
          </head>
          <body>
              <h1>DG Caterers</h1>
              <p class="contact">Phone No.:- 6200932331 | Website:- www.dgcaterers.com | Address:- Ludhiana, Panjab</p>
              <hr/>
              `;

    // Customer Details
    const dateString = customerDetails.dateAndTime;
    const date = new Date(dateString);

    const formattedDateAndTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    printableContent += `
      <h4>Customer Details</h4>
      <table>
          <tr>
              <td><b>Customer Name:</b></td>
              <td>${customerDetails.customerName}</td>
          </tr>
          <tr>
              <td><b>Address:</b></td>
              <td>${customerDetails.customerAddress}</td>
          </tr>
          <tr>
              <td><b>Phone No.:</b></td>
              <td>${customerDetails.customerPhoneNumber}</td>
          </tr>
          <tr>
              <td><b>Date:</b></td>
              <td>${formattedDateAndTime}</td>
          </tr>
          <tr>
              <td><b>Email:</b></td>
              <td>${customerDetails.customerEmail}</td>
          </tr>
          <tr>
              <td><b>Order Services:</b></td>
              <td>${customerDetails.isCateringOrdered ? "Catering, " : ""}${
      customerDetails.isTentOrdered ? "Tent, " : ""
    }${customerDetails.isBistarOrdered ? "Beding, " : ""}${
      customerDetails.isLightOrdered ? "Light" : ""
    }</td>
          </tr>
      </table>`;

    // required Details
    if (requiredRecipeRawMaterial.length > 0) {
      printableContent += `
            <h4>All requried ingredient </h4>
            <table>
                <tr>
                    <th>S.No.</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                </tr>`;

      requiredRecipeRawMaterial.forEach((ingredient, index) => {
        printableContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${ingredient?.itemName}</td>
                    <td>${ingredient.requiredQuantity} ${
          ingredient.itemQuantityUnit
        }</td>
                </tr>`;
      });

      printableContent += `
            </table>
        `;
    }

    printableContent += `
              <hr class="last_hr"/>
              <p class="thank_you"><b>Thank you for choosing us!</b></p>
              <hr/>
          </body>
          </html>`;

    return printableContent;
  };

  return (
    <>
      <div className="flex justify-between px-4 py-2 bg-gray-100 shadow">
        <Link to={"../purchase"}>
          <div
            className={`px-3 py-1.5  ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}
          >
            Back
          </div>
        </Link>
        <span
            className={`px-3 py-1.5  ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}
        
        >Purchase Details</span>
        <span   
            className={`px-3 py-1.5  ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}

        
        onClick={handleOnGeneratePurchase}>
          Generate Purchase
        </span>
      </div>
      <div className="m-10 border" id="printableArea">
        {/* Customer order details */}
        <div className="">
          <h3 className="bg-gray-300 w-60 px-5 py-1 uppercase">
            Customer Details
          </h3>
        </div>
        <div className="w-full flex justify-around px-1 py-6">
          <div className="flex flex-col text-center">
            <span className="text-xs uppercase">Customer Name</span>
            <span className="text-lg capitalize">
              {customerOrderDetails?.customerName}
            </span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-xs uppercase">Status</span>
            <span className="text-lg capitalize">
              {customerOrderDetails?.orderStatus}
            </span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-xs uppercase">Event Date</span>
            <span className="text-lg capitalize">
              {new Date(customerOrderDetails?.dateAndTime).toLocaleString()}
            </span>
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
                  Bedding
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

        {/* Recipe ordered */}
        <div className="mt-4">
          <h3 className="bg-gray-300 w-60 px-5 py-1 uppercase">
            Recipe Ordered
          </h3>
        </div>
        <div className="mb-5">{/* Add your recipe ordered details here */}</div>

        {/* Raw material required */}
        <div className="mt-10">
          <h3 className="bg-gray-300 w-60 px-5 py-1 uppercase">
            Required Ingredients
          </h3>
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
          <tbody className="bg-white divide-y divide-gray-200">
            {requiredRecipeRawMaterial.map((ingredient, index) => (
              <tr key={index}>
                <td className="text-center px-6 py-4 whitespace-nowrap">
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
