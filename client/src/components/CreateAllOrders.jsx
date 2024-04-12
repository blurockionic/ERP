import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";
import CateringOrder from "../pages/orderManagement/page/CateringOrder";
import BisterOrder from "../pages/orderManagement/page/BisterOrder";
import axios from "axios";
import config from "../config/config";
import LightOrder from "../pages/orderManagement/page/LightOrder";
import toast, { Toaster } from "react-hot-toast";

const CreateAllOrders = ({ setShowModel }) => {
  //usestate for bistar order
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAlternatePhoneNumber, setCustomerAlternatePhoneNumber] =
    useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  // useState for the check  boxes in step 2 order form
  const [isTentChecked, setIsTentChecked] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isCateringChecked, setIsCateringChecked] = useState(false);
  const [isLightChecked, setIsLightChecked] = useState(false);
  const [isBistarChecked, setIsBistarChecked] = useState(false);

  //   use state for the nextstep page
  const [step, setStep] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  // code for submit the bister order details and save it

  

  

  // bistar  order function
  const handlebistarOrdar = async () => {
    // try {
    //   const orderType = "Bistar";
    //   const response = await axios.post(
    //     `${config.apiUrl}/bistar/new`,
    //     {
    //       name,
    //       address,
    //       phoneNumber,
    //       alternateNumber,
    //       otherDetails,
    //       dateAndTime,
    //       orderType,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   const { success, message, id } = response.data;
    //   if (success) {
    //     localStorage.setItem("bistaerId", id);
    //     alert(message);
    //   }
    // } catch (error) {
    //   console.log(error.response.data.message);
    // }
  };

  const handleCheckboxChange = (value) => {
    // Toggle the checked state of the selected item
  switch (value) {
    case "tent":
      setIsTentChecked(prevState => !prevState);
      break;
    case "catering":
      setIsCateringChecked(prevState => !prevState);
      break;
    case "light":
      setIsLightChecked(prevState => !prevState);
      break;
    case "bistar":
      setIsBistarChecked(prevState => !prevState);
      break;
    default:
      break;
  }
    // Toggle the array of checked items
    setCheckedItems(prevCheckedItems => {
      if (prevCheckedItems.includes(value)) {
        return prevCheckedItems.filter((item) => item !== value);
      } else {
        return [...prevCheckedItems, value];
      }
    });
  };

  console.log(checkedItems)
  
  //  handler for change the nuber
  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    setCustomerPhoneNumber(value);
  };
  // handler for the alternate  number
  const handleChangeAlternateNumber = (e) => {
    const { value } = e.target;
    setCustomerAlternatePhoneNumber(value);
  };
  // date and time handle function
  const handleDateTimeChange = (moment) => {
    setDateAndTime(moment);
  };
  // back button
  const backButtonHandle = () => {
    setStep(step - 1);
  };
  // submit button handlar for the submitting the ordars  to the database
  const handleSubmitButton = () => {
    // console.log("working");
    if (checkedItems.includes("bistar") === true) {
      handlebistarOrdar();
    }
  };
  const nextPageHandler = async () => {
    if (step === 1) {
      setStep(step + 1);
      setIsNextClicked(true);

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

        const { success, message, customer } = response.data;
        if (success) {
          toast.success(message);
          localStorage.setItem("customerId", customer._id);
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      // Check if any items are selected
      if (
        !(
          isTentChecked ||
          isCateringChecked ||
          isLightChecked ||
          isBistarChecked
        )
      ) {
        alert("Please select at least one option.");
      } else {
        
        if (step === 2) {
          //for selecting order 
          const customerId = localStorage.getItem("customerId");
          try {
            const response = await axios.put(
              `${config.apiUrl}/customer/update/${customerId}`,
              { checkedItems },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
    
            const { success, message } = response.data;
            if (success) {
              toast.success(message);
            }
          } catch (error) {
            console.log(error.response);
          }
        }
        setStep(step + 1);
      }
    }

    //if step 3

  };
  return (
    <>
      <Toaster />
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="   bg-white rounded-sm w-[50%] h-[90vh] p-2 overflow-y-auto">
          {/* data fields  */}

          <div className="  border-b-2 flex w-full  justify-between p-2 rounded font-bold text-xl text-black">
            <Tooltip
              title="Back"
              placement="bottom"
              arrow
              onClick={backButtonHandle}
            >
              <button className="text-back font-bold rounded-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50">
                <ArrowBackIcon />
              </button>
            </Tooltip>
            <span></span>

            <div className=" " onClick={() => setShowModel(false)}>
              <Tooltip title="cancel" placement="bottom" arrow>
                <button className="text-back font-bold rounded-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50">
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          {step === 1 && (
            <div>
              <>
                {" "}
                <div className="font-bold text-center text-lg uppercase border-b-2 ">
                  Adress
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
                      onChange={handleChangePhoneNumber}
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
                      onChange={handleChangeAlternateNumber}
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
                      onChange={handleDateTimeChange}
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
              </>{" "}
            </div>
          )}
          {step === 2 && (
            <>
              <h2 className=" mt-2 bg-slate-300 font-bold uppercase">
                {" "}
                selected Order Type{" "}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xt font-bold mt-2 p-2">
                <label
                  className={`flex items-center justify-between border rounded-lg py-2 px-4 ${
                    isTentChecked ? "bg-green-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="ml-2 text-gray-800 mr-8 uppercase font-bold">
                    Tent
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600"
                    style={{
                      marginTop: "1px", // Adjust vertical alignment if necessary
                    }}
                    checked={isTentChecked}
                    onChange={() => handleCheckboxChange("tent")}
                  />
                </label>

                <label
                  className={`flex items-center justify-between border rounded-lg py-2 px-4 ${
                    isCateringChecked ? "bg-green-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="ml-2 text-gray-800 mr-8 uppercase font-bold">
                    catering
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600"
                    style={{
                      marginTop: "1px", // Adjust vertical alignment if necessary
                    }}
                    value="catering"
                    checked={isCateringChecked}
                    onChange={() => handleCheckboxChange("catering")}
                  />
                </label>
                <label
                  className={`flex items-center justify-between border rounded-lg py-2 px-4 ${
                    isLightChecked ? "bg-green-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="ml-2 text-gray-800 mr-8 uppercase font-bold">
                    Light
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600"
                    style={{
                      marginTop: "1px", // Adjust vertical alignment if necessary
                    }}
                    value="light"
                    checked={isLightChecked}
                    onChange={() => handleCheckboxChange("light")}
                  />
                </label>

                <label
                  className={`flex items-center justify-between border rounded-lg py-2 px-4 ${
                    isBistarChecked ? "bg-green-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="ml-2 text-gray-800 mr-8 uppercase font-bold">
                    Bistar
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600"
                    style={{
                      marginTop: "1px", // Adjust vertical alignment if necessary
                    }}
                    value="bistar"
                    checked={isBistarChecked}
                    onChange={() => handleCheckboxChange("bistar")}
                  />
                </label>
              </div>
            </>
          )}
          {step === 3 && isNextClicked && (
            <>
              {checkedItems.includes("tent") ? (
                <>
                  <div className="flex-row  text-lg font-bold text-center bg-zinc-400 ">
                    Tent Order Details{" "}
                  </div>
                  <div className=" mt-4 max-w-md mx-auto ">
                    {/* chair div  */}
                    <div className="mt-2 flex flex-row justify-stretch gap-7">
                      <label htmlFor="met" className="">
                        Chair:
                      </label>
                      <select
                        id="chair"
                        name="chair"
                      
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Different type of chairs</option>
                        <option value="Normal Chair"> Normal Chair </option>
                        <option value="High Back chair">
                          High Back chair{" "}
                        </option>
                      </select>
                      <input
                        type="number"
                        id="chairCount"
                        name="chairCount"
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* mat div  */}
                    <div className="mt-2 flex flex-row justify-stretch gap-7">
                      <label htmlFor="mat" className="">
                        Mats:
                      </label>
                      <select
                        id="mat"
                        name="mat"
                        // onChange={(e) => {
                        //   setMats(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Different Color Mat</option>
                        <option value="Green mat">Green mat </option>
                        <option value="Black mat">Black mat </option>
                        <option value="Red mat">Red mat </option>
                        <option value="Golden mat">Golden mat </option>
                      </select>
                      <input
                        type="number"
                        id="metCount"
                        name="metCount"
                        // onChange={(e) => handleChange(mats, e.target.value)}
                        style={{ display: "none" }}
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* couter div */}
                    <div className="mt-2 flex flex-row justify-stretch gap-2">
                      <label htmlFor="met" className="">
                        Counter:
                      </label>
                      <select
                        id="counter"
                        name="counter"
                        // onChange={(e) => {
                        //   setCounters("counter", e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Type of Counter</option>
                        <option value="Counter">Counter</option>
                      </select>

                      <input
                        type="number"
                        id="counterCount"
                        name="counterCount"
                        // onChange={(e) => handleChange(counters, e.target.value)}
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    {/* galiche div  */}
                    <div className="mt-2 flex flex-row justify-stretch gap-3">
                      <label htmlFor="galiche" className="">
                        Galiche:
                      </label>
                      <select
                        id="galiche"
                        name="galiche"
                        // onChange={(e) => {
                        //   setGaliche(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Type of galiche</option>
                        <option value="galiche">galiche</option>
                      </select>
                      <input
                        type="number"
                        id="galicheCount"
                        name="galicheCount"
                        // onChange={(e) => handleChange(galiche, e.target.value)}
                        style={{ display: "none" }}
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <h1 className="mt-2  font-bold"> All Type of tables </h1>

                    {/* Table div */}
                    <div className="mt-2 flex flex-row justify-stretch gap-2">
                      <label htmlFor="Table" className="">
                        Normal Table:
                      </label>
                      <select
                        id="table"
                        name="table"
                        // onChange={(e) => {
                        //   setNormalTable(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">select</option>
                        <option value="Normal Table">Normal Table</option>
                      </select>

                      <input
                        type="number"
                        id="normalTableCount"
                        name="normalTableCount"
                        // onChange={(e) =>
                        //   handleChange(normalTable, e.target.value)
                        // }
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    {/* Standing Table */}
                    <div className="mt-2 flex flex-row justify-stretch gap-2">
                      <label htmlFor="Table" className="">
                        Standing Table:
                      </label>
                      <select
                        id="StandingTable"
                        name="StandingTable"
                        // onChange={(e) => {
                        //   setStandingTable(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">select</option>
                        <option value="Standing Table">Standing Table</option>
                      </select>

                      <input
                        type="number"
                        id="standingTableCount"
                        name="standingTableCount"
                        // onChange={(e) =>
                        //   handleChange(standingTable, e.target.value)
                        // }
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    {/* rounded */}
                    <div className="mt-2 flex flex-row justify-stretch gap-2">
                      <label htmlFor="Table" className="">
                        Rounded Table:
                      </label>
                      <select
                        id="roundedTable"
                        name="roundedtable"
                        // onChange={(e) => {
                        //   setRoundedTable(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">select</option>
                        <option value="Rounded Table">Rounded Table</option>
                      </select>

                      <input
                        type="number"
                        id="normalTableCount"
                        name="normalTableCount"
                        // onChange={(e) =>
                        //   handleChange(roundedTable, e.target.value)
                        // }
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* parent div  */}
                  <div className=" mt-2 max-w-md mx-auto ">
                    <div className="flex justify-stretch">
                      <label htmlFor="name">Enter the Area:</label>
                      <input
                        type="text"
                        // onChange={(e) => setArea(e.target.value)}
                        placeholder="Area (optional) ex-(lxbxh)"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    {/* Beam div  */}
                    <div className="mt-4 flex flex-row justify-stretch gap-7">
                      <label htmlFor="met" className="">
                        Beam:
                      </label>
                      <select
                        id="beam"
                        name="beam"
                        // onChange={(e) => {
                        //   setBeam(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Different type of Beam</option>
                        <option value="12 feet beam "> 12 Feet Beam </option>
                        <option value="10feet beam"> 10 Feet Beam</option>
                      </select>
                      <input
                        type="number"
                        id="beamCount"
                        name="beamCount"
                        // onChange={(e) => handleChange(beam, e.target.value)}
                        style={{ display: "none" }}
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* piller  div  */}
                    <div className="mt-4 flex flex-row justify-stretch gap-7">
                      <label htmlFor="met" className="">
                        Piller:
                      </label>
                      <select
                        id="piller"
                        name="piller"
                        // onChange={(e) => {
                        //   setPillar(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Different type of piller</option>
                        <option value="12 feet pillar ">
                          {" "}
                          12 Feet piller{" "}
                        </option>
                        <option value="10 feet pillar"> 10 Feetpiller</option>
                      </select>
                      <input
                        type="number"
                        id="pillerCount"
                        name="pillerCount"
                        // onChange={(e) => handleChange(pillar, e.target.value)}
                        style={{ display: "none" }}
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* lengths  */}
                    <div className="mt-4 flex flex-row justify-stretch gap-7">
                      <label htmlFor="met" className="">
                        Length:
                      </label>
                      <select
                        id="length"
                        name="length"
                        // onChange={(e) => {
                        //   setLength(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select </option>
                        <option value="length">Lenght</option>
                      </select>
                      <input
                        type="number"
                        id="lengthCount"
                        name="lengthCount"
                        // onChange={(e) => handleChange(length, e.target.value)}
                        style={{ display: "none" }}
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Paya  */}
                    <div className="mt-4 flex flex-row justify-stretch gap-7">
                      <label htmlFor="met" className="">
                        Paya:
                      </label>
                      <select
                        id="paya"
                        name="paya"
                        // onChange={(e) => {
                        //   setPaya(e.target.value);
                        //   showCountInput(e.target);
                        // }}
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select </option>
                        <option value="paya">Paya</option>
                      </select>
                      <input
                        type="number"
                        id="PayaCount"
                        name="payaCount"
                        // onChange={(e) => handleChange(paya, e.target.value)}
                        style={{ display: "none" }}
                        placeholder="Count"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Add similar divs for other fields */}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-700">
                  You haven't selected tent Please consider selecting these
                  items to continue.
                </p>
              )}
            </>
          )}

          {step === 4 && isNextClicked && (
            <>
              {checkedItems.includes("catering") ? (
                <>
                  {/* parent div  */}
                  <div className=" mt-2  mx-auto ">
                    <div className="flex-row  text-lg font-bold text-center bg-zinc-400 ">
                      {" "}
                      Cataring Details{" "}
                    </div>
                    <CateringOrder />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div> pls skip this </div>
                </>
              )}
            </>
          )}

          {step === 5 && isNextClicked && (
            // light related model data
            <>
              {checkedItems.includes("light") ? (
                <>
                  <div className="flex-row  text-lg font-bold text-center bg-zinc-400 uppercase">
                    Light ordars
                  </div>
                  <LightOrder />
                </>
              ) : (
                <div> Skip this </div>
              )}
            </>
          )}

          {step === 6 && isNextClicked && (
            <>
              {checkedItems.includes("bistar") && (
                <>
                  {" "}
                  <BisterOrder />{" "}
                </>
              )}
            </>
          )}
          {/* buttons  */}
          <div className="mt-4 mb-3 ml-[8rem] flex justify-between mr-[8rem]">
            {step !== 1 && (
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Preview
              </button>
            )}

            {step !== 6 && (
              <button
                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                onClick={nextPageHandler}
              >
                Save & Next
              </button>
            )}
            {step === 6 && (
              <button
                className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                onClick={handleSubmitButton}
              >
                Submit
              </button>
            )}
          </div>
        </div>

        {/* Additional content of your modal */}
      </div>
    </>
  );
};

export default CreateAllOrders;
