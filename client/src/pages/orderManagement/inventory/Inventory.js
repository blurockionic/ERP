import { Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../../../config/config";
import { toast, Toaster } from "react-hot-toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SearchIcon from "@mui/icons-material/Search";

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
  const [allActive, setallActive] = useState(true);
  const [cateringActive, setCateringActive] = useState(false);
  const [decorationActive, setDecorationActive] = useState(false);
  const [bedingActive, setBedingActive] = useState(false);
  const [lightActive, setLightActive] = useState(false);
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


  const [category, setCategory] = useState("");

  const [isAddAnditemModel, setIsAddAnditemModel] = useState(false);
  // const [isAddItemModel, setIsAddItemModel] = useState(false);
  const tabButtonhandler = (value) => {
    const stateMap = {
      all: setallActive,
      tent: setTentActive,
      catering: setCateringActive,
      decoration: setDecorationActive,
      beding: setBedingActive,
      light: setLightActive,
    };

    // Set the active state corresponding to the given value to true,
    // and set all other states to false
    Object.keys(stateMap).forEach((key) => {
      stateMap[key](key === value);
    });
    setCategory(value);
  };

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

 useEffect(() => {
  let filteredData = [];
  if (category === 'all') {
    filteredData = allItem;
  } else {
    filteredData = allItem.filter((item) => item.itemCategoryType === category);
  }

  // Check if filteredData is different from the current filterItems state
  if (!arraysEqual(filteredData, filterItems)) {
    setFilterItems(filteredData);
  }

  console.log("inside useeffect Data", filterItems);
}, [category,filterItems]); // Include filterItems in the dependency array


  // Toggles the dropdown action button for a specific index.
  const toggleDropdownActionButton = (index) => {
    // Ensure dropdown is always set to active when button clicked

    console.log("index value ", index);
    // Update activeRowIndex based on the clicked index
    setIsActionBtnActive(true);
    setActiveRowIndex(index);
  };
  //  Handles the click outside of the dropdown.
  //   If the click is outside the dropdown and the dropdown is currently open,
  //  it sets the isActionBtnActive state to false.
  //
  //  @param {Event} event - The click event.
  //
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
    setIsOpen(false);
  };

  // console.log(lightActive);
  // all data




  // handle for handleOnAddInventoryItem
  const handleOnAddInventoryItem = async () => {
    if (isEditing) {
      // Handle update logic
      // Compare current values with original values
      const currentItem = allItem[editedIndex];
      // console.log("item index",editedIndex);
      // console.log("current item ki id kya h",currentItem._id);
      // console.log("current item",currentItem);
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

      // Update the item at editedIndex
      try {
        // PUT request with updated item data
        const response = await axios.put(
          `${config.apiUrl}/inventory/update/${currentItem._id}`,
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
        // Example: fetchInventoryItems();

        setIsEditing(false);
        setEditedIndex(null);
        // Show success toast
        const { success } = response.data;
        if (success) {
          // console.log("after delete a raw message",message);
          // toast.success(message);    // this message  come from the backend
          toast.success("Item updated successfully.");
          setAddItemActive(false);
        }
        // Clear form fields
        setItemName("");
        setItemCategoryType("");
        setItemSize("");
        setTotalItemQuantity("");
        setIsConsumable("");
      } catch (error) {
        // console.log(error.response.message);
        // Show error toast
        toast.error("Failed to update item. Please try again later.");
      }

      setIsEditing(false);
      setEditedIndex(null);
    }

    if (!isEditing) {
      console.log("beding items name", itemCategoryType);
      //check all field are filled
      if (!itemName || !itemCategoryType || !totalItemQuantity) {
        return toast.error(
          "Please fill itemName, category and Quantity fields"
        );
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
        // console.log(response);
        const { success, message } = response.data;
        if (success) {
          toast.success(message);
          setIsLoading(true);
          setAddItemActive(false);
        }
        setItemName("");
        setItemCategoryType("");
        setItemSize("");
        setTotalItemQuantity("");
        setIsConsumable("");
      } catch (error) {
        console.log(error.response.message);
        console.log("enter in the catch block");
      }
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
  }, []);

  // filter data useEffect
  useEffect(() => {
    if (selectedFilter === "all") {
      setFilterItems(allItem);
    }
    if (selectedFilter === "consumable") {
      const consumableItems = allItem.filter((item) => item.isConsumable);
      setFilterItems(consumableItems);
    } else if (selectedFilter === "non-consumable") {
      const nonConsumableItems = allItem.filter((item) => !item.isConsumable);
      setFilterItems(nonConsumableItems);
    }
  }, [selectedFilter, allItem]);
  // console.log("flter data", filterItems);
  // handle for delete item from database
  const handleDeleteInventoryItem = async (itemId) => {
    console.log("delete button hit and  itme that is able to delete ", itemId);
    return;

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

  const handleEdit = (index, item) => {
    setAddItemActive(true); // Set addItemActive to true
    // Populate input fields with item data
    setItemName(item.itemName);
    setItemCategoryType(item.itemCategoryType);
    setTotalItemQuantity(item.totalItemQuantity);
    setItemSize(item.itemSize);
    setIsConsumable(item.isConsumable);
    setIsEditing(true); // Set isEditing to true
    setEditedIndex(index); // Set the index of the edited item
  };
  return (
    <>
      <Toaster />
      <div className=" h-auto bg-slate-50 px-2">
        {/* heading items */}
        <div className="flex flex-row justify-between  bg-transparent p-1">
          <div className="flex bg-slate-100 rounded ">
            <span
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
                allActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("all")}
            >
              All
            </span>

            <span
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
                tentActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("tent")}
            >
              Tent
            </span>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
                cateringActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("catering")}
            >
              {" "}
              Catering
            </div>

            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
                decorationActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("decoration")}
            >
              {" "}
              Decoration
            </div>

            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold  cursor-pointer ${
                bedingActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("beding")}
            >
              {" "}
              Beding
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
                lightActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("light")}
            >
              Light
            </div>
          </div>
          {/* filter model and filter button and add button and update button */}
          <div className="flex bg-slate-100 rounded ">
            <div className="relative inline-block">
              {/* Filter button */}
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100 ${
                  filterActive ? "bg-white" : "bg-transparent"
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

            {/* add new Item */}

            <div
              onClick={() => setIsAddAnditemModel(!isAddAnditemModel)}
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer bg-white f${
                active ? "bg-white" : "bg-transparent"
              }`}
            >
              Add Item
            </div>

            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer bg-white f${
                active ? "bg-white" : "bg-transparent"
              }`}
            >
              Update Quantity
            </div>
          </div>
        </div>

        <div className="mt-2 p-4  border-2 h-[550px]  rounded-xl">
          {/* add item div */}

          {/* all tab active */}
          {isAddAnditemModel && (
            <div className="">
              <div className=" bg-white border p-3 rounded-md">
                <table className="w-full">
                  <thead></thead>
                  <tbody>
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
                          className="border border-gray-500 rounded outline-none pl-1"
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
                          <option value="beding">Beding</option>
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
                          className="border border-gray-500 rounded outline-none pl-1"
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
                          className="border border-gray-500 rounded outline-none pl-1"
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
                      </td>

                      <td className="flex flex-col text-left mt-5">
                        <button
                          onClick={handleOnAddInventoryItem}
                          className="rounded py-2 px-6 text-center align-middle text-xs font-bold bg-white border shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          {isEditing ? "Update" : "Add"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/*  table and Add item div */}
          <div className="h-[90%] overflow-y-scroll ">
            {/* Add item div */}

            <div className="bg-white border p-3 rounded-md table-container mt-2 ">
              <table className="w-full">
                {/* table header */}
                <thead className="bg-slate-50 top-0 sticky z-10 mt-8">
                  {/* header row */}
                  <tr className="flex justify-between text-gray-700 ">
                    {/* header columns */}
                    <th className=" w-[8rem] font-bold py-2 px-4 text-gray-600">
                      Item ID
                    </th>
                    <th className=" w-[8rem] font-bold py-2 px-4 text-gray-600">
                      Items Name
                    </th>

                    <th className=" w-[8rem] font-bold py-2 px-4 text-gray-600">
                      Category
                    </th>
                    <th className=" w-[8rem] font-bold py-2 px-4 text-gray-600">
                      Quantity
                    </th>
                    <th className=" w-[8rem] font-bold py-2 px-4 text-gray-600">
                      Size
                    </th>
                    <th className="w-[8rem] font-bold py-2 px-4 text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody className="h-full text-sm font-normal bg-white overflow-y-scroll">
                  {/* Check if there are items to display */}
                  {
                     filterItems.length === 0 ?  (
                      // Display a message if there are no items
                      <tr>
                        <td
                          className="p-4 text-center text-gray-500"
                          colSpan="5"
                        >
                          <div className="flex flex-col items-center">
                            <p className="mt-2 font-mono font-bold text-xl">
                              Oops! No Inventory found.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filterItems.map((item, index) => (
                        <tr
                          key={index}
                          className="flex justify-between border-b"
                        >
                          {/* item columns */}
                          <td className="w-[8rem] p-4 text-center align-middle font-bold capitalize">
                            ID-ITEM-{index}
                          </td>
                          <td className="w-[8rem] p-4 text-center align-middle font-bold capitalize">
                            {item.itemName}
                          </td>
                          <td className=" w-[8rem] p-4 text-center align-middle">
                            {item.itemCategoryType}
                          </td>
                          <td className="w-[8rem] p-4 text-center align-middle">
                            {item.totalItemQuantity}
                          </td>
                          <td className="w-[8rem] p-4 text-center align-middle">
                            {item.itemSize}
                          </td>
                          <td className="w-[8rem] p-4 text-center align-middle cursor-pointer relative">
                            <div className="relative" ref={dropdownRef}>
                              <button
                                onClick={() =>
                                  toggleDropdownActionButton(index)
                                }
                                className="relative"
                              >
                                <MoreHorizOutlinedIcon />
                              </button>

                              {/* Dropdown menu */}
                              {isActionBtnActive &&
                                index === activeRowIndex && (
                                  <div className="items-start  absolute top-full left-0 z-10 mt-1 p-2 w-28 bg-white border rounded-md shadow-lg">
                                    <div className="">
                                      <button
                                        className="text-left"
                                        onClick={
                                          () => console.log("delete ", index)
                                          // handleDeleteInventoryItem(item._id)
                                        }
                                      >
                                        <span>
                                          <DeleteOutlineIcon />
                                        </span>
                                        <span className=" font-medium mx-2">
                                          Delete
                                        </span>
                                      </button>
                                    </div>

                                    <div className="">
                                      <button
                                        className="text-left"
                                        onClick={() => handleEdit(index, item)}
                                      >
                                        <span>
                                          <EditIcon />
                                        </span>
                                        <span className=" font-medium mx-2">
                                          Edit
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) // Display a message if there are no items

                    // Map over the items and render table rows
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </>
  );
};

export default Inventory;
