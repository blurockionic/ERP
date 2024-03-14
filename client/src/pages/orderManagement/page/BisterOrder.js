import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BisterOrder = ({ setShowModel }) => {
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

  return (
    <>
      {" "}
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="   bg-white rounded-sm w-[50%] p-2 overflow-y-auto">
          {/* data fields  */}

          <div className="  border-b-2 flex w-full bg-red-500 justify-between p-2 rounded font-bold text-xl text-white">
            <div className=" ">
              <button className=" text-back font-bold rounded-sm">
                <ArrowBackIcon />
              </button>
            </div>
            <span> Bistar Order</span>

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
                <div className="font-bold text-center text-lg uppercase border-b-2 ">
                  Adress
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
              <div className=" flex flex-row uppercase justify-center font-bold ">
                {" "}
                Select Items
              </div>
              <div>
                <div className="grid grid-cols-5 gap-4 text-xt font-bold mt-2 p-2">
                  <label className="flex justify-center bg-rose-500 text-cente py-2 rounded hover:bg-rose-700">
                    <input
                      type="checkbox"
                      style={{
                        marginTop: "4px",
                        marginLeft: "4px",
                        paddingTop: "2px",
                        width: "16px", // Set the width
                        height: "16px", // Set the height
                        border: "2px solid #4F46E5",
                      }}
                      value="pillow"
                      onChange={handleItemChange}
                      className="mr-2"
                    />
                    Pillow
                  </label>
                  <label className="flex justify-center bg-yellow-400 text-cente py-2 rounded hover:bg-yellow-600">
                    <input
                      type="checkbox"
                      style={{
                        marginTop: "4px",
                        marginLeft: "4px",
                        paddingTop: "2px",
                        width: "16px", // Set the width
                        height: "16px", // Set the height
                        border: "2px solid #4F46E5",
                      }}
                      value="bed"
                      onChange={handleItemChange}
                      className="mr-2"
                    />
                    Bed
                  </label>
                  <label className="flex justify-center bg-rose-100 text-cente py-2 rounded hover:bg-rose-300">
                    <input
                      type="checkbox"
                      style={{
                        marginTop: "4px",
                        marginLeft: "4px",
                        paddingTop: "2px",
                        width: "16px", // Set the width
                        height: "16px", // Set the height
                        border: "2px solid #4F46E5",
                      }}
                      value="chadar"
                      onChange={handleItemChange}
                      className="mr-2"
                    />
                    Chadar
                  </label>
                  <label className="flex justify-center bg-lime-500 text-cente py-2 rounded hover:bg-lime-700">
                    <input
                      type="checkbox"
                      style={{
                        marginTop: "4px",
                        marginLeft: "4px",
                        paddingTop: "2px",
                        width: "16px", // Set the width
                        height: "16px", // Set the height
                        border: "2px solid #4F46E5",
                      }}
                      value="bedsheet"
                      onChange={handleItemChange}
                      className="mr-2"
                    />
                    Bed Sheet
                  </label>
                  <label className="flex justify-center bg-teal-500 text-cente py-2 rounded hover:bg-teal-700">
                    <input
                      type="checkbox"
                      style={{
                        marginTop: "4px",
                        marginLeft: "4px",
                        paddingTop: "2px",
                        width: "16px", // Set the width
                        height: "16px", // Set the height
                        border: "2px solid #4F46E5",
                      }}
                      value="blanket"
                      onChange={handleItemChange}
                      className="mr-2"
                    />
                    Blanket
                  </label>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-8 mb-4">Item Counts</h2>
              <div className="flex flex-row ">
                {selectedItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center mb-4 font-semibold"
                  >
                    <span className="mr-2">{item}: </span>
                    <input
                      type="number"
                      value={itemCounts[item] || ""}
                      onChange={(e) => handleCountChange(e, item)}
                      className="w-20 px-2 py-1 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* step 3 inputs fields  */}
          {step === 3 && (
            <>
              <div>jia shree ram </div>
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
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Additional content of your modal */}
      </div>
    </>
  );
};

export default BisterOrder;
