import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import Datetime from "react-datetime";
import CateringDetails from "../../../components/CateringDetails";
import BistarDetails from "../../../components/BistarDetails";

const OrderDetails = () => {
  //customer details usestate
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
  console.log(id); // Output: 660b60d62b417da0a357517e

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
          setDateAndTime(orders.dateAndTime);
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
  }, [id]);

  console.log(cateringDetails)
  return (
    
      <div className="overflow-y-scroll h-[700px]">
        {/* customer details  */}
        <div>
          <p className="text-center">Order Details</p>
          <div>
            <div className="font-bold text-center text-lg uppercase border-b-2 ">
              Customer Details
            </div>
            <div className="grid grid-cols-2 gap-8 m-4">
              <div className="relative">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Customer Name{" "}
                </label>
                <input
                  type="text"
                  name="customer Name"
                  placeholder="Enter name"
                  className="w-full px-4 py-2 pl-4 border rounded-md"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="relative ">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Enter address{" "}
                </label>
                <input
                  type="text"
                  name="Address"
                  placeholder="Enter your address..."
                  className="w-full px-4 py-2 pl-4 border rounded-md"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>
              <div className="">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                  <sup>*</sup>
                </label>
                <input
                  type="tel"
                  required={true}
                  id="phoneNumber"
                  name="phoneNumber"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                />

                <label
                  htmlFor="alternateNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alternate Number
                </label>
                <input
                  type="tel"
                  id="alternateNumber"
                  name="alternateNumber"
                  value={customerAlternatePhoneNumber}
                  onChange={(e) =>
                    setCustomerAlternatePhoneNumber(e.target.value)
                  }
                  placeholder="Enter alternate number (optional)"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="">
                <label
                  htmlFor="dateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date and Time
                </label>
                <Datetime
                  inputProps={{
                    id: "dateTime",
                    className: "w-full px-4 py-2 border rounded-md",
                  }}
                  value={dateAndTime}
                  onChange={(movement) => setDateAndTime(movement)}
                />
              </div>
              <div className="">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Other Details{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter your address..."
                  className="w-full px-4 py-2 pl-4 border rounded-md"
                  value={otherDetails}
                  onChange={(e) => setOtherDetails(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <div className="flex justify-end">
        <button onClick={handleNext} className="mx-10 p-4 bg-green-500 rounded">
          Save & Next
        </button>
      </div> */}
        </div>

        {/* catering details */}
        <div>
          {/* <CateringDetails cateringDetails={cateringDetails}/> */}
        </div>

        {/* bistar details  */}
        <div>
            <BistarDetails bistarDetails={bistarDetails}/>
        </div>
      </div>
    
  );
};

export default OrderDetails;
