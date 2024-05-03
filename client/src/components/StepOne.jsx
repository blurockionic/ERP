import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-datetime/css/react-datetime.css";
import config from "../config/config";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";

const StepOne = ({ nextStep }) => {
  const [formDataTent, setFormDataTent] = useState({
    itemList: [],
  });
  const [formDataLight, setFormDataLight] = useState({
    itemList: [],
  });
  const [formDataBistar, setFormDataBistar] = useState({
    itemList: [],
  });
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [status, setStatus] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [itemNameTent, setItemNameTent] = useState("");
  const [itemNameLight, setItemNameLight] = useState("");
  const [itemNameBistar, setItemNameBistar] = useState("");
  const [itemCountTent, setItemCountTent] = useState("");
  const [itemCountLight, setItemCountLight] = useState("");
  const [itemCountBistar, setItemCountBistar] = useState("");
  const [itemCountForOrderTent, setItemCountForOrderTent] = useState("");
  const [itemCountForOrderLight, setItemCountForOrderLight] = useState("");
  const [itemCountForOrderBistar, setItemCountForOrderBistar] = useState("");

  //useState for form
  const [isTentModelOpen, setIsTentModelOpen] = useState(false);
  const [isBistarModelOpen, setIsBistarModelOpen] = useState(false);
  const [isLightModelOpen, setIsLightModelOpen] = useState(false);
  const [isCateringModelOpen, setIsCateringModelOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);

  let optionsTent = [];
  let optionsLight = [];
  let optionsBistar = [];

  //fetch all the inventpry
  useEffect(() => {
    const fetchInventoryItem = async () => {
      const response = await axios.get(`${config.apiUrl}/inventory/all`, {
        withCredentials: true,
      });
      const { statusText, data } = response;
      if (statusText === "OK") {
        setInventoryItems(data);
      }
    };

    fetchInventoryItem();
  }, []);

  for (let i = 0; i < inventoryItems.length; i++) {
    // LOAD TENT ITEMS
    if (inventoryItems[i].itemCategoryType === "tent") {
      const value = inventoryItems[i].itemName;
      const label = inventoryItems[i].itemName;
      optionsTent.push({ value, label });
    }

    //LOAD LIGHT ITEMS
    if (inventoryItems[i].itemCategoryType === "light") {
      const value = inventoryItems[i].itemName;
      const label = inventoryItems[i].itemName;
      optionsLight.push({ value, label });
    }

    //LOAD LIGHT ITEMS
    if (inventoryItems[i].itemCategoryType === "beding") {
      const value = inventoryItems[i].itemName;
      const label = inventoryItems[i].itemName;
      optionsBistar.push({ value, label });
    }
  }

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
        toast.success("Customer Details Added Successfully");

        localStorage.setItem("customerId", customer._id);
        // Enable the button after successful response
        setIsLoading(false);
        nextStep();
      }
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  // Function to check if the date is today or in the future
  const isValidDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
    return current.isAfter(today) || current.isSame(today, "day");
  };

  // handle on select change
  const handleSelectChangeTent = (selectedOption) => {
    setItemNameTent(selectedOption.value);

    for (let i = 0; i < inventoryItems.length; i++) {
      if (selectedOption.value === inventoryItems[i].itemName) {
        if (inventoryItems[i].totalItemQuantity === 0) {
          alert("Stock Not Available!");
        }
        setItemCountTent(inventoryItems[i].totalItemQuantity);
      }
    }
  };

  // handle on select change
  const handleSelectChangeLight = (selectedOption) => {
    setItemNameLight(selectedOption.value);

    for (let i = 0; i < inventoryItems.length; i++) {
      if (selectedOption.value === inventoryItems[i].itemName) {
        if (inventoryItems[i].totalItemQuantity === 0) {
          alert("Stock Not Available!");
        }
        setItemCountLight(inventoryItems[i].totalItemQuantity);
      }
    }
  };

  // handle on select change
  const handleSelectChangeBistar = (selectedOption) => {
    setItemNameBistar(selectedOption.value);

    for (let i = 0; i < inventoryItems.length; i++) {
      if (selectedOption.value === inventoryItems[i].itemName) {
        if (inventoryItems[i].totalItemQuantity === 0) {
          alert("Stock Not Available!");
        }
        setItemCountBistar(inventoryItems[i].totalItemQuantity);
      }
    }
  };

  //handle on add items
  //add item for tent
  const handleAddItemTent = () => {
    const data = {
      itemNameTent,
      itemCountForOrderTent,
    };

    addMultipleItems(data);
  };

  const addMultipleItems = (data) => {
    setFormDataTent((prevFormData) => ({
      itemList: [...prevFormData.itemList, data],
    }));
  };

  // handle for add light items
  const handleAddItemLight = () => {
    const data = {
      itemNameLight,
      itemCountForOrderLight,
    };

    addMultipleItemsLight(data);
  };

  const addMultipleItemsLight = (data) => {
    setFormDataLight((prevFormData) => ({
      itemList: [...prevFormData.itemList, data],
    }));
  };

  // handle for add bistar items
  const handleAddItemBistar = () => {
    const data = {
      itemNameBistar,
      itemCountForOrderBistar,
    };

    addMultipleItemsBistar(data);
  };

  const addMultipleItemsBistar = (data) => {
    setFormDataBistar((prevFormData) => ({
      itemList: [...prevFormData.itemList, data],
    }));
  };

  // REMOVE items lights
  const removeItemTent = (index) => {
    const updatedItemList = [...formDataTent.itemList];
    updatedItemList.splice(index, 1);
    setFormDataTent({ ...formDataTent, itemList: updatedItemList });
  };

  // REMOVE items lights
  const removeItemLight = (index) => {
    const updatedItemList = [...formDataLight.itemList];
    updatedItemList.splice(index, 1);
    setFormDataLight({ ...formDataLight, itemList: updatedItemList });
  };

  // remove items of bistar
  const removeItemBistar = (index) => {
    const updatedItemList = [...formDataBistar.itemList];
    updatedItemList.splice(index, 1);
    setFormDataBistar({ ...formDataBistar, itemList: updatedItemList });
  };

  return (
    <>
      <Toaster />
      {/* form  */}
      <div className="h-screen  overflow-x-hidden bg-gray-50">
        {/* <div className="font-bold text-center text-lg uppercase border-b-2 flex flex-row justify-between py-2  bg-white w-full">
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
        </div> */}
        <div className="w-full bg-white py-2 px-2 shadow text-center">
          {" "}
          <span className="text-lg uppercase">New Order </span>
        </div>

        <div className="mt-8 mb-20 overflow-hidden overflow-x-hidden w-[90%] rounded-md mx-auto bg-white border shadow-lg">
          <div className="w-full bg-gray-50 py-2 px-2 shadow text-start">
            <span className="text-sm uppercase mx-2">Customer Details</span>
          </div>

          <div className="grid grid-cols-2 gap-8 m-4  ">
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
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                type="datetime-local"
                value={dateAndTime}
                onChange={(e) => handleDateAndTimeChange(e)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
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
          {/* <div className="flex justify-center mt-20">
            <button
              onClick={handleNext}
              disabled={isLoading} // Disable the button if loading
              className="select-none rounded bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? "Loading..." : "Save & Next"}
            </button>
          </div> */}

          {/* order category  */}
          <div className="w-full bg-gray-50 py-2 px-2 shadow text-start">
            <span className="text-sm uppercase mx-2">Choose Order</span>
          </div>
          <div className="flex justify-items-start py-2 px-4">
            <div className="flex mr-4">
              <input
                type="checkbox"
                name="tent"
                id="tent"
                className="w-4 mr-1"
                onClick={() => {
                  const previous = !isTentModelOpen;
                  setIsTentModelOpen(previous);
                }}
              />
              <label htmlFor="tent">Tent</label>
            </div>
            <div className="flex mr-4">
              <input
                type="checkbox"
                name="bistar"
                id="bistar"
                className="w-4 mr-1"
                onClick={() => {
                  const previous = !isBistarModelOpen;
                  setIsBistarModelOpen(previous);
                }}
              />
              <label htmlFor="bistar">Bistar</label>
            </div>
            <div className="flex mr-4">
              <input
                type="checkbox"
                name="light"
                id="light"
                className="w-4 mr-1"
                onClick={() => {
                  const previous = !isLightModelOpen;
                  setIsLightModelOpen(previous);
                }}
              />
              <label htmlFor="light">Light</label>
            </div>
            <div className="flex mr-4">
              <input
                type="checkbox"
                name="catering"
                id="catering"
                className="w-4 mr-1"
                onClick={() => {
                  const previous = !isCateringModelOpen;
                  setIsCateringModelOpen(previous);
                }}
              />
              <label htmlFor="catering">Catering</label>
            </div>
          </div>

          {/* tent order  */}
          {isTentModelOpen && (
            <div className="p-4">
              <span className="bg-gray-200 w-auto px-5 py-1">Tent Order</span>
              <div className="flex items-center space-x-4 p-3">
                <div className="flex flex-col">
                  <label className="text-sm mx-2">Item Name:</label>
                  <Select
                    defaultValue={setItemNameTent}
                    onChange={handleSelectChangeTent}
                    options={optionsTent}
                    className="w-64 py-1 px-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm">Count: {itemCountTent}</label>
                  <input
                    type="number"
                    value={itemCountForOrderTent}
                    onWheel={(e) => e.preventDefault()}
                    onChange={(e) => setItemCountForOrderTent(e.target.value)}
                    className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleAddItemTent();
                  }}
                  className="bg-gray-50 font-semibold px-4 py-2 mt-5 shadow rounded uppercase"
                >
                  Add Item
                </button>
              </div>
              {/* list of item  */}
              <div className="w-full mx-auto p-4">
                <h2 className="text-sm font-semibold  mb-2">List of Items</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 ">S.no</th>
                      <th className="p-2 ">Item Name</th>
                      <th className="p-2">Count</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDataTent.itemList.map((item, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2 text-center">{item.itemNameTent}</td>
                        <td className="p-2 text-center">
                          {item.itemCountForOrderTent}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeItemTent(index)}
                            className="bg-red-100 px-3 py-1 rounded-full border"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* bistar order  */}
          {isBistarModelOpen && (
            <div className="px-4">
              <span className="bg-gray-200 w-auto px-5 py-1">Bistar Order</span>
              <div className="flex items-center space-x-4  p-4">
                <div className="flex flex-col">
                  <label className="text-sm mx-2">Item Name:</label>
                  <Select
                    defaultValue={itemNameBistar}
                    onChange={handleSelectChangeBistar}
                    options={optionsBistar}
                    className="w-64 py-1 px-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm mx-2">
                    Count: {itemCountBistar}
                  </label>
                  <input
                    type="number"
                    value={itemCountForOrderBistar}
                    onWheel={(e) => e.preventDefault()}
                    onChange={(e) => setItemCountForOrderBistar(e.target.value)}
                    className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleAddItemBistar();
                  }}
                  className="bg-gray-100  font-semibold shadow px-4 py-2 mt-5 rounded uppercase"
                >
                  Add Item
                </button>
              </div>
              {/* list of item  */}
              <div className="w-full mx-auto p-4">
                <h2 className="text-sm font-semibold  mb-2">List of Items</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 ">S.no</th>
                      <th className="p-2 ">Item Name</th>
                      <th className="p-2">Count</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDataBistar.itemList.map((item, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2 text-center">
                          {item.itemNameBistar}
                        </td>
                        <td className="p-2 text-center">
                          {item.itemCountForOrderBistar}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeItemBistar(index)}
                            className="bg-red-100 px-3 py-1 rounded-full border"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* light order  */}
          {isLightModelOpen && (
            <div className="p-4">
              <span className="bg-gray-200 w-auto px-5 py-1">Light Order</span>
              <div className="flex items-center space-x-4 p-4">
                <div className="flex flex-col">
                  <label className="text-sm mx-2">Item Name</label>
                  <Select
                    defaultValue={setItemNameLight}
                    onChange={handleSelectChangeLight}
                    options={optionsLight}
                    className="w-64 py-1 px-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm mx-2">
                    Count: {itemCountLight}
                  </label>
                  <input
                    type="number"
                    value={itemCountForOrderLight}
                    onWheel={(e) => e.preventDefault()}
                    onChange={(e) => setItemCountForOrderLight(e.target.value)}
                    className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleAddItemLight();
                  }}
                  className="bg-gray-100  font-semibold shadow px-4 py-2 mt-5 rounded uppercase"
                >
                  Add Item
                </button>
              </div>
              {/* list of item  */}
              <div className="w-full mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">List of Items</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 ">S.no</th>
                      <th className="p-2 ">Item Name</th>
                      <th className="p-2">Count</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDataLight.itemList.map((item, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2 text-center">
                          {item.itemNameLight}
                        </td>
                        <td className="p-2 text-center">
                          {item.itemCountForOrderLight}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeItemLight(index)}
                            className="bg-red-100 px-3 py-1 rounded-full border"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* catering order  */}
          {isCateringModelOpen && <div>Catering</div>}
        </div>
      </div>
    </>
  );
};

export default StepOne;
