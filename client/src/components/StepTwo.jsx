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
          area,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
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
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);

  return (

    <div className=" h-screen overflow-y-auto">
      <div className="uppercase font-bold text-center bg-slate-400 p-2">
        {" "}
        tent details{" "}
      </div>
      <div className="mt-4  grid xl:grid-cols-2 gap-x-8 xl:ml-12 xl:mr-12 sm:mx-auto lg:mx-auto">
          {/* chair div  */}

          <div className="mt-2 mx-auto flex justify-self-auto gap-4">
            <span
              htmlFor="chair"
              className=" w-[5rem] text-start font-medium text-gray-700"
            >

              Chair:
            </span>
            <select
              id="chair"
              name="chair"
              onChange={(e) => setChair(e.target.value)}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"


            />
          </div>

          {/* mat div  */}

          <div className="mt-2  mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="mat"
              className="w-[5rem] text-start font-medium text-gray-700"
            >

              Mats:
            </label>
            <select
              id="mat"
              name="mat"
              onChange={(e) => {
                setMats(e.target.value);
              }}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

            />
          </div>

          {/* couter div */}

          <div className="mt-2   mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="met"
              className="w-[5rem] text-start font-medium text-gray-700"
            >

              Counter:
            </label>
            <select
              id="counter"
              name="counter"
              onChange={(e) => {
                setCounter(e.target.value);
              }}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* galiche div  */}
          <div className="mt-2  mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="met"
              className="w-[5rem] text-start font-medium text-gray-700"
            >


              Galiche:
            </label>
            <select
              id="galiche"
              name="galiche"
              onChange={(e) => {
                setGaliche(e.target.value);
              }}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"


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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

            />
          </div>
        </div>
        <h1 className="mt-6 font-bold bg-slate-200 px-2 ">
          All Types of Tables
        </h1>


        <div className=" mt-4  grid xl:grid-cols-2 gap-x-8 xl:ml-12 xl:mr-12 sm:mx-auto lg:mx-auto ">

        {/* Table div */}
        <div className="mt-2 flex mx-auto justify-self-auto gap-4">
            <label
              htmlFor="normaltable"
              className="w-[5rem] text-start font-medium text-gray-700"
            >
            Normal Table:
          </label>
          <select
            id="table"
            name="table"
            onChange={(e) => {
              setNormalTable(e.target.value);
            }}
            className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">select</option>
            <option value="Normal Table">Normal Table</option>
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
            className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Standing Table */}
        <div className="mt-2 flex mx-auto justify-self-auto gap-4">
            <label
              htmlFor="standingtable"
              className="w-[5rem] text-start font-medium text-gray-700"
            >
            Standing Table:
          </label>
          <select
            id="StandingTable"
            name="StandingTable"
            onChange={(e) => {
              setStandingTable(e.target.value);
            }}
            className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">select</option>
            <option value="Standing Table">Standing Table</option>
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
            className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* rounded */}
        <div className="mt-2 flex mx-auto justify-self-auto gap-4">
            <label
              htmlFor="roundedtable"
              className="w-[5rem] text-start font-medium text-gray-700"
            >
            Rounded Table:
          </label>
          <select
            id="roundedTable"
            name="roundedtable"
            onChange={(e) => {
              setRoundedTable(e.target.value);
            }}
            className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">select</option>
            <option value="Rounded Table">Rounded Table</option>
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
            className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        </div>

        <h1 className="mt-6 font-bold bg-slate-200 px-2 ">
         Tent area 
        </h1>
        {/* parent div  */}
        <div className="mt-2 w-[80%] mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="standingtable"
              className="w-[5rem] text-start font-medium text-gray-700"
            >
                 Area :
          </label>
            <input
              type="text"
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area (optional) ex-(lxbxh)"
              className=" w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-1 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
            />
          </div>


        <div className="mt-4  grid xl:grid-cols-2 gap-x-8 xl:ml-12 xl:mr-12 sm:mx-auto lg:mx-auto">
          {/* Beam div  */}
          <div className="mt-2  mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="beam"
              className="w-[5rem] text-start font-medium text-gray-700"
            >
              Beam:
            </label>
            <select
              id="beam"
              name="beam"
              onChange={(e) => {
                setBeam(e.target.value);
              }}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

            />
          </div>

          {/* piller  div  */}

          <div className="mt-2  mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="piller"
              className="w-[5rem] text-start font-medium text-gray-700"
            >

              Piller:
            </label>
            <select
              id="piller"
              name="piller"
              onChange={(e) => {
                setPiller(e.target.value);
              }}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

            />
          </div>

          {/* lengths  */}

          <div className="mt-2  mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="length"
              className="w-[5rem] text-start font-medium text-gray-700"
            >

              Length:
            </label>
            <select
              id="length"
              name="length"
              onChange={(e) => {
                setLength(e.target.value);
              }}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

            />
          </div>

          {/* Paya  */}

          <div className="mt-2  mx-auto flex justify-self-auto gap-4">
            <label
              htmlFor="beamtable"
              className="w-[5rem] text-start font-medium text-gray-700"
            >

              Paya:
            </label>
            <select
              id="paya"
              name="paya"
              onChange={(e) => {
                setPaya(e.target.value);
              }}

              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

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

              className="w-[10rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"

            />
          </div>

          {/* Add similar divs for other fields */}
        </div>

      {/* next button */}
      <div className=" h-full text-center mt-8 ">
        <button
          onClick={handleNext}
          className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Save & Next
        </button>
      </div>

    </div>
  );
};

export default StepTwo;
