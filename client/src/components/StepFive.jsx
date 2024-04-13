import React, { useState } from "react";
import axios from "axios";
import config from "../config/config";

const StepFive = ({ nextStep }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderItems, setorderItems] = useState({});

  // const [recipients, setRecipients] = useState('');
  // const [message, setMessage] = useState('');

  // items  change handler
  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedItems([...selectedItems, value]);
      setorderItems({ ...orderItems, [value]: 1 }); // Set default count to 1
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== value));
      const { [value]: removedItem, ...newCounts } = orderItems;
      setorderItems(newCounts);
    }
  };
  console.log(orderItems);

  const handleCountChange = (e, item) => {
    const { value } = e.target;
    setorderItems({ ...orderItems, [item]: parseInt(value) });
  };

  //handle on next step
  const handleNext = async () => {
    const customerId = localStorage.getItem("customerId");
    try {
      const response = await axios.post(
        `${config.apiUrl}/bistar/new`,
        { customerId, orderItems },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {}
    nextStep();
  };
  return (
    <>
      <div className=" flex flex-row uppercase justify-center font-bold ">
        {" "}
        Select Items
      </div>
      <div>
        <div className="grid grid-cols-5 gap-4 text-xt font-bold mt-2 p-2">
          
          <label className="flex justify-center  text-cente py-2 rounded hover:bg-slate-200">
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-600 checked:bg-gray-600 checked:before:bg-gray-600 hover:before:opacity-10 mx-3"
              style={{
                marginTop: "4px",
                marginLeft: "4px",
                paddingTop: "2px",
                width: "16px", // Set the width
                height: "16px", // Set the height
                border: "2px solid black",
              }}
              value="pillow"
              onChange={handleItemChange}
            />
            <span
              class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                stroke="currentColor" stroke-width="1">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
            </span>
            Pillow
          </label>
          <label className="flex justify-center  text-cente py-2 rounded hover:bg-slate-200">
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-600 checked:bg-gray-600 checked:before:bg-gray-600 hover:before:opacity-10 mx-3"
              style={{
                marginTop: "4px",
                marginLeft: "4px",
                paddingTop: "2px",
                width: "16px", // Set the width
                height: "16px", // Set the height
                border: "2px solid black",
              }}
              value="bed"
              onChange={handleItemChange}
            />
            Mattress
          </label>
          <label className="flex justify-center  text-cente py-2 rounded hover:bg-slate-200">
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-600 checked:bg-gray-600 checked:before:bg-gray-600 hover:before:opacity-10 mx-3"
              style={{
                marginTop: "4px",
                marginLeft: "4px",
                paddingTop: "2px",
                width: "16px", // Set the width
                height: "16px", // Set the height
                border: "2px solid black",
              }}
              value="chadar"
              onChange={handleItemChange}
            />
            Chadar
          </label>
          <label className="flex justify-center  text-cente py-2 rounded hover:bg-slate-200">
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-600 checked:bg-gray-600 checked:before:bg-gray-600 hover:before:opacity-10 mx-3"
              style={{
                marginTop: "4px",
                marginLeft: "4px",
                paddingTop: "2px",
                width: "16px", // Set the width
                height: "16px", // Set the height
                border: "2px solid black",
              }}
              value="bedsheet"
              onChange={handleItemChange}
            />
            Bed Sheet
          </label>
          <label className="flex justify-center  text-cente py-2 rounded hover:bg-slate-200">
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-600 checked:bg-gray-600 checked:before:bg-gray-600 hover:before:opacity-10 mx-3"
              style={{
                marginTop: "4px",
                marginLeft: "4px",
                paddingTop: "2px",
                width: "16px", // Set the width
                height: "16px", // Set the height
                border: "2px solid black",
              }}
              value="blanket"
              onChange={handleItemChange}
            />
            Blanket
          </label>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4 text-center">Item Counts</h2>
      <div className="flex flex-row ">
        {selectedItems.map((item) => (
          <div key={item} className="flex items-center mb-4 font-semibold mx-auto">
            <span className="mr-2">{item}: </span>
            <input
              type="number"
              value={orderItems[item] || ""}
              onChange={(e) => handleCountChange(e, item)}
              className="w-[15rem] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>

     
        <div className="h-full mt-8 text-center">
          <button
            onClick={handleNext}
            className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
           Save & Next 
          </button>
        </div>
   
    </>
  );
};

export default StepFive;
