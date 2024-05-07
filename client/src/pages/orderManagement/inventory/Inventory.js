import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../../../config/config";
import { toast, Toaster } from "react-hot-toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

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

  const [filterActive, setFilterActive] = useState(true);
  const [isActionBtnActive, setIsActionBtnActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const dropdownRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  // Active handler for the action btn in the inventory
  const [activeRowIndex, setActiveRowIndex] = useState();

  const [filterItems, setFilterItems] = useState([]);

  const [isAddAnditemModel, setIsAddAnditemModel] = useState(false);

  const [filterButtonActiveColor, setFilterButtonActiveColor] = useState(false);

  const [inventoryId, setInventoryId] = useState(null);

  // action button for delete and edit inventory items
  const toggleDropdownActionButton = (id, index) => {
    // Ensure dropdown is always set to active when button clicked

    console.log(id, index);
    // Update activeRowIndex based on the clicked index
    setIsActionBtnActive(true);
    setActiveRowIndex(index);
    setInventoryId(id);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsActionBtnActive(false);
    }
  };

  //    Adds an event listener to the document to handle the click outside of the dropdown.
  useEffect(() => {
    //    The event listener is removed when the component unmounts.
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //  Toggles the dropdown state and sets the filter active state.
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFilterActive(true);
  };

  // filter button handler for all data
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterButtonActiveColor(true);
    setIsOpen(false);
  };

  // handle for handleOnAddInventoryItem
  const handleOnAddInventoryItem = async () => {
    console.log(itemName, itemCategoryType, totalItemQuantity);
    //check all field are filled
    if (!itemName || !itemCategoryType || !totalItemQuantity) {
      return toast.error("Please fill itemName, category and Quantity fields");
    }
    // Handle add logic
    // Add new item
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
      // console.log(response);
      const { success, message } = response.data;
      if (success) {
        setItemName("");
        setItemCategoryType("");
        setItemSize("");
        setTotalItemQuantity("");
        setIsConsumable("");

        toast.success(message);
        setIsLoading(true);
        setAddItemActive(false);
        setIsAddAnditemModel(false);
      }
    } catch (error) {
      console.log(error.response.message);
      console.log("enter in the catch block");
    }
  };
  // console.log("selected filter", selectedFilter);

  // get all the data from the inventory
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/inventory/all`, {
          withCredentials: true,
        });
        setAllItem(response.data);
        // console.log("all item data", allItem);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchInventoryItems();
  }, [isLoading]);

  // filter data useEffect
  useEffect(() => {
    const filterFunctions = {
      all: () => allItem,
      consumable: () => allItem.filter((item) => item.isConsumable),
      "non-consumable": () => allItem.filter((item) => !item.isConsumable),
      tent: () => filterByCategory("tent"),
      catering: () => filterByCategory("catering"),
      decoration: () => filterByCategory("decoration"),
      beding: () => filterByCategory("beding"),
      light: () => filterByCategory("light"),
    };

    // Filter function for category
    const filterByCategory = (category) =>
      allItem.filter((item) => item.itemCategoryType === category);

    // Call the appropriate filter function based on the selected filter
    const filteredItems = filterFunctions[selectedFilter]();

    setFilterItems(filteredItems);
  }, [selectedFilter, allItem]);

  // handle for delete item from database
  const handleDeleteInventoryItem = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${config.apiUrl}/inventory/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      const { success, message } = response.data;
      if (success) {
        // console.log("after delete a raw message",message);
        toast.success(message);
        setIsLoading(true);
        setIsActionBtnActive(false);
      }
    } catch (error) {
      toast.error("somthing went wrong");
      console.log(error.response.message);
      // Handle error cases here
    }
  };

  const handleEdit = (index, item) => {
    setIsAddAnditemModel(true); // Set addItemActive to true
    // Populate input fields with item data
    setItemName(item.itemName);
    setItemCategoryType(item.itemCategoryType);
    setTotalItemQuantity(item.totalItemQuantity);
    setItemSize(item.itemSize);
    setIsConsumable(item.isConsumable);
    setIsEditing(true); // Set isEditing to true
    setEditedIndex(index); // Set the index of the edited item
    setIsActionBtnActive(false);
  };

  // handle on inventory itemUpdate
  const handleOnInvetoryItemUpdate = async () => {
    // Compare current values with original values
    const currentItem = allItem[editedIndex];
    // console.log("item index",editedIndex);
    if (
      itemName === currentItem.itemName &&
      itemCategoryType === currentItem.itemCategoryType &&
      itemSize === currentItem.itemSize &&
      totalItemQuantity === currentItem.totalItemQuantity &&
      isConsumable === currentItem.isConsumable
    ) {
      toast.error("No changes detected in this item.");
      return;
    }

    //   // Update the item at editedIndex
    try {
      // PUT request with updated item data
      const response = await axios.put(
        `${config.apiUrl}/inventory/update/${inventoryId}`,
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

      // Update local state or fetch updated data
      setIsEditing(false);
      setEditedIndex(null);
      // Show success toast
      const { success } = response.data;
      if (success) {
        // toast.success(message);    // this message  come from the backend
        setIsLoading(true);
        toast.success("Item updated successfully.");
        setIsAddAnditemModel(false);
        setIsActionBtnActive(false);
      }
      // Clear form fields
      setItemName("");
      setItemCategoryType("");
      setItemSize("");
      setTotalItemQuantity("");
      setIsConsumable("");
    } catch (error) {
      // Show error toast
      toast.error("Failed to update item. Please try again later.");
    }
    setIsEditing(false);
    setEditedIndex(null);
  };

  return (
    <>
      <Toaster />
      <div className=" bg-slate-50 px-2 h-auto">
        {/* heading items */}
        
        <div className="flex flex-row justify-between bg-slate-100  bg-transparent p-1">
          <Link to={"../order"}>
            <div className="flex ">
              <span
                className={`px-3 py-1.5 m-1 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}
              >
                <ArrowBackIcon className="text-xs mr-1" />
                Back
              </span>
            </div>
          </Link>
          <div className="flex  rounded ">
            <span className="text-xl p-2 font-semibold uppercase">
              Inventory Items
            </span>
          </div>
          {/* filter model and filter button and add button and update button */}
          <div className="flex  rounded ">
            <div className="relative inline-block">
              {/* Filter button */}
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer  ${
                  filterButtonActiveColor ? "bg-[#D6DEFE]" : "bg-white"
                }`}
                onClick={toggleDropdown}
              >
                <FilterListIcon className="mr-1" />
                Filter
              </div>
              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white border rounded-md shadow-lg z-20">
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "all" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("all")}
                  >
                    {selectedFilter === "all" && ""}
                    All
                  </div>

                  {/* Tent */}
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "tent" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("tent")}
                  >
                    {selectedFilter === "tent" && ""}
                    Tent
                  </div>
                  {/* Catering */}
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "catering" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("catering")}
                  >
                    {selectedFilter === "catering" && ""}
                    Catering
                  </div>
                  {/* decoration */}
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "decoration" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("decoration")}
                  >
                    {selectedFilter === "decoration" && ""}
                    Decoration
                  </div>
                  {/* light */}
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "light" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("light")}
                  >
                    {selectedFilter === "light" && ""}
                    light
                  </div>
                  {/* Beding */}
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "beding" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("beding")}
                  >
                    {selectedFilter === "beding" && ""}
                    Beding
                  </div>

                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "consumable" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("consumable")}
                  >
                    {selectedFilter === "consumable" && ""}
                    Consumable
                  </div>
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer ${
                      selectedFilter === "non-consumable" && "font-bold"
                    }`}
                    onClick={() => handleFilterSelect("non-consumable")}
                  >
                    {selectedFilter === "non-consumable" && ""}
                    Non-Consumable
                  </div>
                </div>
              )}
            </div>
            <div
              onClick={() => setIsAddAnditemModel(!isAddAnditemModel)}
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer bg-white f${
                active ? "bg-white" : "bg-transparent"
              }`}
            >
              <AddIcon className="mr-1" />
              Add Item
            </div>
          </div>
        </div>

        <div className=" border-2 h-[628px] rounded-xl">
          {isAddAnditemModel && (
            <div className=" bg-white border p-3 rounded-md">
              <form className="w-full">
                <div className="flex flex-row justify-evenly text-center">
                  <div className="flex flex-col text-left">
                    <label className="mb-1" htmlFor="itemName">
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="itemName"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="border border-gray-500 rounded outline-none pl-1"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <label className="mb-1" htmlFor="itemCategoryType">
                      Choose item category
                    </label>
                    <select
                      id="itemCategoryType"
                      onChange={(e) => setItemCategoryType(e.target.value)}
                      value={itemCategoryType}
                    >
                      <option value="">--Select--</option>
                      <option value="tent">Tent</option>
                      <option value="catering">Catering</option>
                      <option value="decoration">Decoration</option>
                      <option value="light">Light</option>
                      <option value="beding">Beding</option>
                    </select>
                  </div>
                  <div className="flex flex-col text-left">
                    <label className="mb-1" htmlFor="totalItemQuantity">
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="totalItemQuantity"
                      value={totalItemQuantity}
                      onChange={(e) => setTotalItemQuantity(e.target.value)}
                      className="border border-gray-500 rounded outline-none pl-1"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <label className="mb-1" htmlFor="itemSize">
                      Size
                    </label>
                    <input
                      type="text"
                      id="itemSize"
                      value={itemSize}
                      onChange={(e) => setItemSize(e.target.value)}
                      className="border border-gray-500 rounded outline-none pl-1"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <label className="mb-1" htmlFor="isConsumable">
                      Is it consumable?
                    </label>
                    <input
                      type="checkbox"
                      id="isConsumable"
                      checked={isConsumable}
                      onChange={(e) => setIsConsumable(e.target.checked)}
                      className="border border-gray-500 rounded outline-none pl-1"
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
                  </div>
                  <div className="flex flex-col text-left mt-5">
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={handleOnAddInventoryItem}
                        className="rounded py-2 px-6 text-center align-middle text-xs font-bold bg-white border shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleOnInvetoryItemUpdate}
                        className="rounded py-2 px-6 text-center align-middle text-xs font-bold bg-white border shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}

          {/*  table and Add item div */}

          <div className="bg-white border rounded-md table-container mt-2 table-container h-[90%] relative overflow-x-hidden overflow-y-scroll">
            <table className="w-full text-center">
              <thead className="sticky top-0 bg-white text-sm z-10">
                <tr className="text-gray-700 py-5">
                  <th className="font-bold py-2 px-4 text-gray-600">S.No.</th>
                  <th className="font-bold py-2 px-4 text-gray-600">Item ID</th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                    Items Name
                  </th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                    Category
                  </th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                    Quantity
                  </th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                    Current Availability
                  </th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                    Out of Station
                  </th>
                  <th className=" font-bold py-2 px-4 text-gray-600">Size</th>
                  <th className=" font-bold py-2 px-4 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal overflow-y-scroll mt-4 bg-white overflow-x-hidden">
                {filterItems.length === 0 ? (
                <tr>
                
                  <td
                    colSpan="10"
                    className="text-center py-4  text-xl p-4 bg-gray-100 m-4 font-mono"
                  >
                    Opps, the selected filter data was not found.
                  </td>
                
              </tr>
              
                ) : (
                  filterItems.map((item, index) => (
                    <tr key={item._id} className="border-b text-center">
                      <td className=" p-4">{index + 1}</td>
                      <td className=" p-4">{item.itemId}</td>
                      <td className=" p-4 capitalize">{item.itemName}</td>
                      <td className="  p-4 capitalize">
                        {item.itemCategoryType}
                      </td>
                      <td className=" p-4 ">{item.totalItemQuantity}</td>
                      <td className=" p-4 ">
                        {isNaN(item?.itemCurrentAvailability)
                          ? 0
                          : item?.itemCurrentAvailability}
                      </td>
                      <td className=" p-4 ">
                        {isNaN(item.itemOutForWork) ? 0 : item.itemOutForWork}
                      </td>
                      <td className=" p-4 ">{item.itemSize}</td>
                      <td className="p-4 cursor-pointer relative">
                        <div>
                          <button
                            onClick={() =>
                              toggleDropdownActionButton(item._id, index)
                            }
                          >
                            <MoreHorizOutlinedIcon />
                          </button>
                          {isActionBtnActive && index === activeRowIndex && (
                            <div
                              className={`absolute bg-gray-200 items-start top-4 -left-1 z-10 w-[6.5rem] border rounded-md`}
                             
                            >
                              <Tooltip
                                title="close model"
                                placement="bottom"
                                arrow
                              >
                                <span
                                  className=""
                                  onClick={() => setIsActionBtnActive(false)}
                                >
                                  <CloseIcon />
                                </span>
                              </Tooltip>
                             
                              <div className="2">
                                {" "}
                                <button
                                  className="text-left"
                                  onClick={() =>
                                    handleDeleteInventoryItem(item._id)
                                  }
                                >
                                  <span>
                                    <DeleteOutlineIcon />
                                  </span>
                                  <span className="font-medium mx-2">
                                    Delete
                                  </span>
                                </button>
                                <button
                                  className="text-left"
                                  onClick={() => handleEdit(index, item)}
                                >
                                  <span>
                                    <EditIcon />
                                  </span>
                                  <span className="font-medium mx-2">Edit</span>
                                </button>
                              </div>
                            </div>
                          )}
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
      {/* Modal */}
    </>
  );
};

export default Inventory;
