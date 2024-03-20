import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";
import axios from "axios";
import config from "../../../config/config";
const TentOrder = ({ setShowModel }) => {
  const [step, setStep] = useState(1);

  const [fieldCounts, setFieldCounts] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [chair, setChair] = useState("");
  const [mats, setMats] = useState("");
  const [counters, setCounters] = useState("");
  const [galiche, setGaliche] = useState("");
  const [normalTable, setNormalTable] = useState("");
  const [standingTable, setStandingTable] = useState("");
  const [roundedTable, setRoundedTable] = useState("");

  const [beam, setBeam] = useState("");
  const [area, setArea] = useState("");
  const [pillar, setPillar] = useState("");
  const [length, setLength] = useState("");
  const [paya, setPaya] = useState("");

  const formattedData = {};
  let  orderedTentItemName = []
  let orderedTentItemCount = []

  useEffect(() => {
    for (const key in fieldCounts) {
      if (Object.hasOwnProperty.call(fieldCounts, key)) {
        const value = fieldCounts[key];
        formattedData[key.replace(/ /g, "_")] = parseInt(value);
        orderedTentItemCount.push(value)
        orderedTentItemName.push(key)
      }
    }
    
    console.log(orderedTentItemCount)
    console.log(orderedTentItemName)

    // console.log(JSON.stringify(formattedData, null, 2));
    setIsLoaded(false);
  }, [isLoaded, fieldCounts]);

  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };

  const handleChangeAlternateNumber = (e) => {
    const { value } = e.target;
    setAlternateNumber(value);
  };

  // date and time handle function
  const handleDateTimeChange = (moment) => {
    setDateAndTime(moment);
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
      if (step - 1 === 0) {
        const orderType = "Tent";
        try {
          const response = await axios.post(
            `${config.apiUrl}/bistar/new`,
            {
              name,
              address,
              phoneNumber,
              alternateNumber,
              otherDetails,
              dateAndTime,
              orderType,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          const { success, message, id } = response.data;

          if (success) {
            localStorage.setItem("bistaerId", id);
            alert(message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else if (step - 1 === 1) {
        console.log(fieldCounts);
        //update the details
        const bistaerId = localStorage.getItem("bistaerId");
        try {
          const response = await axios.put(
            `${config.apiUrl}/bistar/update/${bistaerId}`,

            {
              orderedTentItemCount, orderedTentItemName
            },

            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          const { success, message } = response.data;
          console.log(response);

          if (success) {
            alert(message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fieldCounts);
    // You can perform further actions here, like submitting data to a backend
  };

  const showCountInput = (select) => {
    const countInput = select.parentElement.querySelector(
      'input[type="number"]'
    );
    if (countInput) {
      // Check if countInput is not null
      if (select.value !== "") {
        countInput.style.display = "block";
      } else {
        countInput.style.display = "none";
      }
    } else {
      console.error("Count input element not found.");
    }
  };

  const handleChange = (field, value) => {
    setChair(field);

    if (field === "counterCount" && value < 0) {
      // If count is negative, set it to 0
      value = 0;
    }
    setFieldCounts({ ...fieldCounts, [field]: value });
    setIsLoaded(true);
  };

  const backStepHandler = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  //handle on submit
  const handleOnsubmit = async () => {
    //update the details
    const bistaerId = localStorage.getItem("bistaerId");
    try {
      const response = await axios.put(
        `${config.apiUrl}/bistar/update/${bistaerId}`,
        {
          orderedTentItemCount, orderedTentItemName
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        alert(message);
        setShowModel(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      {" "}
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="   bg-white rounded-sm w-[50%] p-2 overflow-y-auto">
          {/* data fields  */}
          {/* title information */}
          <div className="  border-b-2 flex w-full  justify-between p-2 rounded font-bold text-xl text-black">
            <div className=" ">
              <Tooltip title="Back " placement="bottom" arrow>
                <button
                  className=" text-back font-bold rounded-sm"
                  onClick={backStepHandler}
                >
                  <ArrowBackIcon />
                </button>
              </Tooltip>
            </div>
            <span>Tent Order </span>

            <div className=" ">
              <Tooltip title="Cancel" placement="bottom" arrow>
                <button
                  className=" text-back font-bold rounded-sm"
                  onClick={() => setShowModel(false)}
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          {/* upper Design div */}
          <div className="flex flex-row justify-between mb-3 p-2">
            <span
              className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2 ml-4
          ${step === 1 ? "text-green-800 bg-slate-300" : "text-gray-500"}`}
            >
              1
            </span>
            <span
              className={` text-gray-500 
           ${
             step >= 2 ? "opacity-100 text-green-600 font-bold " : "opacity-50"
           }`}
            >
              .................................................
            </span>
            <span
              className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2
           ${step === 2 ? "text-green-800 " : "text-gray-500"}`}
            >
              2
            </span>
            <span
              className={` text-gray-500 
           ${
             step > 2 ? "opacity-100 text-green-600 font-bold " : "opacity-50"
           }`}
            >
              .................................................
            </span>
            <span
              className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2 mr-4
           ${step === 3 ? "text-green-800" : "text-gray-500"}`}
            >
              3
            </span>
          </div>

          {/* step 1 div input */}
          <div className="px-4">
            {step === 1 && (
              <>
                {" "}
                <div className="font-bold bg-slate-200 pl-2  text-lg uppercase border-b-2 ">
                  Address
                </div>
                <div className="relative mt-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor=""
                  >
                    Customer Name{" "}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="customer Name"
                    placeholder="Enter name"
                    className="w-full px-4 py-2 pl-4 border rounded-md"
                  />
                </div>
                <div className="relative mt-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor=""
                  >
                    Enter address{" "}
                  </label>
                  <input
                    type="text"
                    name="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address..."
                    className="w-full px-4 py-2 pl-4 border rounded-md"
                  />
                </div>
                <div className="mt-4">
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
                    value={phoneNumber}
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
                    value={alternateNumber}
                    onChange={handleChangeAlternateNumber}
                    placeholder="Enter alternate number (optional)"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="mt-4 ">
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
                <div className="relative mt-4">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700"
                  >
                    Other Details{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address..."
                    value={otherDetails}
                    onChange={(e) => setOtherDetails(e.target.value)}
                    className="w-full px-4 py-2 pl-4 border rounded-md"
                  />
                </div>
              </>
            )}
          </div>
          {/* step 2 input fields  */}
          {step === 2 && (
            <>
              <div>
                <h2 className="text-xl font-bold bg-slate-200 text-center border-b">
                  Items Details{" "}
                </h2>
                {/* parent div  */}
                <div className=" mt-2 max-w-md mx-auto ">
                  {/* chair div  */}
                  <div className="mt-2 flex flex-row justify-stretch gap-7">
                    <label htmlFor="met" className="">
                      Chair:
                    </label>
                    <select
                      id="chair"
                      name="chair"
                      onChange={(e) => {
                        setChair(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Different type of chairs</option>
                      <option value="Normal Chair"> Normal Chair </option>
                      <option value="High Back chair">High Back chair </option>
                    </select>
                    <input
                      type="number"
                      id="chairCount"
                      name="chairCount"
                      onChange={(e) => handleChange(chair, e.target.value)}
                      style={{ display: "none" }}
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
                      onChange={(e) => {
                        setMats(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Different Color Mat</option>
                      <option value="Green mat">Green mat </option>
                      <option value="Black mat">Black mat </option>
                      <option value="Red mat">Red mat </option>
                      <option value="Goldenmet">Golden mat </option>
                    </select>
                    <input
                      type="number"
                      id="metCount"
                      name="metCount"
                      onChange={(e) => handleChange(mats, e.target.value)}
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
                      onChange={(e) => {
                        setCounters("counter", e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Type of Counter</option>
                      <option value="Counter">Counter</option>
                    </select>

                    <input
                      type="number"
                      id="counterCount"
                      name="counterCount"
                      onChange={(e) => handleChange(counters, e.target.value)}
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
                      onChange={(e) => {
                        setGaliche(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Type of galiche</option>
                      <option value="galiche">galiche</option>
                    </select>
                    <input
                      type="number"
                      id="galicheCount"
                      name="galicheCount"
                      onChange={(e) => handleChange(galiche, e.target.value)}
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
                      onChange={(e) => {
                        setNormalTable(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">select</option>
                      <option value="Normal Table">Normal Table</option>
                    </select>

                    <input
                      type="number"
                      id="normalTableCount"
                      name="normalTableCount"
                      onChange={(e) =>
                        handleChange(normalTable, e.target.value)
                      }
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
                      onChange={(e) => {
                        setStandingTable(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">select</option>
                      <option value="Standing Table">Standing Table</option>
                    </select>

                    <input
                      type="number"
                      id="standingTableCount"
                      name="standingTableCount"
                      onChange={(e) =>
                        handleChange(standingTable, e.target.value)
                      }
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
                      onChange={(e) => {
                        setRoundedTable(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">select</option>
                      <option value="Rounded Table">Rounded Table</option>
                    </select>

                    <input
                      type="number"
                      id="normalTableCount"
                      name="normalTableCount"
                      onChange={(e) =>
                        handleChange(roundedTable, e.target.value)
                      }
                      placeholder="Count"
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Add similar divs for other fields */}
              </div>
            </>
          )}

          {/* step 3 inputs fields  */}
          {step === 3 && (
            <>
              <div>
                <h2 className="text-xl font-bold  text-end border-b mr-2 bg-slate-200">
                  Tent Other Details{" "}
                </h2>
                {/* parent div  */}
                <div className=" mt-2 max-w-md mx-auto ">
                  <div className="flex justify-stretch">
                    <label htmlFor="name">Enter the Area:</label>
                    <input
                      type="text"
                      onChange={(e) => setArea(e.target.value)}
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
                      onChange={(e) => {
                        setBeam(e.target.value);
                        showCountInput(e.target);
                      }}
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
                      onChange={(e) => handleChange(beam, e.target.value)}
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
                      onChange={(e) => {
                        setPillar(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Different type of piller</option>
                      <option value="12 feet pillar "> 12 Feet piller </option>
                      <option value="10 feet pillar"> 10 Feetpiller</option>
                    </select>
                    <input
                      type="number"
                      id="pillerCount"
                      name="pillerCount"
                      onChange={(e) => handleChange(pillar, e.target.value)}
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
                      onChange={(e) => {
                        setLength(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select </option>
                      <option value="length">Lenght</option>
                    </select>
                    <input
                      type="number"
                      id="lengthCount"
                      name="lengthCount"
                      onChange={(e) => handleChange(length, e.target.value)}
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
                      onChange={(e) => {
                        setPaya(e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select </option>
                      <option value="paya">Paya</option>
                    </select>
                    <input
                      type="number"
                      id="PayaCount"
                      name="payaCount"
                      onChange={(e) => handleChange(paya, e.target.value)}
                      style={{ display: "none" }}
                      placeholder="Count"
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Add similar divs for other fields */}
                </div>
              </div>
            </>
          )}

          <div className="mt-4 mb-3 mr-4 flex justify-end ">
            {step !== 1 && step === 3 && (
              <div className="mb-8">
                <button
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md mr-4"
                  onClick={handlePrevious}
                >
                  Preview
                </button>
                <button
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-md"
                  onClick={handleOnsubmit}
                >
                  Submit
                </button>
              </div>
            )}

            {step !== 3 && (
              <button
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-md"
                onClick={handleNext}
              >
                Save & Next
              </button>
            )}
          </div>
        </div>

        {/* Additional content of your modal */}
      </div>
    </>
  );
};

export default TentOrder;
