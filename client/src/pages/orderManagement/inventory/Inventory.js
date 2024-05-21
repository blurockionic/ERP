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

import CheckIcon from "@mui/icons-material/Check";
import SearchBar from "../../../components/SearchBar";

const Inventory = () => {
  const active = true;
  const [allItem, setAllItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemCategoryType, setItemCategoryType] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [totalItemQuantity, setTotalItemQuantity] = useState("");
  const [isConsumable, setIsConsumable] = useState(false);

  const [isActionBtnActive, setIsActionBtnActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const dropdownRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  // Active handler for the action btn in the inventory
  const [activeRowIndex, setActiveRowIndex] = useState();

  const [filterItems, setFilterItems] = useState([]);

  const [allItemForSearch, setAllItemForSearch] = useState([]);

  const [isAddAnditemModel, setIsAddAnditemModel] = useState(false);

  const [filterButtonActiveColor, setFilterButtonActiveColor] = useState(false);

  const [inventoryId, setInventoryId] = useState(null);

  const [relatedItemChecked, setRelatedItemChecked] = useState(false);

  const [openRelatedItemList, setOpenRelatedItemList] = useState(false);

  const [relatedItemName, setRelatedItemName] = useState("");

  const [relatedItems, setRelatedItems] = useState([]);

  // handler for adding the additional items
  const addRelatedItem = () => {
    // add new values in the previous
    setRelatedItems([...relatedItems, relatedItemName.trim()]);
    setRelatedItemName("");
  };

  console.log("data jo ki db se aa rha h ", allItem);

  // remove handler for removing the values form the related items list
  const removeRelatedItem = (item) => {
    setRelatedItems(relatedItems.filter((i) => i !== item));
  };

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
          relatedItems,
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
        setRelatedItems("");

        toast.success(message);
        setIsLoading(true);

        setIsAddAnditemModel(false);
      }
    } catch (error) {
      console.log(error.response.message);
      console.log("enter in the catch block");
    }
  };

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
        setAllItemForSearch(response.data);
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

  //handle on search in invetory items
  const handleOnSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setAllItemForSearch(allItem);
    } else {
      // Filter the array based on the search term
      const tempVar = allItemForSearch?.filter((item) =>
        item.itemName?.trim().toLowerCase().includes(searchTerm)
      );
      setAllItem(tempVar); // Update the array state with the filtered results
    }
  };

  const openRelatedItemListHandler = (ind) => {
    setActiveRowIndex(ind);
    setOpenRelatedItemList(!openRelatedItemList);
  };
  return (
    <>
      <Toaster />
      <div className=" bg-slate-50 h-auto">
        {/* heading items */}
        <nav className="bg-gray-100 flex flex-row justify-between">
          <Link to={"../order"}>
            <div
              className={`px-3 py-1.5 my-2 ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}
            >
              <ArrowBackIcon className="text-xs mr-1" />
              Back
            </div>
          </Link>
          <div className={` text-3xl font-semibold text-gray-700 p-2`}>
            Inventory Items
          </div>
          {/* filter model and filter button and add button and update button */}
          <div className=" flex flex-row items-center gap-4 mr-5">
            <SearchBar handleOnSearch={handleOnSearch} />

            <div className="relative inline-block ">
              {/* Filter button */}
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100 ${
                  filterButtonActiveColor ? "bg-[#D6DEFE]" : "bg-white"
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <FilterListIcon className="mr-1" />
                Filter
              </div>
              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-20 ">
                  <div
                    className={`text-left pl-3 p-2 cursor-pointer flex flex-row justify-start ${
                      selectedFilter === "all" && "font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("all")}
                  >
                    <div className="w-7">
                      {selectedFilter === "all" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>
                    <div>All</div>
                  </div>

                  {/* Tent */}
                  <div
                    className={`text-left pl-3 p-2 cursor-pointer flex flex-row justify-start ${
                      selectedFilter === "tent" && "font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("tent")}
                  >
                    <div className="w-7">
                      {selectedFilter === "tent" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>
                    <div>Tent</div>
                  </div>
                  {/* Catering */}
                  <div
                    className={`text-left pl-3 p-2 cursor-pointer flex flex-row justify-start ${
                      selectedFilter === "catering" && "font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("catering")}
                  >
                    <div className="w-7">
                      {selectedFilter === "catering" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>

                    <div>Catering</div>
                  </div>
                  {/* decoration */}
                  <div
                    className={`text-left pl-3 p-2 cursor-pointer  flex flex-row justify-start${
                      selectedFilter === "decoration" &&
                      " font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("decoration")}
                  >
                    <div className="w-7">
                      {selectedFilter === "decoration" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>
                    <div>Decoration</div>
                  </div>
                  {/* light */}
                  <div
                    className={`text-left pl-3 p-2 cursor-pointer flex flex-row justify-start${
                      selectedFilter === "light" && " font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("light")}
                  >
                    <div className="w-7">
                      {selectedFilter === "light" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>
                    <div>light</div>
                  </div>
                  {/* Beding */}
                  <div
                    className={`text-left pl-3 p-2 cursor-pointer flex flex-row justify-start${
                      selectedFilter === "beding" && " font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("beding")}
                  >
                    <div className="w-7">
                      {selectedFilter === "beding" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>
                    <div>Beding</div>
                  </div>

                  <div
                    className={`text-left pl-3 p-2 cursor-pointer flex flex-row justify-start ${
                      selectedFilter === "consumable" &&
                      "font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("consumable")}
                  >
                    <div className="w-7">
                      {selectedFilter === "consumable" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>
                    Consumable
                  </div>
                  <div
                    className={`text-left pl-3 p-2 cursor-pointer  flex flex-row justify-start${
                      selectedFilter === "non-consumable" &&
                      " font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("non-consumable")}
                  >
                    <div className="w-7">
                      {selectedFilter === "non-consumable" && (
                        <CheckIcon className="mr-1" />
                      )}
                    </div>
                    <div>Non-Consumable</div>
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
        </nav>

        <div className=" border-2 h-[600px] rounded-xl overflow-x-hidden overflow-y-scroll">
          {isAddAnditemModel && (
            <div className="bg-white border px-16 py-6 rounded-lg shadow-md">
              <form className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  <div className="flex flex-col">
                    <label className="mb-1 font-semibold" htmlFor="itemName">
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="itemName"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="capitalize border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-slate-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-1 font-semibold"
                      htmlFor="itemCategoryType"
                    >
                      Choose item category
                    </label>
                    <select
                      id="itemCategoryType"
                      onChange={(e) => setItemCategoryType(e.target.value)}
                      value={itemCategoryType}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-slate-500"
                    >
                      <option value="">--Select--</option>
                      <option value="tent">Tent</option>
                      <option value="catering">Catering</option>
                      <option value="decoration">Decoration</option>
                      <option value="light">Light</option>
                      <option value="beding">Beding</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-1 font-semibold"
                      htmlFor="totalItemQuantity"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="totalItemQuantity"
                      value={totalItemQuantity}
                      onChange={(e) => setTotalItemQuantity(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-slate-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-semibold" htmlFor="itemSize">
                      Size
                    </label>
                    <input
                      type="text"
                      id="itemSize"
                      value={itemSize}
                      onChange={(e) => setItemSize(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none  focus:ring-1 focus:ring-slate-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isConsumable"
                      checked={isConsumable}
                      onChange={(e) => setIsConsumable(e.target.checked)}
                      className="mr-2 border border-gray-400 rounded-md checked:bg-slate-800 checked:border-transparent h-5 w-5"
                    />
                    <label
                      className="font-semibold text-gray-800"
                      htmlFor="isConsumable"
                    >
                      Is it consumable?
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="relatedItemChecked"
                      checked={relatedItemChecked}
                      onChange={(e) => setRelatedItemChecked(e.target.checked)}
                      className="mr-2 border border-gray-400 rounded-md checked:bg-slate-800 checked:border-transparent h-5 w-5"
                    />
                    <label
                      className="font-semibold text-gray-800"
                      htmlFor="relatedItemChecked"
                    >
                      Is it related to another item?
                    </label>
                  </div>

                  {relatedItemChecked && (
                    <>
                      <div className="flex flex-col">
                        <label
                          className="mb-1 font-semibold"
                          htmlFor="relatedItemName"
                        >
                          Related Item Name
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            id="relatedItemName"
                            value={relatedItemName}
                            onChange={(e) => setRelatedItemName(e.target.value)}
                            className="border border-gray-300 rounded-md p-2.5 flex-grow focus:outline-none focus:ring-1 focus:ring-slate-500"
                          />
                          <button
                            type="button"
                            onClick={addRelatedItem}
                            className="ml-2 bg-slate-700 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-slate-800 focus:outline-none"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="mb-1 font-semibold"
                          htmlFor="relatedItemName"
                        >
                          Related Items
                        </label>

                        <div className=" rounded-md p-0.5 flex flex-row flex-wrap">
                          {Array.isArray(relatedItems) ? (
                            relatedItems?.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center border border-gray-400 rounded-md m-1"
                              >
                                <span className="ml-1 p-1.5 font-semibold capitalize">
                                  {item}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeRelatedItem(item)}
                                  className=" p-1 hover:bg-gray-200 rounded-full"
                                >
                                  <Tooltip
                                    title="remove item"
                                    placement="bottom"
                                    arrow
                                  >
                                    <CloseIcon />
                                  </Tooltip>
                                </button>
                              </div>
                            ))
                          ) : (
                            <div>No related items</div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={handleOnAddInventoryItem}
                      className="ml-2 bg-slate-700 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-slate-800 focus:outline-none"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOnInvetoryItemUpdate}
                      className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                      Update
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/*  table and Add item div */}

          <div className="bg-white border rounded-md table-container mt-2 table-container h-[90%] relative ">
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
                      className="text-center py-4  text-xl p-4 bg-gray-100 m-4 "
                    >
                      Opps, the selected filter data was not found.
                    </td>
                  </tr>
                ) : (
                  filterItems.map((item, index) => (
                    <tr key={item._id} className="border-b text-center">
                      <td className=" p-4">{index + 1}</td>
                      <td className=" p-4">{item.itemId}</td>
                      <td
                        className="p-4 capitalize relative "
                        onClick={() => openRelatedItemListHandler(index)}
                      >
                      <span className=" hover:cursor-pointer hover:bg-slate-300 p-2 hover:font-bold rounded-md">
                      {item.itemName}
                      </span>

                        {openRelatedItemList && index === activeRowIndex && (
                          <div className="absolute bg-white font-semibold items-start top-1 z-20 w-[7rem] border rounded-md shadow-lg">
                            <div className="text-right relative p-1">
                              <Tooltip
                                title="Close model"
                                placement="bottom"
                                arrow
                              >
                                <button
                                  aria-label="Close"
                                  className="flex justify-center items-center rounded-full bg-white absolute -top-4 -right-2 p-1"
                                  onClick={() => setIsActionBtnActive(false)}
                                >
                                  <CloseIcon className="text-red-500" />
                                </button>
                              </Tooltip>
                              <div className="mt-4">
                                {Array.isArray(item.relatedItems) &&
                                item.relatedItems.length > 0 ? (
                                  item.relatedItems.map((subItem, index) => (
                                    <div
                                      key={index}
                                      className="text-sm text-start p-2 border-b last:border-b-0"
                                    >
                                      {subItem}
                                    </div>
                                  ))
                                ) : (
                                  <p className="p-2 text-start">
                                    No related items available.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>

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
                              className={`absolute  bg-gray-200 items-start top-4 -left-5 z-10 w-[7rem] border rounded-md`}
                            >
                              <div className="text-right relative ">
                                {" "}
                                <Tooltip
                                  title="close model"
                                  placement="bottom"
                                  arrow
                                >
                                  <span
                                    className=" flex flex-wrap rounded-full bg-white absolute -top-4 -right-2"
                                    onClick={() => setIsActionBtnActive(false)}
                                  >
                                    <CloseIcon className="text-red-500" />
                                  </span>
                                </Tooltip>
                              </div>

                              <div className="mt-4 ">
                                {" "}
                                <div
                                  className="text-left pl-2 hover:bg-red-200 p-1"
                                  onClick={() =>
                                    handleDeleteInventoryItem(item._id)
                                  }
                                >
                                  <span>
                                    <DeleteOutlineIcon className="text-red-500" />
                                  </span>
                                  <span className="font-medium mx-2">
                                    Delete
                                  </span>
                                </div>
                                <div
                                  className="text-left pl-2 hover:bg-green-200 p-1"
                                  onClick={() => handleEdit(index, item)}
                                >
                                  <span>
                                    <EditIcon className="text-green-500 ml-0" />
                                  </span>
                                  <span className="font-medium mx-2 ">
                                    Edit
                                  </span>
                                </div>
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
