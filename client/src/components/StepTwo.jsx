import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config/config";

const StepTwo = ({ nextStep, prevStep }) => {
  let [tentOrderedItems, setTentOrderedItems] = useState([]);

  const orderedItems = [];
  const orderedItemsCount = [];

  const [chair, setChair] = useState("");
  const [mats, setMats] = useState("");
  const [counter, setCounter] = useState("");
  const [galiche, setGaliche] = useState("");
  const [normalTable, setNormalTable] = useState("");
  const [standingTable, setStandingTable] = useState("");
  const [roundedTable, setRoundedTable] = useState("");
  const [area, setArea] = useState("");
  const [beam, setBeam] = useState("");
  const [piller, setPiller] = useState("");
  const [length, setLength] = useState("");
  const [paya, setPaya] = useState("");

  const [chairCount, setChairCount] = useState("");
  const [matsCount, setMatsCount] = useState("");
  const [counterCount, setCounterCount] = useState("");
  const [galicheCount, setGalicheCount] = useState("");
  const [normalTableCount, setNormalTableCount] = useState("");
  const [standingTableCount, setStandingTableCount] = useState("");
  const [roundedTableCount, setRoundedTableCount] = useState("");
  const [areaCount, setAreaCount] = useState("");
  const [beamCount, setBeamCount] = useState("");
  const [pillerCount, setPillerCount] = useState("");
  const [lengthCount, setLengthCount] = useState("");
  const [payaCount, setPayaCount] = useState("");

  const handleNext = async () => {
    // Validation logic can be added here
    // get customer id
    const customerId = localStorage.getItem("customerId");
    try {
      const response = await axios.post(
        `${config.apiUrl}/tent/new`,
        {
          customerId,
          orderedItems,
          orderedItemsCount,
          area
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response)
    } catch (error) {
        console.log(error)
    }
    nextStep();
  };

  const handleChange = (value, count) => {
    // Convert count to a number
    const countValue = parseInt(count);

    // Check if count is a valid number and greater than 0
    if (!isNaN(countValue) && countValue > 0) {
      // Check if the type already exists in furniture array
      const existingFurnitureIndex = tentOrderedItems.findIndex(
        (item) => item.value === value
      );
      if (existingFurnitureIndex !== -1) {
        // If type exists, update its count
        const updatedFurniture = [...tentOrderedItems];
        updatedFurniture[existingFurnitureIndex] = {
          value: value,
          count: countValue,
        };
        setTentOrderedItems(updatedFurniture);
      } else {
        // If type doesn't exist, add it to the furniture array
        setTentOrderedItems([
          ...tentOrderedItems,
          { value: value, count: countValue },
        ]);
      }
    }
  };

 

  tentOrderedItems.forEach((item) => {
    orderedItems.push(item.value);
    orderedItemsCount.push(item.count);
  });

  

  return (
    <div className="overflow-hidden overflow-x-hidden w-[80%] mx-auto bg-white border shadow-2xl h-[40rem]">
      <h2 className="text-center mb-[1rem] font-extrabold text-xl">Step 2</h2>

      <div className="flex">
        <div className="mt-4 max-w-lg mx-auto ">
          {/* chair div  */}
          <div className="mt-2 flex flex-row justify-around gap-7">
            <label htmlFor="met" className="">
              Chair:
            </label>
            <select
              id="chair"
              name="chair"
              onChange={(e) => setChair(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="Normal Chair" className="text-center"> Normal Chair </option>
              <option value="High Back chair" className="text-center">High Back chair </option>
            </select>
            <input
              type="number"
              id="chairCount"
              name="chairCount"
              onChange={(e) => {
                const count = e.target.value;
                setChairCount(count);
                handleChange(chair, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>

          {/* mat div  */}
          <div className="mt-2 flex flex-row justify-around gap-7">
            <label htmlFor="mat" className="">
              Mats:
            </label>
            <select
              id="mat"
              name="mat"
              onChange={(e) => {
                setMats(e.target.value);
              }}
              className="block py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer w-[15rem]"
            >
              <option value="" className="text-center">Select</option>
              <option value="Green mat" className="text-center">Green mat </option>
              <option value="Black mat" className="text-center">Black mat </option>
              <option value="Red mat" className="text-center">Red mat </option>
              <option value="Golden mat" className="text-center">Golden mat </option>
            </select>
            <input
              type="number"
              id="metCount"
              name="metCount"
              onChange={(e) => {
                const count = e.target.value;
                setMatsCount(count);
                handleChange(mats, count);
              }}
              placeholder="Count"
              className="peer w-[15rem] h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>

          {/* couter div */}
          <div className="mt-2 flex flex-row justify-stretch gap-3">
            <label htmlFor="met" className="">
              Counter:
            </label>
            <select
              id="counter"
              name="counter"
              onChange={(e) => {
                setCounter(e.target.value);
              }}
              className="block py-2.5 mr-[1.25rem] w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="Counter" className="text-center">Counter</option>
            </select>
 
            <input
              type="number"
              id="counterCount"
              name="counterCount"
              onChange={(e) => {
                const count = e.target.value;
                setCounterCount(count);
                handleChange(counter, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>
          {/* galiche div  */}
          <div className="mt-2 flex flex-row justify-around gap-3">
            <label htmlFor="galiche" className="">
              Galiche:
            </label>
            <select
              id="galiche"
              name="galiche"
              onChange={(e) => {
                setGaliche(e.target.value);
              }}
              className="block py-2.5 mr-[1.05rem] w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="galiche" className="text-center">galiche</option>
            </select>
            <input
              type="number"
              id="galicheCount"
              name="galicheCount"
              onChange={(e) => {
                const count = e.target.value;
                setGalicheCount(count);
                handleChange(galiche, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>

          
          <h1 className="mt-[2rem] font-bold text-center"> All Types of tables </h1>
          {/* Table div */}
          <div className="mt-2 flex flex-row justify-stretch gap-7">
          
            <label htmlFor="Table" className="">
              Normal Table:
            </label>
            <select
              id="table"
              name="table"
              onChange={(e) => {
                setNormalTable(e.target.value);
              }}
              className="block py-2.5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="Normal Table" className="text-center">Normal Table</option>
            </select>

            <input
              type="number"
              id="normalTableCount"
              name="normalTableCount"
              onChange={(e) => {
                const count = e.target.value;
                setNormalTableCount(count);
                handleChange(normalTable, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>
          {/* Standing Table */}
          <div className="mt-2 flex flex-row justify-stretch gap-6">
            <label htmlFor="Table" className="">
              Standing Table:
            </label>
            <select
              id="StandingTable"
              name="StandingTable"
              onChange={(e) => {
                setStandingTable(e.target.value);
              }}
              className="block py-2.5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="Standing Table" className="text-center">Standing Table</option>
            </select>

            <input
              type="number"
              id="standingTableCount"
              name="standingTableCount"
              onChange={(e) => {
                const count = e.target.value;
                setStandingTableCount(count);
                handleChange(standingTable, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>
          {/* rounded */}
          <div className="mt-2 flex flex-row justify-stretch gap-6">
            <label htmlFor="Table" className="">
              Rounded Table:
            </label>
            <select
              id="roundedTable"
              name="roundedtable"
              onChange={(e) => {
                setRoundedTable(e.target.value);
              }}
              className="block py-2.5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="Rounded Table"className="text-center">Rounded Table</option>
            </select>

            <input
              type="number"
              id="normalTableCount"
              name="normalTableCount"
              onChange={(e) => {
                const count = e.target.value;
                setRoundedTableCount(count);
                handleChange(roundedTable, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>
        </div>

        {/* parent div  */}
        <div className=" mt-2 max-w-md mx-auto ">
          <div className="flex justify-stretch">
            <label htmlFor="name">Enter the Area:</label>
            <input
              type="text"
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area (optional) ex-(lxbxh)"
              className=" w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
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
              }}
              className="block py-2.5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="12 feet beam " className="text-center"> 12 Feet Beam </option>
              <option value="10feet beam" className="text-center"> 10 Feet Beam</option>
            </select>
            <input
              type="number"
              id="beamCount"
              name="beamCount"
              onChange={(e) => {
                const count = e.target.value;
                setBeamCount(count);
                handleChange(beam, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>

          {/* piller  div  */}
          <div className="mt-4 flex flex-row justify-stretch gap-8">
            <label htmlFor="met" className="">
              Piller:
            </label>
            <select
              id="piller"
              name="piller"
              onChange={(e) => {
                setPiller(e.target.value);
              }}
              className="block py-2.5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select</option>
              <option value="12 feet pillar " className="text-center"> 12 Feet piller </option>
              <option value="10 feet pillar" className="text-center"> 10 Feetpiller</option>
            </select>
            <input
              type="number"
              id="pillerCount"
              name="pillerCount"
              onChange={(e) => {
                const count = e.target.value;
                setPillerCount(count);
                handleChange(piller, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>

          {/* lengths  */}
          <div className="mt-4 flex flex-row justify-stretch gap-6">
            <label htmlFor="met" className="">
              Length:
            </label>
            <select
              id="length"
              name="length"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="block py-2.5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select </option>
              <option value="length" className="text-center">Lenght</option>
            </select>
            <input
              type="text"
              id="lengthCount"
              name="lengthCount"
              onChange={(e) => {
                const count = e.target.value;
                setLengthCount(count);
                handleChange(length, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>

          {/* Paya  */}
          <div className="mt-4 flex flex-row justify-stretch gap-8">
            <label htmlFor="met" className="">
              Paya:
            </label>
            <select
              id="paya"
              name="paya"
              onChange={(e) => {
                setPaya(e.target.value);
              }}
              className="block py-2.5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="" className="text-center">Select </option>
              <option value="paya" className="text-center">Paya</option>
            </select>
            <input
              type="number"
              id="PayaCount"
              name="payaCount"
              onChange={(e) => {
                const count = e.target.value;
                setPayaCount(count);
                handleChange(paya, count);
              }}
              placeholder="Count"
              className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>

          {/* Add similar divs for other fields */}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={handleNext} className="m-10 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center">
        Save & Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
