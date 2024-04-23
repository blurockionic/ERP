import { Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import { toast, Toaster } from "react-hot-toast";

const Inventory = () => {
  const active = true;
  const [allItem, setAllItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemCategoryType, setItemCategoryType] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [totalItemQuantity, setTotalItemQuantity] = useState("");
  const [isConsumable, setIsConsumable] = useState(false);
  const [addItemActive, setAddItemActive] = useState(false);
  const [tentActive, setTentActive] = useState(false);
  const tabButtonhandler = (value) => {
    setTentActive(value === "tent");
  };

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/inventory/all`, {
          withCredentials: true,
        });
        setAllItem(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchInventoryItems();
  }, [isLoading]);

  // handle for handleOnAddInventoryItem
  const handleOnAddInventoryItem = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/inventory/new`,
        {
          itemName,
          itemCategoryType,
          itemSize,
          totalItemQuantity,
          isConsumable,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error.response.message);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="bg-slate-50 p-5">
        {/* heading items */}
        <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400 justify-between mx-5">
          <div className="border-b-2">
            <button className="inline-block text-gray-500 bg-gray-100 rounded-t-lg ">
                <span
                  className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                    tentActive ? "bg-gray-800 text-blue-400" : "bg-transparent "
                  }`}
                  onClick={() => tabButtonhandler("tent")}
                >
                  Tent
                </span>
              <button
                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                  active ? "bg-white" : "bg-transparent"
                }`}
                onClick={tabButtonhandler}
              >
                {" "}
                Decoration
              </button>
              <button
                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                  active ? "bg-white" : "bg-transparent"
                }`}
                onClick={tabButtonhandler}
              >
                {" "}
                Catering
              </button>
              <button
                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                  active ? "bg-white" : "bg-transparent"
                }`}
                onClick={tabButtonhandler}
              >
                {" "}
                Bedding
              </button>
              <button
                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                  active ? "bg-white" : "bg-transparent"
                }`}
                onClick={tabButtonhandler}
              >
                light
              </button>
            </button>
          </div>
          <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 justify-between mx-5">
            <div
              className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              Filter{" "}
            </div>
            <div
              className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              Export
            </div>
          </div>
        </div>
        {tentActive && (
          <div className="mt-4 p-4 bg-white border-2 rounded-xl">
            <div className="flex justify-between">
              {/* table Heading */}
              <div className="pl-4">
                <span className="text-3xl font-semibold ">Inventory</span>
                <p>Recent orders from your store</p>
              </div>
              <div>
                <Tooltip title="Add new item " placement="bottom" arrow>
                  <button
                    onClick={() => setAddItemActive(!addItemActive)}
                    className="rounded  py-2 px-6 text-center align-middle text-xs font-bold bg-white border  shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    ADD ITEM
                  </button>
                </Tooltip>
              </div>
            </div>
            {/* table  */}
            <div className="">
              {addItemActive && (
                <div className=" bg-white border p-3 rounded-md mt-4">
                  <tr className="flex flex-row justify-evenly text-center">
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">
                        {" "}
                        Item Name
                      </label>
                      <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="border border-gray-500 rounded"
                      />
                    </td>
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">
                        Choose item category
                      </label>
                      <select
                        onChange={(e) => setItemCategoryType(e.target.value)}
                      >
                        <option value="">--Select--</option>
                        <option value="tent">Tent</option>
                        <option value="catering">Catering</option>
                        <option value="decoration">Decoration</option>
                        <option value="light">Light</option>
                        <option value="bistar">Bistar</option>
                      </select>
                    </td>
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">
                        Quantity
                      </label>
                      <input
                        type="text"
                        value={totalItemQuantity}
                        onChange={(e) => setTotalItemQuantity(e.target.value)}
                        className="border border-gray-500 rounded"
                      />
                    </td>
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">
                        Size
                      </label>
                      <input
                        type="text"
                        value={itemSize}
                        onChange={(e) => setItemSize(e.target.value)}
                        className="border border-gray-500 rounded"
                      />
                    </td>
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">
                        Is it consumable?
                      </label>
                      <input
                        type="checkbox"
                        value={isConsumable}
                        onChange={(e) => setIsConsumable(e.target.value)}
                        className="border border-gray-500 rounded"
                      />
                    </td>
                    <td className="flex flex-col text-left mt-5 ">
                      <button
                        onClick={handleOnAddInventoryItem}
                        className="rounded  py-2 px-6 text-center align-middle text-xs font-bold bg-white border  shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </div>
              )}
              <div className=" bg-white border p-3 rounded-md table-container h-screen mt-4">
                <table className="w-full">
                  <thead className="bg-gray-200 border rounded-md mt-8">
                    <tr className="flex justify-between">
                      <th className="font-medium py-2 px-4 text-gray-600">
                        Items Name
                      </th>
                      <th className="font-medium py-2 px-4 text-gray-600">
                        Category Type
                      </th>
                      <th className="font-medium py-2 px-4 text-gray-600">
                        Quantity
                      </th>
                      <th className="font-medium py-2 px-4 text-gray-600">
                        Size
                      </th>
                      <th className="font-medium py-2 px-4 text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {allItem.map((item, index) => (
                      <tr
                        key={index}
                        className={`flex justify-between ${(index % 2 === 0 )? "bg-white" : "bg-gray-100"}`}
                      >
                        <td className="py-2 px-4">{item.itemName}</td>
                        <td className="py-2 px-4">{item.itemCategoryType}</td>
                        <td className="py-2 px-4">{item.totalItemQuantity}</td>
                        <td className="py-2 px-4">{item.itemSize}</td>
                        <td className="py-2 px-4">
                          {/* Add action button or element here */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
