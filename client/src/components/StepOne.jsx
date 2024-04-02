import axios from "axios";
import React, { useState } from "react";
import Datetime from "react-datetime";
import config from "../config/config";
import toast, { Toaster } from "react-hot-toast";

const StepOne = ({ nextStep }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAlternatePhoneNumber, setCustomerAlternatePhoneNumber] =
    useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const handleNext = async () => {
    // Validation logic can be added here
    const data = {
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerAlternatePhoneNumber,
      otherDetails,
      dateAndTime,
    };

    try {
      const response = await axios.post(
        `${config.apiUrl}/customer/new`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      const { success, message, customer } = response.data;
      if (success) {
        toast.success(message);
        alert(message);
        localStorage.setItem("customerId", customer._id);
      }
    } catch (error) {
      console.log(error.response);
    }
    nextStep();
  };

  return (
    <>
      <Toaster />

      {/* form  */}
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
              onChange={(e) => setCustomerAlternatePhoneNumber(e.target.value)}
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
      <div className="flex justify-end">
        <button onClick={handleNext} className="mx-10 p-4 bg-green-500 rounded">
          Save & Next
        </button>
      </div>
    </>
  );
};

export default StepOne;
