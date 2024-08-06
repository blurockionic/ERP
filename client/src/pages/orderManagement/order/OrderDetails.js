import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import Datetime from "react-datetime";
import CateringDetails from "../../../components/CateringDetails";
import BedingDetails from "../../../components/BedingDetails";
import TentDetails from "../../../components/TentDetails";
import LightDetails from "../../../components/LightDetails";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PrintIcon from "@mui/icons-material/Print";
import Loader from "../../../components/Loader";
import { Plus, X } from "lucide-react";

const OrderDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddItemClicked, setIsAddItemClicked] = useState(false);
  const [isAddTentItemClicked, setIsAddTentItemClicked] = useState(false);
  const [isAddLightItemClicked, setIsAddLightItemClicked] = useState(false);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`; // Custom format: DD-MM-YYYY
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
        <h1>DG Caterer Service</h1>
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
                <td>${formatDate(customerDetails.dateAndTime)}</td>
            </tr>
            <tr>
                <td><b>Email:</b></td>
                <td>${customerDetails.customerEmail}</td>
            </tr>
            <tr>
                <td><b>Order Services:</b></td>
                <td>${customerDetails.isCateringOrdered ? "Catering, " : ""}${
      customerDetails.isTentOrdered ? "Tent, " : ""
    }${customerDetails.isBistarOrdered ? "Bistar, " : ""}${
      customerDetails.isLightOrdered ? "Light" : ""
    }</td>
            </tr>
        </table>

        <!-- Tent Details -->
        ${
          tentDetails.itemList.length > 0
            ? `
          <h4>Tent Details</h4>
            <p>Tent Area: ${tentDetails.tentArea || "N/A"}</p>
        <table>
            <tr>
                <th>S.No.</th>
                <th>Item</th>
                <th>Quantity</th>
            </tr>
            ${tentDetails.itemList
              .map(
                (item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.itemNameTent ?? "N/A"}</td>
                    <td>${item.itemCountForOrderTent ?? "N/A"}</td>
                </tr>
            `
              )
              .join("")}
        </table>`
            : `<div class="text-sm text-gray-900"></div>`
        }
       
      
`;

    printableContent += `
</table>

${
  cateringDetails && cateringDetails.length > 0
    ? `
  <h4> Catering Details</h4>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th style="text-align: center;">
                  Meal 
                </th>
                <th style="text-align: center;">
                   Time
                </th>
                <th style="text-align: center;">
                  People 
                </th>
                <th style="text-align: center;">
                  Recipes
                </th>
                <th style="text-align: center;">
                  Beverages
                </th>
              </tr>
            </thead>
            <tbody >
              ${cateringDetails
                .map(
                  (order, index) => `
                    <tr key=${index} >
                      <td style="text-transform: capitalize; text-align:center;">
                        ${order.mealType ?? "N/A"}
                      </td>
                      <td style="text-align:center;">
                        ${order.mealTime ?? "N/A"}
                      </td>
                      <td style="text-align:center;">
                        ${order.peopleCount ?? "N/A"}
                      </td>
                      <td ">
                        <ul >
                          ${order.recipe
                            .map(
                              (item, recipeIndex) =>
                                `<li key=${recipeIndex} style="text-transform: capitalize;">${
                                  item ?? "N/A"
                                }</li>`
                            )
                            .join("")}
                        </ul>
                      </td>
                      <td >
                        <ul>
                          ${order.selectedBeverages
                            .map(
                              (item, beverageIndex) =>
                                `<li key=${beverageIndex} style="text-transform: capitalize;">${
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
    : `<div className="text-sm text-gray-900"></div>`
}
`;
    printableContent += `
    ${
      bedingDetails && bedingDetails.length > 0
        ? `
      <h4>Bedding Details</h4>
<!-- Beding Details -->
<table>
    <tr>
        <th>S.No.</th>
        <th>Item</th>
        <th>Quantity</th>
        ${bedingDetails
          ?.map(
            (item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.itemNameBistar ?? "N/A"}</td>
                <td>${item.itemCountForOrderBistar ?? "N/A"}</td>
            </tr>
        `
          )
          .join("")}
    </tr>`
        : `<div className="text-sm text-gray-900"></div>`
    }



`;
    printableContent += `
</table>
${
  lightDetails && lightDetails.length > 0
    ? `
  <h4>Light Details</h4>
<!-- Beding Details -->
<table>
    <tr>
        <th>S.No.</th>
        <th>Item</th>
        <th>Quantity</th>
    </tr>
    ${lightDetails
      ?.map(
        (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.itemNameLight ?? "N/A"}</td>
            <td>${item.itemCountForOrderLight ?? "N/A"}</td>
        </tr>
    `
      )
      .join("")}
</table>`
    : `<div class="text-sm text-gray-900"></div>`
}
`;
    printableContent += `
            </table>
            <hr class="last_hr"/>
            <p class="thank_you">Thank you for choosing our services!</p>
        </body>
        </html>
    `;

    return printableContent;
  };

  // handle for bedding detail
  const handleOnAddItem = () => {
    setIsAddItemClicked((prev) => !prev);
  };
  // handle for close bedding details
  const handleOnAddItemClose = () => {
    setIsAddItemClicked((prev) => !prev);
  };
  // handle for tent detail
  const handleOnAddTentItem = () => {
    setIsAddTentItemClicked((prev) => !prev);
  };
  // handle for close tent details
  const handleOnAddTentItemClose = () => {
    setIsAddTentItemClicked((prev) => !prev);
  };
  // handle for light detail
  const handleOnAddLightItem = () => {
    setIsAddLightItemClicked((prev) => !prev);
  };
  // handle for close light details
  const handleOnAddLightItemClose = () => {
    setIsAddLightItemClicked((prev) => !prev);
  };

  return (
    <div className="h-[650px] overflow-y-scroll bg-gray-50">
      {isLoading && (
        <div className=" flex justify-center items-center h-[500px] z-30">
          <Loader />
        </div>
      )}
      <nav className="bg-white shadow-md px-10 py-2 sticky top-0">
        <div className="flex justify-between items-center container mx-auto">
          <div className="flex items-center">
            <Link to="../order" className="text-gray-600 hover:text-gray-800">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
          </div>

          <button
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={handleOnPrint}
          >
            <PrintIcon className="text-2xl" />
          </button>
        </div>
      </nav>
      <hr />
      <div className="container mx-auto p-6 max-w-screen-lg shadow-sm ">
        <div className="bg-white border shadow-sm rounded-lg ">
          <h4 className="text-lg font-semibold mb-6 text-white uppercase bg-gray-500 px-4 py-2">
            Customer Details
          </h4>
          {!isEditCustomerDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4 ">
              <p className="text-gray-600 ">
                <strong className="text-gray-800">Name: </strong>
                {customerName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800"> Address: </strong>
                {customerAddress}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Phone Number: </strong>
                {customerPhoneNumber}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800"> Email: </strong>
                {customerEmail}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Date and Time: </strong>
                {dateAndTime}
              </p>
              <p className="text-gray-600 md:col-span-2">
                <strong className="text-gray-800">Other Details: </strong>
                {otherDetails}
              </p>
              {/* <div className="md:col-span-2 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={handleOnCustomerDetailsEdit}
                >
                  Edit
                </button>
              </div> */}
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
          {cateringDetails.length > 0 && (
            <div className="mt-4 bg-white  rounded-md shadow-md">
              <h4 className="text-lg font-semibold text-white uppercase  px-4 py-2">
                Catering Details
              </h4>
              <CateringDetails cateringDetails={cateringDetails} />
            </div>
          )}

          {bedingDetails.length > 0 && (
            <div className="mt-4 bg-white rounded-md shadow-md">
              <div className="flex justify-between bg-gray-500 px-5 items-center">
                <h4 className="text-lg font-semibold text-white uppercase  px-4 py-2">
                  Bedding Details
                </h4>
                {isAddItemClicked ? (
                  <X
                    className="bg-red-500 text-white rounded-full cursor-pointer "
                    onClick={() => handleOnAddItemClose()}
                  />
                ) : (
                  <Plus
                    className="bg-white rounded-full cursor-pointer"
                    onClick={() => handleOnAddItem()}
                  />
                )}
              </div>
              <BedingDetails
                bedingDetails={bedingDetails}
                isAddItemClicked={isAddItemClicked}
                id={id}
                flag={"beding"}
              />
            </div>
          )}

          {tentDetails?.itemList?.length > 0 && (
            <div className="mt-4 bg-white rounded-md shadow-md">
              <div className="flex justify-between bg-gray-500 px-5 items-center">
                <h4 className="text-lg font-semibold text-white uppercase  px-4 py-2">
                  Tent Details
                </h4>
                {isAddItemClicked ? (
                  <X
                    className="bg-red-500 text-white rounded-full cursor-pointer "
                    onClick={() => handleOnAddTentItemClose()}
                  />
                ) : (
                  <Plus
                    className="bg-white rounded-full cursor-pointer"
                    onClick={() => handleOnAddTentItem()}
                  />
                )}
              </div>
              <TentDetails
                tentDetails={tentDetails}
                isAddItemClicked={isAddTentItemClicked}
                id={id}
                flag={"tent"}
              />
            </div>
          )}

          {lightDetails.length > 0 && (
            <div className="mt-4 bg-white rounded-md shadow-md">
              <div className="flex justify-between bg-gray-500 px-5 items-center">
                <h4 className="text-lg font-semibold text-white uppercase  px-4 py-2">
                  Light details
                </h4>
                {isAddLightItemClicked ? (
                  <X
                    className="bg-red-500 text-white rounded-full cursor-pointer "
                    onClick={() => handleOnAddLightItemClose()}
                  />
                ) : (
                  <Plus
                    className="bg-white rounded-full cursor-pointer"
                    onClick={() => handleOnAddLightItem()}
                  />
                )}
              </div>
              <LightDetails
                lightDetails={lightDetails}
                isAddItemClicked={isAddLightItemClicked}
                id={id}
                flag={"light"}
              />
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default OrderDetails;
