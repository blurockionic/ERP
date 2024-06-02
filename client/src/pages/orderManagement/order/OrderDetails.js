import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import Datetime from "react-datetime";
import CateringDetails from "../../../components/CateringDetails";
import BedingDetails from "../../../components/BedingDetails";
import TentDetails from "../../../components/TentDetails";
import LightDetails from "../../../components/LightDetails";
import { Tooltip } from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PrintIcon from "@mui/icons-material/Print";
import Loader from "../../../components/Loader";

const OrderDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  //customer details usestate
  const [isEditCustomerDetails, setIsEditCustomerDetails] = useState(false);
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

  //fetch customer details
  const fetchCustomerDetails = async () => {
    try {
      setIsLoading(true);
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
        setIsLoading(false); // set loading false

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
      setIsLoading(false); // set loading false
    }
  };
  //use effect for fetch the customer details
  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  // handle on customer details edit
  const handleOnCustomerDetailsEdit = () => {
    setIsEditCustomerDetails(true);
  };

  // handle on customer details cancel
  const handleOnCustomerDetailsEditSave = async () => {
    setIsEditCustomerDetails(false);
    try {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  //handle on print
  const handleOnPrint = () => {
    const printWindow = window.open("", "", "width=1000, height=900");
    printWindow.document.write(
      getPrintableDetails(customerDetails, tentDetails, cateringDetails)
    );
    printWindow.document.close();
    printWindow.print();
  };
  // getprintable details
  const getPrintableDetails = (
    customerDetails,
    tentDetails,
    cateringDetails
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
            </style>
        </head>
        <body>
            <h1>DG Caters Service</h1>
            <hr/>
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
                    <td>${customerDetails.dateAndTime}</td>
                </tr>
                <tr>
                    <td><b>Email:</b></td>
                    <td>${customerDetails.customerEmail}</td>
                </tr>
                <tr>
                    <td><b>Order Services:</b></td>
                    <td>${
                      customerDetails.isCateringOrdered ? "Catering, " : ""
                    }${customerDetails.isTentOrdered ? "Tent, " : ""}${
      customerDetails.isBistarOrdered ? "Bistar, " : ""
    }${customerDetails.isLightOrdered ? "Light" : ""}</td>
                </tr>
            </table>

            <!-- Tent Details -->
            <h4>Tent Details</h4>
            <table>
                <tr>
                    <th>S.No.</th>
                    <th>Item</th>
                    <th>Quantity</th>
                </tr>`;

    // Add tent ordered items to the printable content
    tentDetails?.orderedItems?.forEach((item, index) => {
      printableContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item}</td>
                    <td>${tentDetails.orderedItemsCount[index]}</td>
                </tr>`;
    });
    printableContent += `
    </table>
    <h4> Catering Details</h4>
    ${
      cateringDetails && cateringDetails.length > 0
        ? `
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  People Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Selected Beverages
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              ${cateringDetails
                .map(
                  (order, index) => `
                    <tr key=${index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${
                          order.mealType ?? "N/A"
                        }</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${
                          order.mealTime ?? "N/A"
                        }</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${
                          order.peopleCount ?? "N/A"
                        }</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ul className="list-disc list-inside">
                          ${order.recipe
                            .map(
                              (item, recipeIndex) =>
                                `<li key=${recipeIndex} className="text-sm">${
                                  item ?? "N/A"
                                }</li>`
                            )
                            .join("")}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ul className="list-disc list-inside">
                          ${order.selectedBeverages
                            .map(
                              (item, beverageIndex) =>
                                `<li key=${beverageIndex} className="text-sm">${
                                  item ?? "N/A"
                                }</li>`
                            )
                            .join("")}
                        </ul>
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        `
        : `<div className="text-sm text-gray-900">There are no catering details.</div>`
    }
`;

    printableContent += `
            </table>

            <!-- Beding Details -->
            <h4>Beding Details</h4>
            <table>
                <tr>
                    <th>S.No.</th>
                    <th>Item</th>
                    <th>Quantity</th>
                </tr>`;

    // Add beding ordered items to the printable content
    bedingDetails?.orderedItems?.forEach((item, index) => {
      printableContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item}</td>
                    <td>${bedingDetails.orderedItemsCount[index]}</td>
                </tr>`;
    });

    printableContent += `
            </table>

            <!-- Light Details -->
            <h4>Light Details</h4>
            <table>
                <tr>
                    <th>S.No.</th>
                    <th>Item</th>
                    <th>Quantity</th>
                </tr>`;

    // Add light ordered items to the printable content
    lightDetails?.orderedItems?.forEach((item, index) => {
      printableContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item}</td>
                    <td>${lightDetails.orderedItemsCount[index]}</td>
                </tr>`;
    });

    printableContent += `
            </table>
            <hr class="last_hr"/>
            <p class="thank_you">Thank you for choosing our services!</p>
        </body>
        </html>
    `;

    return printableContent;
  };

  return (
    <div className="h-[600px] overflow-y-scroll">
      {isLoading && (
        <div className=" flex justify-center items-center h-[500px] z-30">
          <Loader />
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <Link to={`/admin/order`} className="back-button">
          <IoMdArrowRoundBack />
        </Link>
        <button className="print-icon" onClick={handleOnPrint}>
          <PrintIcon />
        </button>
      </div>
      <h1>Order Details</h1>
      <hr />
      <div>
        <h4>Customer Details</h4>
        {!isEditCustomerDetails && (
          <>
            <p>
              <strong>Customer Name:</strong> {customerName}
            </p>
            <p>
              <strong>Customer Address:</strong> {customerAddress}
            </p>
            <p>
              <strong>Customer Phone Number:</strong> {customerPhoneNumber}
            </p>
            <p>
              <strong>Customer Email:</strong> {customerEmail}
            </p>
            <p>
              <strong>Date and Time:</strong> {dateAndTime}
            </p>
            <p>
              <strong>Other Details:</strong> {otherDetails}
            </p>
            <button
              className="edit-button"
              onClick={handleOnCustomerDetailsEdit}
            >
              Edit
            </button>
          </>
        )}
        {isEditCustomerDetails && (
          <>
            <label>
              <strong>Customer Name:</strong>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </label>
            <br />
            <label>
              <strong>Customer Address:</strong>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </label>
            <br />
            <label>
              <strong>Customer Phone Number:</strong>
              <input
                type="text"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
              />
            </label>
            <br />
            <label>
              <strong>Customer Email:</strong>
              <input
                type="text"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              <strong>Date and Time:</strong>
              <Datetime
                value={dateAndTime}
                onChange={(date) =>
                  setDateAndTime(date.format("YYYY-MM-DD HH:mm"))
                }
              />
            </label>
            <br />
            <label>
              <strong>Other Details:</strong>
              <textarea
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
            </label>
            <br />
            <button
              className="save-button"
              onClick={handleOnCustomerDetailsEditSave}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div>
        <CateringDetails cateringDetails={cateringDetails} />
        <BedingDetails details={bedingDetails} />
        <TentDetails details={tentDetails} />
        <LightDetails details={lightDetails} />
      </div>
      <Toaster />
    </div>
  );
};

export default OrderDetails;
