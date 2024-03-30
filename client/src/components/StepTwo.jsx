import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config/config";

const StepTwo = ({ nextStep, prevStep }) => {
  const [loading, setLoading] = useState(false);
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
    <div className="overflow-y-auto">
      <h2>Step 2</h2>

      <div className="flex">
        <div className="mt-4 max-w-lg mx-auto ">
          {/* chair div  */}
          <div className="mt-2 flex flex-row justify-stretch gap-7">
            <label htmlFor="met" className="">
              Chair:
            </label>
            <select
              id="chair"
              name="chair"
              onChange={(e) => setChair(e.target.value)}
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
              onChange={(e) => {
                const count = e.target.value;
                setChairCount(count);
                handleChange(chair, count);
              }}
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
              onChange={(e) => {
                const count = e.target.value;
                setMatsCount(count);
                handleChange(mats, count);
              }}
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
                setCounter(e.target.value);
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
              onChange={(e) => {
                const count = e.target.value;
                setCounterCount(count);
                handleChange(counter, count);
              }}
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
              onChange={(e) => {
                const count = e.target.value;
                setGalicheCount(count);
                handleChange(galiche, count);
              }}
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
              onChange={(e) => {
                const count = e.target.value;
                setNormalTableCount(count);
                handleChange(normalTable, count);
              }}
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
              onChange={(e) => {
                const count = e.target.value;
                setStandingTableCount(count);
                handleChange(standingTable, count);
              }}
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
              onChange={(e) => {
                const count = e.target.value;
                setRoundedTableCount(count);
                handleChange(roundedTable, count);
              }}
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
              onChange={(e) => {
                const count = e.target.value;
                setBeamCount(count);
                handleChange(beam, count);
              }}
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
                setPiller(e.target.value);
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
              onChange={(e) => {
                const count = e.target.value;
                setPillerCount(count);
                handleChange(piller, count);
              }}
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
              }}
              className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select </option>
              <option value="length">Lenght</option>
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
              onChange={(e) => {
                const count = e.target.value;
                setPayaCount(count);
                handleChange(paya, count);
              }}
              placeholder="Count"
              className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Add similar divs for other fields */}
        </div>
      </div>
      <button onClick={handleNext} className="mx-6">
        Next
      </button>
    </div>
  );
};

export default StepTwo;
