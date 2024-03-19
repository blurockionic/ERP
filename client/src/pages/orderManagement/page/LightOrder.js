import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Datetime from "react-datetime";

const LightOrder = ({ setShowModel }) => {
  //usestate for bistar order
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const [fieldCounts, setFieldCounts] = useState({});

  const handleChange = (field, value) => {
    if (field === "ladiWhiteCount" && value < 0) {
      // If count is negative, set it to 0
      value = 0;
    }
    setFieldCounts({ ...fieldCounts, [field]: value });
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

  return (
    <>
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm ">
        <div className="bg-white rounded-sm w-[50%] h-[90%] p-2 overflow-y-scroll ">
          <div className="  border-b-2 flex w-full  justify-between p-2 rounded font-bold text-xl text-black">
            <div className=" ">
              <Tooltip title="Back" placement="bottom" arrow>
                <button className=" text-back font-bold rounded-sm">
                  <ArrowBackIcon />
                </button>
              </Tooltip>
            </div>
            <span> Manage Lights Order </span>
            {/* close button */}
            <div className=" ">
              <Tooltip title="cancel" placement="bottom" arrow>
                <button
                  className=" text-back font-bold rounded-sm"
                  onClick={() => setShowModel(false)}
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          {/* contect Details  */}
          <h2 className="font-bold mt-3 bg-slate-200 ">Add Details</h2>
          <div className="grid grid-cols-2 gap-4 p-4">
            {/* Mobile number  and Alternate mobile number */}
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
                //   value={phoneNumber}
                //   onChange={handleChangePhoneNumber}
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
                //   value={alternateNumber}
                //   onChange={handleChangeAlternateNumber}
                placeholder="Enter alternate number (optional)"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              {/*Customer  name*/}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Date and time  */}
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
                  // value={dateAndTime}
                  // onChange={handleDateTimeChange}
                />
              </div>
            </div>
            {/* other Details  */}
            <div className="relative ">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Other Details{" "}
              </label>
              <input
                type="text"
                placeholder="other details....."
                className="w-full px-4 py-2 pl-4 border rounded-md"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
            </div>
            {/* Enter Address */}
            <div className="relative">
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <h2>Items Information</h2>

          <div>Type of Ladi</div>
          <div className="grid grid-cols-2 gap-4 px-3">
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Ladi White
              </label>
              <select
                id="ladiWhite"
                name="ladiWhite"
                onChange={(e) => {
                  handleChange("ladiWhiteCount", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiWhite"> White Ladi </option>
              </select>
              <input
                type="number"
                id="ladiWhiteCount"
                name="ladiWhiteCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Ladi Blue
              </label>
              <select
                id="ladiBlue"
                name="ladiBlue"
                onChange={(e) => {
                  handleChange("ladiBlue", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiBlue"> Blue Ladi </option>
              </select>
              <input
                type="number"
                id="ladiBlueCount"
                name="ladiBlueCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Ladi Violate
              </label>
              <select
                id="ladiViolate"
                name="ladiViolate"
                onChange={(e) => {
                  handleChange("ladiWhiteCount", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiWhite"> White Ladi </option>
              </select>
              <input
                type="number"
                id="ladiWhiteCount"
                name="ladiWhiteCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/*  */}
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Ladi Pink
              </label>
              <select
                id="ladiPink"
                name="ladiPink"
                onChange={(e) => {
                  handleChange("ladiPinkCount", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiPink"> Pink Ladi </option>
              </select>
              <input
                type="number"
                id="ladiPinkCount"
                name="ladiPinkCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* yellow LED */}
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Ladi yellow
              </label>
              <select
                id="ladiYellow"
                name="ladiyellow"
                onChange={(e) => {
                  handleChange("ladiYellow", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiYellow"> Pink Ladi </option>
              </select>
              <input
                type="number"
                id="ladiYellowCount"
                name="ladiYellowCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* yellow LED */}
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Ladi Red
              </label>
              <select
                id="ladiRed"
                name="ladiRed"
                onChange={(e) => {
                  handleChange("ladiRed", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiRed"> Pink Ladi </option>
              </select>
              <input
                type="number"
                id="ladiRedCount"
                name="ladiRedCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* fan */}
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Fan
              </label>
              <select
                id="fan"
                name="fan"
                onChange={(e) => {
                  handleChange("fan", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="fan"> Fan </option>
              </select>
              <input
                type="number"
                id="fanCount"
                name="fanCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* cooler */}
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Cooler
              </label>
              <select
                id="cooler"
                name="cooler"
                onChange={(e) => {
                  handleChange("cooler", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="fan">Cooler</option>
              </select>
              <input
                type="number"
                id="coolerCount"
                name="coolerCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                White LED
              </label>
              <select
                id="LED"
                name="LED"
                onChange={(e) => {
                  handleChange("led", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="led">LED </option>
              </select>
              <input
                type="number"
                id="ledCount"
                name="ledCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* white LED */}
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                Colored LED
              </label>
              <select
                id="LED"
                name="LED"
                onChange={(e) => {
                  handleChange("led", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="led">Colored LED </option>
              </select>
              <input
                type="number"
                id="ledCount"
                name="ledCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* DJ Light */}
            <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
                DJ Light
              </label>
              <select
                id="LED"
                name="LED"
                onChange={(e) => {
                  handleChange("led", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="djLight">Dj Light </option>
              </select>
              <input
                type="number"
                id="djLihtgCount"
                name="djLihtgCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

             {/* Extension Board */}
             <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
            Extension
              </label>
              <select
                id="extension"
                name="extension"
                onChange={(e) => {
                  handleChange("extension", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="extension">Extention Board </option>
              </select>
              <input
                type="number"
                id="extensionCount"
                name="extensionCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

              {/* Jhumar  */}
              <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="met" className="">
           Jhumar
              </label>
              <select
                id="jhumar"
                name="jhumar"
                onChange={(e) => {
                  handleChange("jhumar", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="jhumar">Jhumar  </option>
              </select>
              <input
                type="number"
                id="jhumarCount"
                name="jhumarCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

              {/* AC */}
              <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="ac" className="">
           AC
              </label>
              <select
                id="ac"
                name="ac"
                onChange={(e) => {
                  handleChange("ac", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ac">Jhumar  </option>
              </select>
              <input
                type="number"
                id="acCount"
                name="acCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

             {/* heater*/}
             <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="ac" className="">
          Heater 
              </label>
              <select
                id="heater"
                name="heater"
                onChange={(e) => {
                  handleChange("heater", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="heater">Heater</option>
              </select>
              <input
                type="number"
                id="heaterCount"
                name="heaterCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

              {/* Genarater set   */}
              <div className="mt-4 flex flex-row justify-stretch gap-7">
              <label htmlFor="ac" className="">
         Genarator Set
              </label>
              <select
                id="generator"
                name="generator"
                onChange={(e) => {
                  handleChange("generator", e.target.value);
                  showCountInput(e.target);
                }}
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="generator">12KV Genarator</option>
                <option value="generator">16KV Genarator</option>
              </select>
              <input
                type="number"
                id="generatorCount"
                name="generatorCount"
                style={{ display: "none" }}
                placeholder="Count"
                className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LightOrder;
