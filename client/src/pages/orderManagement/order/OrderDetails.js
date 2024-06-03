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
      <nav className="bg-white shadow-md p-4 mb-6">
        <div className="flex justify-between items-center container mx-auto">
          <div className="flex items-center">
            <Link
              to="../order"
              className="text-gray-600 hover:text-gray-800"
            >
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
          </div>
          <h1 className="ml-4 text-2xl font-semibold text-gray-700">
            Order Details
          </h1>
          <button
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={handleOnPrint}
          >
            <PrintIcon className="text-2xl" />
          </button>
        </div>
      </nav>
      <hr />
      <div className="container mx-auto p-6">
        <h4 className="text-2xl font-semibold mb-6 text-gray-700">
          Customer Details
        </h4>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {!isEditCustomerDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-gray-600">
                <strong className="text-gray-800">Customer Name:</strong>{" "}
                {customerName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Customer Address:</strong>{" "}
                {customerAddress}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">
                  Customer Phone Number:
                </strong>{" "}
                {customerPhoneNumber}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Customer Email:</strong>{" "}
                {customerEmail}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Date and Time:</strong>{" "}
                {dateAndTime}
              </p>
              <p className="text-gray-600 md:col-span-2">
                <strong className="text-gray-800">Other Details:</strong>{" "}
                {otherDetails}
              </p>
              <div className="md:col-span-2 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={handleOnCustomerDetailsEdit}
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-700">
                  <strong>Customer Name:</strong>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">
                  <strong>Customer Address:</strong>
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">
                  <strong>Customer Phone Number:</strong>
                </label>
                <input
                  type="text"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">
                  <strong>Customer Email:</strong>
                </label>
                <input
                  type="text"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">
                  <strong>Date and Time:</strong>
                </label>
                <Datetime
                  value={dateAndTime}
                  onChange={(date) =>
                    setDateAndTime(date.format("YYYY-MM-DD HH:mm"))
                  }
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-700">
                  <strong>Other Details:</strong>
                </label>
                <textarea
                  value={otherDetails}
                  onChange={(e) => setOtherDetails(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={handleOnCustomerDetailsEditSave}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="mt-4 border p-4 rounded-md">
            <h4 className="text-2xl font-semibold mb-4 text-gray-700">
              Catering Details
            </h4>

            <CateringDetails cateringDetails={cateringDetails} />
          </div>
          <div className="mt-4 border p-4 rounded-md">
            <h4 className="text-2xl font-semibold mb-4 text-gray-700">
              Beding Details
            </h4>
            <BedingDetails bedingDetails={bedingDetails} />
          </div>
          <div className="mt-4 border p-4 rounded-md">
            <h4 className="text-2xl font-semibold mb-4 text-gray-700">
              Tent Details
            </h4>
            <TentDetails tentDetails={tentDetails} />
          </div>
          <div className="mt-4 border p-4 rounded-md">
            <h4 className="text-2xl font-semibold mb-4 text-gray-700">
              Light Details
            </h4>
            <LightDetails lightDetails={lightDetails} />
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default OrderDetails;
