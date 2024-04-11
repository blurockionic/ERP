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
          <label className="flex justify-center border  text-cente py-2 rounded hover:bg-slate-50">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-600 my-auto right-0 "
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
            />
            Pillow
          </label>
          <label className="flex justify-center border  text-cente py-2 rounded hover:bg-slate-50">
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
            Mattress
          </label>
          <label className="flex justify-center border  text-cente py-2 rounded hover:bg-slate-50">
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
          <label className="flex justify-center border  text-cente py-2 rounded hover:bg-slate-50">
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
          <label className="flex justify-center border  text-cente py-2 rounded hover:bg-slate-50">
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
          <div key={item} className="flex items-center mb-4 font-semibold">
            <span className="mr-2">{item}: </span>
            <input
              type="number"
              value={orderItems[item] || ""}
              onChange={(e) => handleCountChange(e, item)}
              className="w-20 px-2 py-1 border rounded-md"
            />
          </div>
        ))}
      </div>

     
        <div className="h-full mt-8 text-center">
          <button
            onClick={handleNext}
            className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
           Save & Next 
          </button>
        </div>
   
    </>
  );
};

export default StepFive;
