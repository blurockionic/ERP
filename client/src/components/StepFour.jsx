import React, { useState } from "react";

const StepFour = ({ nextStep }) => {
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

  const handleNext = () => {
    // Validation logic can be added here
    nextStep();
  };
  return (
    <>
      <div className="p-2 mt-2 ">
        <div className="grid grid-cols-2 gap-4 px-3 mt-2">
          <div className=" flex flex-row justify-stretch gap-7">
            <label
              htmlFor="ladiWhite"
              className="mr-2 font-medium text-gray-700"
            >
              Ladi White
            </label>
            <select
              id="ladiWhite"
              name="ladiWhite"
              onChange={(e) => {
                handleChange("ladiWhiteCount", e.target.value);
                showCountInput(e.target);
              }}
              className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="ladiWhite">White Ladi</option>
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

          <div className=" flex flex-row justify-stretch gap-7">
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

          <div className=" flex flex-row justify-stretch gap-7">
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
              <option value="ladiWhite">Ladi Violate </option>
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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

          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
              <option value="jhumar">Jhumar </option>
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
          <div className=" flex flex-row justify-stretch gap-7">
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
              <option value="ac">Jhumar </option>
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
          <div className=" flex flex-row justify-stretch gap-7">
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
          <div className=" flex flex-row justify-stretch gap-7">
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
              className="w-full  px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
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
              className="w-full  px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <button onClick={handleNext} className="mx-6 mb-40">
        Next
      </button>
    </>
  );
};

export default StepFour;
