import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TentOrder = ({ setShowModel }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  // items  change handler
  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedItems([...selectedItems, value]);
      setItemCounts({ ...itemCounts, [value]: 1 }); // Set default count to 1
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== value));
      const { [value]: removedItem, ...newCounts } = itemCounts;
      setItemCounts(newCounts);
    }
  };

  const handleCountChange = (e, item) => {
    const { value } = e.target;
    setItemCounts({ ...itemCounts, [item]: parseInt(value) });
  };

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
    setSelectedDateTime(moment);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 2);
    }
  };

  const [fieldCounts, setFieldCounts] = useState({});

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
    if (field === "counterCount" && value < 0) {
      // If count is negative, set it to 0
      value = 0;
    }
    setFieldCounts({ ...fieldCounts, [field]: value });
  };

  return (
    <>
      {" "}
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="   bg-white rounded-sm w-[50%] p-2 overflow-y-auto">
          {/* data fields  */}

          <div className="  border-b-2 flex w-full  justify-between p-2 rounded font-bold text-xl text-black">
            <div className=" ">
              <button className=" text-back font-bold rounded-sm">
                <ArrowBackIcon />
              </button>
            </div>
            <span>Tent Order </span>

            <div className=" ">
              <button
                className=" text-back font-bold rounded-sm"
                onClick={() => setShowModel(false)}
              >
                <CloseIcon />
              </button>
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
                <div className="font-bold text-center text-lg uppercase border-b-2 ">
                  Adress
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
                    value={selectedDateTime}
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
                <h2 className="text-xl font-bold  text-center border-b">
                  Tent Details{" "}
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
                        handleChange("chair", e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Different type of chairs</option>
                      <option value="chairnormal"> Normal Chair </option>
                      <option value="chairhighBack">High Back chair </option>
                    </select>
                    <input
                      type="number"
                      id="chairCount"
                      name="chairCount"
                      style={{ display: "none" }}
                      placeholder="Count"
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* met div  */}
                  <div className="mt-2 flex flex-row justify-stretch gap-7">
                    <label htmlFor="met" className="">
                      Mets:
                    </label>
                    <select
                      id="met"
                      name="met"
                      onChange={(e) => {
                        handleChange("met", e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Different Color Met</option>
                      <option value="greenmet">Green met </option>
                      <option value="blackmet">Black met </option>
                      <option value="redmet">Red met </option>
                      <option value="Goldenmet">Golden met </option>
                    </select>
                    <input
                      type="number"
                      id="metCount"
                      name="metCount"
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
                        handleChange("counter", e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Type of Counter</option>
                      <option value="counter">Counter</option>
                    </select>

                    <input
                      type="number"
                      id="counterCount"
                      name="counterCount"
                      value={fieldCounts.counterCount || ""}
                      onChange={(e) =>
                        handleChange("counterCount", parseInt(e.target.value))
                      }
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
                        handleChange("galiche", e.target.value);
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

          {/* step 3 inputs fields  */}
          {step === 3 && (
            <>
              <div>
                <h2 className="text-xl font-bold  text-center border-b">
                  Tent Details{" "}
                </h2>
                {/* parent div  */}
                <div className=" mt-2 max-w-md mx-auto ">
                  <div className="flex justify-stretch">
                    <label htmlFor="name">Enter the Area:</label>
                    <input
                      type="text"
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
                        handleChange("beam", e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Different type of Beam</option>
                      <option value="12feet "> 12 Feet Beam </option>
                      <option value="10feet"> 10 Feet Beam</option>
                    </select>
                    <input
                      type="number"
                      id="beamCount"
                      name="beamCount"
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
                        handleChange("piller", e.target.value);
                        showCountInput(e.target);
                      }}
                      className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Different type of piller</option>
                      <option value="12feet "> 12 Feet piller </option>
                      <option value="10feet"> 10 Feetpiller</option>
                    </select>
                    <input
                      type="number"
                      id="pillerCount"
                      name="pillerCount"
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
                <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md">
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
