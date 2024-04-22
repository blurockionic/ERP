import { Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import { toast, Toaster } from "react-hot-toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";

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
  const [tentActive, setTentActive] = useState(true);
  const [cateringActive, setCateringActive] = useState(false);
  const [decorationActive, setDecorationActive] = useState(false);
  const [bedingActive, setBedingActive] = useState(false);
  const [lightActive, setLightActive] = useState(false);
  const tabButtonhandler = (value) => {
    setTentActive(value === "tent");
    setCateringActive(value === "catering");
    setLightActive(value === "light");
    setDecorationActive(value === "decoration");
    setBedingActive(value === "beding");
  };

  console.log(lightActive);
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
    if (!itemName || !itemCategoryType || !totalItemQuantity) {
      return toast.error("Please fill itemName, category and Quantity fields");
    }
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
      // console.log(response);
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIsLoading(true);
        setAddItemActive(false);
      }
    } catch (error) {
      console.log(error.response.message);
    }
  };
  // handle for delete item from database
  const handleDeleteInventoryItem = async (itemId) => {
    console.log(itemId);

    try {
      const response = await axios.delete(
        `${config.apiUrl}/inventory/delete/${itemId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      const { success, message } = response.data;
      if (success) {
        // console.log("after delete a raw message",message);
        toast.success(message);
        setIsLoading(true);
      }
    } catch (error) {
      toast.error("somthing went wrong");
      console.log(error.response.message);
      // Handle error cases here
    }
  };

  return (
    <>
      <Toaster />
      <div className=" h-auto bg-slate-50 p-5">
        {/* heading items */}
        <div className="flex flex-row justify-between  bg-transparent p-1">
          <div className="flex bg-slate-200 rounded ">
            <span
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                tentActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("tent")}
            >
              Tent
            </span>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                decorationActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("decoration")}
            >
              {" "}
              Decoration
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                cateringActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("catering")}
            >
              {" "}
              Catering
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                bedingActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("beding")}
            >
              {" "}
              Beding
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                lightActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("light")}
            >
              Light
            </div>
          </div>
          <div className="flex bg-slate-200 rounded ">
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
            >
              <FilterListIcon className="mr-1" />
              Filter{" "}
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
            >
              <TaskOutlinedIcon className="mr-1" />
              Export
            </div>
          </div>
        </div>
        {tentActive && (
          <div className="mt-4 p-4  border-2 h-[550px]  rounded-xl">
            <div className="flex justify-between">
              {/* Tab Heading */}
              <div className="pl-4">
                <span className="text-3xl font-semibold ">Inventory</span>
                <p>Recent Items from your store</p>
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
            {/*  table and Add item div */}
            <div className="h-[90%] overflow-y-auto">
            {/* Add item div */}
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
                          <option value="bistar">Beding</option>
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
                          checked={isConsumable}
                          onChange={(e) => setIsConsumable(e.target.checked)}
                          className="border border-gray-500 rounded"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",

                            cursor: "pointer",
                          }}
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
              </div>
              <div className="bg-white border p-3 rounded-md  table-container mt-2 ">
                <table className="w-full">
                  {/* table header */}
                  <thead className="bg-gray-200 border rounded-md mt-8">
                    {/* header row */}
                    <tr className="flex justify-between">
                      {/* header columns */}
                      <th className=" w-[8rem] font-medium py-2 px-4 text-gray-600">
                        Items Name
                      </th>
                      <th className=" w-[8rem] font-medium py-2 px-4 text-gray-600">
                        Category 
                      </th>
                      <th className=" w-[8rem] font-medium py-2 px-4 text-gray-600">
                        Quantity
                      </th>
                      <th className=" w-[8rem] font-medium py-2 px-4 text-gray-600">
                        Size
                      </th>
                      <th className="w-[8rem] font-medium py-2 px-4 text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {/* table body */}
                  <tbody className="h-full text-sm font-normal bg-white overflow-y-auto">
                    {/* Check if there are items to display */}
                    {allItem.length === 0 ? (
                      // Display a message if there are no items
                      <tr>
                        <td
                          className="p-4 text-center text-gray-500"
                          colSpan="5"
                        >
                          <div className="flex flex-col items-center">
                            <p className="mt-2 font-mono font-bold text-xl">Oops! No Inventory found.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      // Map over the items and render table rows
                      allItem.map((item, index) => (
                        <tr key={index} className="flex justify-between border-b">
                          {/* item columns */}
                          <td className="w-[8rem] p-4 text-center align-middle font-bold capitalize">{item.itemName}</td>
                          <td className=" w-[8rem] p-4 text-center align-middle">
                            {item.itemCategoryType}
                          </td>
                          <td className="w-[8rem] p-4 text-center align-middle">
                            {item.totalItemQuantity}
                          </td>
                          <td className="w-[8rem] p-4 text-center align-middle">{item.itemSize}</td>
                          <td className="w-[8rem] p-4 text-center align-middle">
                            <div className=" w-[8rem] text-center flex justify-evenly">
                              {/* action buttons */}
                              <span>
                                <button
                                  onClick={() =>
                                    handleDeleteInventoryItem(item._id)
                                  }
                                >
                                  <Tooltip
                                    title="Delete Item"
                                    placement="bottom"
                                    arrow
                                  >
                                    <DeleteOutlineIcon />
                                  </Tooltip>
                                </button>
                              </span>
                              <span>
                                <button>
                                  <Tooltip
                                    title="Edit Row"
                                    placement="bottom"
                                    arrow
                                  >
                                    <EditIcon />
                                  </Tooltip>
                                </button>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Inventory;
