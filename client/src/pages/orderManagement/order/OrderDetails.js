import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import Datetime from "react-datetime";
import CateringDetails from "../../../components/CateringDetails";
import BedingDetails from "../../../components/BedingDetails";
import TentDetails from "../../../components/TentDetails";
import LightDetails from "../../../components/LightDetails";
import { Tooltip } from "@mui/material";

import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PrintIcon from "@mui/icons-material/Print";
const OrderDetails = () => {
  const [loading, setLoading] = useState(false);
  //customer details usestate
  const [isIsEditCustomerDetails, setIsEditCustomerDetails] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const [customerDetails, setCustomerDetails] = useState([]);
  const [tentDetails, setTentDetails] = useState([]);
  const [lightDetails, setLightDetails] = useState([]);
  const [cateringDetails, setCateringDetails] = useState([]);
  const [bedingDetails, setBedingDetails] = useState([]);
  // get location from window
  const currentUrl = window.location.href;

  //   extract id from url
  function extractIdFromUrl(url) {
    const parts = url.split("/");
    return parts[parts.length - 1];
  }

  const url = currentUrl;
  const id = extractIdFromUrl(url);

  //use effect for fetch the customer details
  useEffect(() => {
    //fetch customer details
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/order/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { data, success } = response.data;
        if (success) {
          setCustomerDetails(data);
          setCustomerPhoneNumber(data.customerPhoneNumber);
          setCustomerName(data.customerName);
          setCustomerAddress(data.customerAddress);
          setCustomerEmail(data.customerEmail);
          setCateringDetails(data.cateringOrder);
          setBedingDetails(data.bistarOrder);
          setTentDetails(data.tentOrder);
          setLightDetails(data.lightOrder);

          const date = new Date(data.dateAndTime);

          // Get date components
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          // Get time components
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          // Construct formatted date and time string
          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

          setDateAndTime(formattedDateTime);
          setOtherDetails(data.customerOtherDetails);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    //get tent details
    const fetchTentDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/tent/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { orders, success } = response.data;
        if (success) {
          setTentDetails(orders);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //get light details
    const fetchLightDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/light/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { orders, success } = response.data;
        if (success) {
          setLightDetails(orders);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //beding
    const fetchBedingDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/beding/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { orders, success } = response.data;
        if (success) {
          setBedingDetails(orders);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //get catering details
    const fetchCateringDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/catering/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { orders, success } = response.data;
        if (success) {
          setCateringDetails(orders);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //invoke
    fetchCustomerDetails();
    // fetchTentDetails();
    // fetchLightDetails();
    // fetchBedingDetails();
    // fetchCateringDetails();
  }, [id, loading]);

  // handle on customer details edit
  const handleOnCustomerDetailsEdit = () => {
    setIsEditCustomerDetails(true);
  };

  // handle on customer details cancel
  const handleOnCustomerDetailsEditSave = async () => {
    setIsEditCustomerDetails(false);
    try {
      const response = await axios.put(
        `${config.apiUrl}/customer/update/${id}`,
        {
          customerAddress,
          customerPhoneNumber,
          customerName,
          dateAndTime,
          otherDetails,
        },
        { withCredentials: true }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setLoading(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //handle on print
  const handleOnPrint = () => {
    const printWindow = window.open("", "", "width=1000, height=900");
    printWindow.document.write(
      getPrintableDetails(
        customerDetails,
        tentDetails,
        cateringDetails,
        bedingDetails,
        lightDetails
      )
    );
    printWindow.document.close();
    printWindow.print();
  };
  // getprintable details
  const getPrintableDetails = (
    customerDetails,
    bedingDetails,
    lightDetails
  ) => {
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
    }${customerDetails.isBedingOrdered ? "Beding, " : ""}${
      customerDetails.isLightOrdered ? "Light" : ""
    }</td>
        </tr>
    </table>`;

    
    // Tent Details
    if (customerDetails.tentOrder.length > 0) {
      printableContent += `
          <h4>Tent Details</h4>
          <table>
              <tr>
                  <th>S.No.</th>
                  <th>Item</th>
                  <th>Quantity</th>
              </tr>`;

      customerDetails.tentOrder.forEach((item, index) => {
        printableContent += `
              <tr>
                  <td>${index + 1}</td>
                  <td>${item?.itemNameTent}</td>
                  <td>${item.itemCountForOrderTent}</td>
              </tr>`;
      });

      printableContent += `
          </table>
      `;
    }
    printableContent += `
</table>

<!-- Catering Details -->

`;
    // Check if cateringDetails is defined
    if (customerDetails?.isCateringOrdered) {
      // Breakfast Details
      if (customerDetails?.cateringOrder.breakfast) {
        printableContent += `
        <br/><br/><br/><br/><br/><br/>
        <h4>Catering Details</h4>
        <h5>Breakfast Details</h5>
        <table>
            <tr>
                <td><b>Total Pack Count:</b></td>
                <td>${customerDetails?.cateringOrder.breakfast.totalPackCount}</td>
            </tr>
            <tr>
                <td><b>Snacks:</b></td>
                <td>${
                  customerDetails?.cateringOrder.breakfast.snacks
                    ? customerDetails?.cateringOrder.breakfast.snacks.join(", ")
                    : ""
                }</td>
            </tr>
            <tr>
                <td><b>Soup and Salad:</b></td>
                <td>${
                  customerDetails?.cateringOrder.breakfast.soupAndSalad
                    ? customerDetails?.cateringOrder.breakfast.soupAndSalad.join(", ")
                    : ""
                }</td>
            </tr>
            <tr>
                <td><b>Main Course:</b></td>
                <td>${
                  customerDetails?.cateringOrder.breakfast.mainCourse
                    ? customerDetails?.cateringOrder.breakfast.mainCourse.join(", ")
                    : ""
                }</td>
            </tr>
        </table>`;
      }

      // Lunch Details
      if (customerDetails?.cateringOrder.lunch) {
        printableContent += `
        <h5>Lunch Details</h5>
        <table>
            <tr>
                <td><b>Total Pack Count:</b></td>
                <td>${customerDetails?.cateringOrder.lunch.totalPackCount}</td>
            </tr>
            <tr>
                <td><b>Snacks:</b></td>
                <td>${
                  customerDetails?.cateringOrder.lunch.snacks
                    ? customerDetails?.cateringOrder.lunch.snacks.join(", ")
                    : ""
                }</td>
            </tr>
            <tr>
                <td><b>Soup and Salad:</b></td>
                <td>${
                  customerDetails?.cateringOrder.lunch.soupAndSalad
                    ? customerDetails?.cateringOrder.lunch.soupAndSalad.join(", ")
                    : ""
                }</td>
            </tr>
            <tr>
                <td><b>Main Course:</b></td>
                <td>${
                  customerDetails?.cateringOrder.lunch.mainCourse
                    ? customerDetails?.cateringOrder.lunch.mainCourse.join(", ")
                    : ""
                }</td>
            </tr>
        </table>`;
      }

      // Dinner Details
      if (customerDetails?.cateringOrder.dinner) {
        printableContent += `
        <h5>Dinner Details</h5>
        <table>
            <tr>
                <td><b>Total Pack Count:</b></td>
                <td>${customerDetails?.cateringOrder.dinner.totalPackCount}</td>
            </tr>
            <tr>
                <td><b>Snacks:</b></td>
                <td>${
                  customerDetails?.cateringOrder.dinner.snacks
                    ? customerDetails?.cateringOrder.dinner.snacks.join(", ")
                    : ""
                }</td>
            </tr>
            <tr>
                <td><b>Soup and Salad:</b></td>
                <td>${
                  customerDetails?.cateringOrder.dinner.soupAndSalad
                    ? customerDetails?.cateringOrder.dinner.soupAndSalad.join(", ")
                    : ""
                }</td>
            </tr>
            <tr>
                <td><b>Main Course:</b></td>
                <td>${
                  customerDetails?.cateringOrder.dinner.mainCourse
                    ? customerDetails?.cateringOrder.dinner.mainCourse.join(", ")
                    : ""
                }</td>
            </tr>
        </table>`;
      }
    }

    // Light Details
    if (customerDetails.isLightOrdered) {
      printableContent += `
</table>

<!-- Light Details -->
<h4>Light Details</h4>
`;

    if (customerDetails.lightOrder.length > 0) {
      printableContent += `
          <h4>Tent Details</h4>
          <table>
              <tr>
                  <th>S.No.</th>
                  <th>Item</th>
                  <th>Quantity</th>
              </tr>`;

      customerDetails.lightOrder.forEach((item, index) => {
        printableContent += `
              <tr>
                  <td>${index + 1}</td>
                  <td>${item?.itemNameTent}</td>
                  <td>${item.itemCountForOrderTent}</td>
              </tr>`;
      });

      printableContent += `
          </table>
      `;
    }

      printableContent += `
</table>`;
    }

    // Beding  Details
    if (customerDetails.bistarOrder.length > 0) {
      printableContent += `
          <h4>Tent Details</h4>
          <table>
              <tr>
                  <th>S.No.</th>
                  <th>Item</th>
                  <th>Quantity</th>
              </tr>`;

      customerDetails.bistarOrder.forEach((item, index) => {
        printableContent += `
              <tr>
                  <td>${index + 1}</td>
                  <td>${item?.itemNameTent}</td>
                  <td>${item.itemCountForOrderTent}</td>
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
    <div className="overflow-y-scroll h-[650px] ">
      <Toaster />
      {/* customer details  */}
      <div className="flex justify-between py-1 rounded-md font-bold uppercase  bg-gray-200 px-4">
        <Tooltip title="Back to order details " placement="bottom" arrow>
          <Link to="../order">
            <button className="rounded-lg bg-gradient-to-tr from-gray-100 to-gray-50 px-4 py-2 text-center  text-xs  uppercase  shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Back
            </button>
          </Link>
        </Tooltip>
        <h1 className="uppercase font-semibold text-xl">Order Details</h1>
        <span className="cursor-pointer" onClick={handleOnPrint}>
          <PrintIcon className="mx-2" />
          Print
        </span>
      </div>
      {/* customer details  */}
      <div className="w-full mx-auto mt-3 mb-10">
        <div>
          <div className="font-semibold text-left text-md uppercase border-b-2 flex justify-between mx-2 py-1 bg-gray-100">
            <div className="px-3 my-1 flex flex-row justify-between">
              Customer Details
              <span></span>
            </div>
            {isIsEditCustomerDetails ? (
              <p
                onClick={handleOnCustomerDetailsEditSave}
                className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm"
              >
                save
              </p>
            ) : (
              <p
                onClick={handleOnCustomerDetailsEdit}
                className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm"
              >
                Edit
              </p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 m-4 px-8">
            {/* customer name  */}
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                required
                disabled={isIsEditCustomerDetails ? false : true}
                placeholder="Enter name"
                className="w-full px-4 py-2 pl-4 border rounded-md"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            {/* customer  address*/}
            <div>
              <label
                htmlFor="customerAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Address
              </label>
              <input
                type="text"
                id="customerAddress"
                name="customerAddress"
                disabled={isIsEditCustomerDetails ? false : true}
                placeholder="Enter your address..."
                className="w-full px-4 py-2 pl-4 border rounded-md"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>
            {/* customer  mobile number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                disabled={isIsEditCustomerDetails ? false : true}
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full px-4 py-2 border rounded-md mb-4"
                required
              />
              {/* Remark for phone number */}
              {customerPhoneNumber &&
                (customerPhoneNumber.startsWith("0") ||
                  customerPhoneNumber.startsWith("+91")) && (
                  <p className="text-red-500 text-sm">
                    Phone number should not start with 0 or +91
                  </p>
                )}
            </div>
            {/* alternate number  */}
            <div>
              <label
                htmlFor="alternateNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="alternateNumber"
                name="alternateNumber"
                disabled={isIsEditCustomerDetails ? false : true}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter email (optional)"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            {/* other details  */}
            <div>
              <label
                htmlFor="otherDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Other Details
              </label>
              <input
                type="text"
                id="otherDetails"
                disabled={isIsEditCustomerDetails ? false : true}
                name="otherDetails"
                placeholder="Enter other details..."
                className="w-full px-4 py-2 border rounded-md"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
            </div>
            {/* date and time  */}
            <div>
              <label
                htmlFor="dateTime"
                className="block text-sm font-medium text-gray-700"
              >
                Date and Time
              </label>

              {isIsEditCustomerDetails === false && (
                <input
                  type="text"
                  id="otherDetails"
                  disabled
                  name="otherDetails"
                  placeholder="Enter other details..."
                  className="w-full px-4 py-2 border rounded-md"
                  value={dateAndTime}
                  onChange={(e) => setDateAndTime(e.target.value)}
                />
              )}
              {isIsEditCustomerDetails && (
                <Datetime
                  inputProps={{
                    id: "dateTime",
                    className: "w-full px-4 py-2 border rounded-md",
                  }}
                  value={dateAndTime}
                  onChange={(movement) => setDateAndTime(movement)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* catering details */}
      <div className="font-semibold text-left text-md uppercase border-b-2 flex justify-between mx-2 py-1 bg-gray-100">
        <p className="px-4 my-1">Catering Order Details</p>
        <p className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div className="mb-10">
        {customerDetails?.isCateringOrdered ? (
          <CateringDetails cateringDetails={cateringDetails} />
        ) : (
          <p className="text-center px-4 py-4 bg-gray-50 w-auto mx-4 my-4">
            Catering Ordered not Available!
          </p>
        )}
      </div>

      {/* beding details  */}
      <div className="font-semibold text-left text-md uppercase border-b-2 flex justify-between mx-2 py-1 bg-gray-100 ">
        <p className="px-4 my-1">Beding Order Details</p>
        <p className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div className="mx-4 my-2 mb-10">
        {customerDetails?.isBistarOrdered ? (
          <BedingDetails bedingDetails={bedingDetails} />
        ) : (
          <p className="text-center px-4 py-4 bg-gray-50 w-auto mx-4 my-4">
            Beding Order not Available!
          </p>
        )}
      </div>
      {/* tent details  */}
      <div className="font-semibold text-left text-md uppercase border-b-2 flex justify-between mx-2 py-1 bg-gray-100">
        <p className="px-4 my-1">Tent Order Details</p>
        <p className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div className="mx-4 mb-10">
        {customerDetails?.isTentOrdered ? (
          <TentDetails tentDetails={tentDetails} />
        ) : (
          <p className="text-center px-4 py-4 bg-gray-50 w-auto  my-4">
            Tent Ordered not Available!
          </p>
        )}
      </div>

      {/* light details  */}
      <div className="font-semibold text-left text-md uppercase border-b-2 flex justify-between mx-2 py-1 bg-gray-100">
        <p className="px-4 my-1">Light Order Details</p>
        <p className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div>
        {customerDetails?.isLightOrdered ? (
          <LightDetails lightDetails={lightDetails} />
        ) : (
          <p className="text-center px-4 py-4 bg-gray-50 w-auto mx-4 my-4">
            Light Ordered not Available!
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
