import React, { useState } from "react";
import axios from "axios";
import config from "../config/config";
const StepFour = ({ nextStep, lightItem }) => {
  let [lightOrderedItemsSelected, setLightOrderedItemsSelected] = useState([]);

  let lightOrderedItem = [];
  let lightOrderedCount = [];

  const [ladiWhite, setLadiWhite] = useState("");
  const [ladiVoilate, setLadiVoilate] = useState("");
  const [ladiBlue, setLadiBlue] = useState("");
  const [ladiPink, setLadiPink] = useState("");
  const [ladiYellow, setLadiYellow] = useState("");
  const [ladiRed, setLadiRed] = useState("");
  const [fan, setFan] = useState("");
  const [cooler, setCooler] = useState("");
  const [whiteLED, setWhiteLED] = useState("");
  const [coloredLED, setColoredLED] = useState("");
  const [djLight, setDjLight] = useState("");
  const [extension, setExtention] = useState("");
  const [jhumar, setJhumar] = useState("");
  const [airConditioner, setAirConditioner] = useState("");
  const [heater, setHeater] = useState("");
  const [generatorSet, setGeneratorSet] = useState("");

  const handleChange = (value, count) => {
    // Convert count to a number
    const countValue = parseInt(count);

    // Check if count is a valid number and greater than 0
    if (!isNaN(countValue) && countValue > 0) {
      // Check if the type already exists in furniture array
      const existingFurnitureIndex = lightOrderedItemsSelected.findIndex(
        (item) => item.value === value
      );
      if (existingFurnitureIndex !== -1) {
        // If type exists, update its count
        const updatedFurniture = [...lightOrderedItemsSelected];
        updatedFurniture[existingFurnitureIndex] = {
          value: value,
          count: countValue,
        };
        setLightOrderedItemsSelected(updatedFurniture);
      } else {
        // If type doesn't exist, add it to the furniture array
        setLightOrderedItemsSelected([
          ...lightOrderedItemsSelected,
          { value: value, count: countValue },
        ]);
      }
    }
  };

  console.log(lightOrderedItemsSelected);
  lightOrderedItemsSelected.forEach((item) => {
    lightOrderedItem.push(item.value);
    lightOrderedCount.push(item.count);
  });

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

  const handleNext = async () => {
    // Validation logic can be added here
    const lights = {
      ladiWhite,
      ladiBlue,
      ladiVoilate,
      ladiPink,
      ladiRed,
      ladiYellow,
    };

    const customerId = await localStorage.getItem("customerId");

    try {
      const response = await axios.post(
        `${config.apiUrl}/light/new`,
        {
          customerId,
          lights,
          fan,
          cooler,
          whiteLED,
          coloredLED,
          djLight,
          extension,
          jhumar,
          airConditioner,
          heater,
          generatorSet,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      throw error;
    }

    nextStep();
  };
  return (
    <>
      <div className=" h-screen  border shadow-2xl bg-gray-50">
        <div className="bg-white mx-20 mt-2 h-full overflow-y-scroll">
          <div className="uppercase font-bold text-start p-2 border-b">
            {" "}
            Light details{" "}
          </div>
          <div className=" mt-3 rounded  grid xl:grid-cols-2 gap-4 mx-auto">
            {/* ladi white */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="chair"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                White
              </span>
              <select
                id="ladiWhite"
                name="ladiWhite"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiWhite">White Ladi</option>
              </select>
              <input
                type="number"
                id="ladiWhiteCount"
                name="ladiWhiteCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setLadiWhite(count);
                  handleChange(ladiWhite, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* ladi blue */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="chair"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                {" "}
                Blue
              </span>
              <select
                id="ladiBlue"
                name="ladiBlue"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiBlue"> Ladi </option>
              </select>
              <input
                type="number"
                id="ladiBlueCount"
                name="ladiBlueCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setLadiBlue(e.target.value);
                  handleChange(ladiBlue, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* ladi violate */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="ladiviolate"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Violate
              </span>
              <select
                id="ladiViolate"
                name="ladiViolate"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiWhite">Ladi Violate </option>
              </select>
              <input
                type="number"
                id="ladiWhiteCount"
                name="ladiWhiteCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setLadiVoilate(e.target.value);
                  handleChange(ladiVoilate, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/*ladi pink  */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="ladipink"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Pink
              </span>
              <select
                id="ladiPink"
                name="ladiPink"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiPink">Pink </option>
              </select>
              <input
                type="number"
                id="ladiPinkCount"
                name="ladiPinkCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setLadiPink(e.target.value);
                  handleChange(ladiPink, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* yellow LED */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="ladiyellow"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Yellow
              </span>
              <select
                id="ladiYellow"
                name="ladiyellow"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiYellow"> yellow Ladi </option>
              </select>
              <input
                type="number"
                id="ladiYellowCount"
                name="ladiYellowCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setLadiYellow(e.target.value);
                  handleChange(ladiYellow, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* ladi red*/}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="ladired"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Red
              </span>
              <select
                id="ladiRed"
                name="ladiRed"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="ladiRed"> Red Ladi </option>
              </select>
              <input
                type="number"
                id="ladiRedCount"
                name="ladiRedCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setLadiRed(e.target.value);
                  handleChange(ladiRed, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* cooler */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="cooler"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Cooler
              </span>
              <select
                id="cooler"
                name="cooler"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="fan">Cooler</option>
              </select>
              <input
                type="number"
                id="coolerCount"
                name="coolerCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setCooler(e.target.value);
                  handleChange(cooler, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* white LED */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="whitelite"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                White LED
              </span>
              <select
                id="LED"
                name="LED"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="led">LED </option>
              </select>
              <input
                type="number"
                id="ledCount"
                name="ledCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setWhiteLED(e.target.value);
                  handleChange(whiteLED, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* colord LED */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="coloredled"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                colord LED
              </span>
              <select
                id="LED"
                name="LED"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="led">Colored LED </option>
              </select>
              <input
                type="number"
                id="ledCount"
                name="ledCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setColoredLED(e.target.value);
                  handleChange(coloredLED, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* DJ Light */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="Djlight"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                DJ Light
              </span>
              <select
                id="djlight"
                name="djlight"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="djLight">Dj Light </option>
              </select>
              <input
                type="number"
                id="djLihtgCount"
                name="djLihtgCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setDjLight(e.target.value);
                  handleChange(djLight, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Extension Board */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="mainwire"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Main wire
              </span>
              <select
                id="extension"
                name="extension"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="extension">Extention Board </option>
              </select>
              <input
                type="number"
                id="extensionCount"
                name="extensionCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setExtention(e.target.value);

                  handleChange(extension, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Jhumar  */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="ladired"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Jhummar
              </span>
              <select
                id="jhumar"
                name="jhumar"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="jhumar">Jhumar </option>
              </select>
              <input
                type="number"
                id="jhumarCount"
                name="jhumarCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setJhumar(e.target.value);

                  handleChange(jhumar, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* fan */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="ladired"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                fan
              </span>
              <select
                id="fan"
                name="fan"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="fan"> Standing Fan </option>
              </select>
              <input
                type="number"
                id="fanCount"
                name="fanCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setFan(e.target.value);
                  handleChange(fan, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* AC */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="Ac"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                AC
              </span>
              <select
                id="ac"
                name="ac"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
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
                onChange={(e) => {
                  const count = e.target.value;
                  setAirConditioner(e.target.value);

                  handleChange(airConditioner, count);
                }}
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* heater*/}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="heater"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Heater
              </span>
              <select
                id="heater"
                name="heater"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="heater">Heater</option>
              </select>
              <input
                type="number"
                id="heaterCount"
                name="heaterCount"
                style={{ display: "none" }}
                onChange={(e) => {
                  const count = e.target.value;
                  setHeater(e.target.value);

                  handleChange(heater, count);
                }}
                placeholder="Count"
                className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Genarater set   */}
            <div className="mt-2 mx-auto flex justify-around gap-4">
              <span
                htmlFor="ladired"
                className=" w-[5rem] text-start font-medium text-gray-700"
              >
                Genarater
              </span>
              <select
                id="generator"
                name="generator"
                onChange={(e) => {
                  showCountInput(e.target);
                }}
                className="w-[15rem]  px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
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
                onChange={(e) => {
                  const count = e.target.value;
                  setGeneratorSet(e.target.value);
                  handleChange(generatorSet, count);
                }}
                placeholder="Count"
                className="w-[10rem]  px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="h-full mt-8 text-center">
            <button
              onClick={handleNext}
              className="mb-2 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Save & Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepFour;
