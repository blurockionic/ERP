import axios from "axios";
import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import config from "../config/config";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const StepOne = ({ nextStep }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [status, setStatus] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Handle date and time change
  const handleDateAndTimeChange = (event) => {
    console.log(event.target.value);
    
    setDateAndTime(event.target.value);
  };

  // Determine the status based on the order date

  const handleNext = async () => {
    const isToday = (dateString) => {
      // Parse the provided date string into a Date object
      const date = new Date(dateString);
    
      // Get today's date
      const today = new Date();
    
      // Compare only the date part (ignore time) by comparing the year, month, and day
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    };

    // Disable the button
    setIsLoading(true);
    // Remove leading and trailing whitespace from phone number
    const trimmedPhoneNumber = customerPhoneNumber.trim();

    // Check if the phone number starts with 0 or +91
    if (
      trimmedPhoneNumber.startsWith("0") ||
      trimmedPhoneNumber.startsWith("+91")
    ) {
      toast.error("Please enter a valid phone number");
      setIsLoading(false); // Enable the button
      return; // Exit the function early if phone number is invalid
    }

    // Check if the phone number is empty or has less than 10 digits
    if (trimmedPhoneNumber.length !== 10) {
      toast.error("Please enter a 10-digit phone number");
      setIsLoading(false); // Enable the button
      return;
    }

    // Continue with other form validations
    if (!customerAddress || !customerName || !dateAndTime) {
      toast.error("Please fill all the fields");
      setIsLoading(false); // Enable the button
      return;
    }

    // If all validations pass, proceed with form submission
    const data = {
      customerName,
      customerAddress,
      customerPhoneNumber: trimmedPhoneNumber, // Use the validated phone number
      customerEmail,
      otherDetails,
      dateAndTime,
      status: isToday(dateAndTime) ? "pending" : "awaited",
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

      const { success, message, customer } = response.data;
      if (success) {
        toast.success(message);
        alert(message);
        localStorage.setItem("customerId", customer._id);
        // Enable the button after successful response
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
    nextStep();
  };

  // Function to check if the date is today or in the future
  const isValidDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
    return current.isAfter(today) || current.isSame(today, "day");
  };

  return (
    <>
      <Toaster />
      {/* form  */}
      <div className="flex flex-col h-[90vh] overflow-hidden overflow-x-hidden bg-gray-50">
        <div className="font-bold text-center text-lg uppercase border-b-2 flex flex-row justify-between py-2  bg-white w-full">
          <div className="mx-2">
            <Link to={"../order"}>
              <Tooltip title="back to order details " placement="bottom" arrow>
                <button className="rounded  py-2 px-6 text-center align-middle text-xs font-bold bg-white border  shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Back
                </button>
              </Tooltip>
            </Link>
          </div>
          <div> Customer Details</div>
          <div></div>
        </div>

        <div className="mt-8 overflow-hidden overflow-x-hidden w-[80%] rounded-md mx-auto bg-white border shadow-lg h-[30rem]">
          <div className="grid grid-cols-2 gap-8 m-4  mt-12 ">
            <div className="relative">
              <input
                type="text"
                name="customer name"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none   disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Customer Name
              </label>
            </div>
            <div className="relative ">
              <input
                type="text"
                name=""
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Address
              </label>
            </div>
            <div className="relative">
              <input
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                type="tel"
                required={true}
                id="phoneNumber"
                name="phoneNumber"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                <span className="relative">
                  Mobile Number <sup className="text-red-800">*</sup>
                </span>
              </label>

              {/* Remark for phone number */}
              {customerPhoneNumber &&
                (customerPhoneNumber.startsWith("0") ||
                  customerPhoneNumber.startsWith("+91")) && (
                  <p className="text-red-500 text-sm">
                    Phone number should not start with 0 or +91
                  </p>
                )}
            </div>
            <div className="relative">
              <input
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                type="email"
                required={true}
                id="alternateNumber"
                name="alternateNumber"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Email (Optional)
              </label>
            </div>
            <div className="relative">
              <input
                type="datetime-local"
                value={dateAndTime}
                onChange={(e) => handleDateAndTimeChange(e)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                <b>Date and Time</b>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                type="text"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Other Details
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-20">
            <button
              onClick={handleNext}
              disabled={isLoading} // Disable the button if loading
              className="select-none rounded bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? "Loading..." : "Save & Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepOne;
