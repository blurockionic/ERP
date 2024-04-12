import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import Datetime from "react-datetime";
import CateringDetails from "../../../components/CateringDetails";
import BistarDetails from "../../../components/BistarDetails";
import TentDetails from "../../../components/TentDetails";
import LightDetails from "../../../components/LightDetails";
import { Tooltip } from "@mui/material";

import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const OrderDetails = () => {
  const [loading, setLoading] = useState(false);
  //customer details usestate
  const [isIsEditCustomerDetails, setIsEditCustomerDetails] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAlternatePhoneNumber, setCustomerAlternatePhoneNumber] =
    useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const [customerDetails, setCustomerDetails] = useState([]);
  const [tentDetails, setTentDetails] = useState([]);
  const [lightDetails, setLightDetails] = useState([]);
  const [cateringDetails, setCateringDetails] = useState([]);
  const [bistarDetails, setBistarDetails] = useState([]);
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
          `${config.apiUrl}/customer/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { orders, success } = response.data;
        if (success) {
          setCustomerDetails(orders);
          setCustomerPhoneNumber(orders.customerPhoneNumber);
          setCustomerName(orders.customerName);
          setCustomerAddress(orders.customerAddress);
          setDateAndTime(
            new Date(orders.dateAndTime).toISOString().split("T")[0]
          );
          setOtherDetails(orders.customerOtherDetails);
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

    //bistar
    const fetchBistarDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/bistar/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { orders, success } = response.data;
        if (success) {
          setBistarDetails(orders);
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
    fetchTentDetails();
    fetchLightDetails();
    fetchBistarDetails();
    fetchCateringDetails();
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



  return (
    <div className="overflow-y-scroll h-[650px] ">
      <Toaster />
      {/* customer details  */}
      <div className="flex justify-between p-2 rounded-md font-bold uppercase  bg-[#edf1fd]">
        <Tooltip title="Back to order details " placement="bottom" arrow>
          <Link to="../order">
          <button className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Back
            </button>
          </Link>
        </Tooltip>
        <h1 className="uppercase font-extrabold text-xl ">Order Details</h1>
        <span></span>
      </div>
      {/* customer details  */}
      <div className="w-full mx-auto mt-3">
        <div>
          <div className="font-bold text-left text-lg uppercase border-b-2 flex justify-between mx-2 py-1 bg-gray-200">
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
          <div className="grid grid-cols-3 gap-2 m-4">
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
            </div>
            {/* alternate number  */}
            <div>
              <label
                htmlFor="alternateNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Alternate Number
              </label>
              <input
                type="text"
                id="alternateNumber"
                name="alternateNumber"
                disabled={isIsEditCustomerDetails ? false : true}
                value={customerAlternatePhoneNumber}
                onChange={(e) =>
                  setCustomerAlternatePhoneNumber(e.target.value)
                }
                placeholder="Enter alternate number (optional)"
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
        {/* <div className="flex justify-end">
    <button onClick={handleNext} className="mx-10 p-4 bg-green-500 rounded">Save & Next</button>
  </div> */}
      </div>

      {/* catering details */}
     
      <div>
        {customerDetails.isCateringOrdered ? (
          <CateringDetails id={id}/>
        ) : (
          <p className="text-center px-4 py-4 bg-gray-50 w-auto mx-4 my-4">
            Catering Ordered not Available!
          </p>
        )}
      </div>

      {/* bistar details  */}
      <div className="font-bold text-left text-lg uppercase border-b-2 flex justify-between mx-4 py-3 bg-gray-200">
        <p className="px-4 my-1">Bistar Order Details</p>
        <p className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div className="mx-4 my-2">
        {customerDetails.isBistarOrdered ? (
          <BistarDetails bistarDetails={bistarDetails} />
        ) : (
          <p className="text-center px-4 py-4 bg-gray-50 w-auto mx-4 my-4">
            Bistar Ordered not Available!
          </p>
        )}
      </div>

      <div className="font-bold text-left text-lg uppercase border-b-2 flex justify-between mx-4 py-3 bg-gray-200">
        <p className="px-4 my-1">Tent Order Details</p>
        <p className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div className="mx-4">
        {customerDetails.isTentOrdered ? (
          <TentDetails tentDetails={tentDetails} />
        ) : (
          <p className="text-center px-4 py-4 bg-gray-50 w-auto  my-4">
            Tent Ordered not Available!
          </p>
        )}
      </div>

      {/* light details  */}
      <div className="font-bold text-left text-lg uppercase border-b-2 flex justify-between mx-4 py-3 bg-gray-200">
        <p className="px-4 my-1">Light Order Details</p>
        <p className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div>
        {customerDetails.isLightOrdered ? (
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
