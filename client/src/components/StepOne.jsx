import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-datetime/css/react-datetime.css";
import config from "../config/config";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PiChefHat } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { HiOutlineUsers } from "react-icons/hi2";

import { Tooltip } from "@mui/material";
import Loader from "./Loader";

import TextField from "@mui/material/TextField";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const StepOne = () => {
  const navigate = useNavigate();
  const [allRecipe, setAllRecipe] = useState([]);
  const [formDataTent, setFormDataTent] = useState({
    itemList: [],
  });
  const [formDataLight, setFormDataLight] = useState({
    itemList: [],
  });
  const [formDataBistar, setFormDataBistar] = useState({
    itemList: [],
  });
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [dateAndTime, setDateAndTime] = useState(null);

  const [otherDetails, setOtherDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [itemNameTent, setItemNameTent] = useState("");
  const [itemNameCatering, setItemNameCatering] = useState("");
  const [itemNameLight, setItemNameLight] = useState("");
  const [itemNameBistar, setItemNameBistar] = useState("");
  const [itemCountTent, setItemCountTent] = useState("");
  const [itemCountLight, setItemCountLight] = useState("");
  const [itemCountBistar, setItemCountBistar] = useState("");
  const [itemCountForOrderTent, setItemCountForOrderTent] = useState("");
  const [itemCountForOrderLight, setItemCountForOrderLight] = useState("");
  const [itemCountForOrderBistar, setItemCountForOrderBistar] = useState("");

  const [isCateringOrdered, setIsCateringOrdered] = useState(false);
  const [isBistarOrdered, setIsBistarOrdered] = useState(false);
  const [isTentOrdered, setIsTentOrdered] = useState(false);
  const [isLightOrdered, setIsLightOrdered] = useState(false);

  //useState for form
  const [isTentModelOpen, setIsTentModelOpen] = useState(false);
  const [isBistarModelOpen, setIsBistarModelOpen] = useState(false);
  const [isLightModelOpen, setIsLightModelOpen] = useState(false);
  const [isCateringModelOpen, setIsCateringModelOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);

  let optionsTent = [];
  let optionsLight = [];
  let optionsBistar = [];
  let optionCatering = [];

  const [tentArea, setTentArea] = useState("");
  const [showTentArea, setShowTentArea] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // other item realted to Catering
  const [relatedItems, setRelatedItems] = useState([]);
  // const [relatedItemName, setRelatedItemName] = useState("");
  const [itemCount, setItemCount] = useState("");

  const [countError, setCountError] = useState("");

  const [tentCountErrorMessage, setTentCountErrorMessage] = useState("");

  // new cateriing useStates
  // Define the initial state for beverage types

  const initialBeverageTypes = [
    { value: "Chai", label: "Chai" },
    { value: "Lassi", label: "Lassi" },
    { value: "Buttermilk", label: "Buttermilk" },
    { value: "Sugarcane Juice", label: "Sugarcane Juice" },
    { value: "Coconut Water", label: "Coconut Water" },
    { value: "Aam Panna", label: "Aam Panna" },
    { value: "Jaljeera", label: "Jaljeera" },
    { value: "Kokum Juice", label: "Kokum Juice" },
    { value: "Thandai", label: "Thandai" },
    { value: "Badam Milk", label: "Badam Milk" },
    { value: "Rose Milk", label: "Rose Milk" },
    { value: "Saffron Milk", label: "Saffron Milk" },
    { value: "Kesar Pista Milk", label: "Kesar Pista Milk" },
    // Add more beverage items as needed
  ];

  // State for selected beverage items
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const [orderTypes] = useState([
    "Breakfast",
    "Lunch",
    "Dinner",
    "Bramhbhoj",
    "Mata_ki_chowki",
    "Kriya",
    // Add more predefined options as needed
  ]);
  const [mealType, setMealType] = useState("");

  const [mealTime, setMealTime] = useState("");
  const [peopleCount, setPeopleCount] = useState("");

  const [meals, setMeals] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleItemCountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setItemCountForOrderTent(value);
      setTentCountErrorMessage("");
    } else {
      setTentCountErrorMessage("Value cannot be negative");
    }
  };

  // related items of catering order
  const addRelatedItem = () => {
    if (!isNaN(itemCount) && itemCount.trim() !== "") {
      setRelatedItems((prev) => [
        ...prev,
        { relatedItemsName: itemNameCatering, relatedItemsCount: itemCount },
      ]);
      // setRelatedItemName("");
      setItemCount("");
      setCountError("");
    } else {
      setCountError("Item count should be a number.");
    }
  };

  // check the tent area value are valid or not
  const handleTentAreaChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTentArea(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Tent area must be a number.");
    }
  };

  // ice Cream
  const mainCourseOptions = [];
  const snacksOptions = [];
  const starterOptions = [];
  const dessertOptions = [];
  const soupAndSaladOptions = [];
  const brunchOtions = [];

  const fetchInventoryItem = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${config.apiUrl}/inventory/all`, {
        withCredentials: true,
      });
      const { status, data } = response;
      if (status === 200) {
        setInventoryItems(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // fucnticon for fatching the recipes
  const fetchRecipeItem = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${config.apiUrl}/recipe/all`, {
        withCredentials: true,
      });
      const { success, recipes } = response.data;
      if (success) {
        setAllRecipe(recipes);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  //fetch all the inventpry
  useEffect(() => {
    fetchInventoryItem();
    //invoke
    fetchRecipeItem();
  }, []);

  //filter out recipe snacks
  const snacks = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Snacks"
  );
  const mainCourse = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Main Course"
  );
  const starter = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Starter"
  );
  const dessert = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Dessert"
  );
  const soupAndSalad = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Soups and Salad"
  );
  const brunch = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Brunch"
  );

  //main course menu options
  const lengthOfMainCourseItem = mainCourse.length;
  for (let i = 0; i < lengthOfMainCourseItem; i++) {
    mainCourseOptions.push({
      label: mainCourse[i].recipeName,
      value: mainCourse[i].recipeName,
    });
  }

  //starter menu options
  const lengthOfSnackItem = snacks.length;
  for (let i = 0; i < lengthOfSnackItem; i++) {
    snacksOptions.push({
      label: snacks[i].recipeName,
      value: snacks[i].recipeName,
    });
  }
  //starter menu options
  const lengthOfStarterItem = starter.length;
  for (let i = 0; i < lengthOfStarterItem; i++) {
    starterOptions.push({
      label: starter[i].recipeName,
      value: starter[i].recipeName,
    });
  }

  //DESSERT MENU ITEMS
  const lengthOfDessertItem = dessert.length;
  for (let i = 0; i < lengthOfDessertItem; i++) {
    dessertOptions.push({
      label: dessert[i].recipeName,
      value: dessert[i].recipeName,
    });
  }
  //SoupAndSalad menu items
  const lengthOfSoupAndSaladtItem = soupAndSalad.length;
  for (let i = 0; i < lengthOfSoupAndSaladtItem; i++) {
    soupAndSaladOptions.push({
      label: soupAndSalad[i].recipeName,
      value: soupAndSalad[i].recipeName,
    });
  }
  //brunch menu options
  const lengthOfBrunchItem = brunch.length;
  for (let i = 0; i < lengthOfBrunchItem; i++) {
    brunchOtions.push({
      label: brunch[i].recipeName,
      value: brunch[i].recipeName,
    });
  }

  //length of inventory items
  const lengthOfInventoryItems = inventoryItems.length;
  for (let i = 0; i < lengthOfInventoryItems; i++) {
    // LOAD TENT ITEMS
    if (inventoryItems[i].itemCategoryType === "tent") {
      const value = inventoryItems[i].itemName;
      const label = inventoryItems[i].itemName;
      optionsTent.push({ value, label });
    }
    //LOAD LIGHT ITEMS
    if (inventoryItems[i].itemCategoryType === "light") {
      const value = inventoryItems[i].itemName;
      const label = inventoryItems[i].itemName;
      optionsLight.push({ value, label });
    }

    //LOAD LIGHT ITEMS
    if (inventoryItems[i].itemCategoryType === "beding") {
      const value = inventoryItems[i].itemName;
      const label = inventoryItems[i].itemName;
      optionsBistar.push({ value, label });
    }
    // load catering items
    if (inventoryItems[i].itemCategoryType === "catering") {
      const value = inventoryItems[i].itemName;
      const label = inventoryItems[i].itemName;
      optionCatering.push({ value, label });
    }
  }

  // Handle date and time change
  const handleDateAndTimeChange = (newValue) => {
    setDateAndTime(newValue);
  };

  // handle on select change
  const handleSelectChangeTent = (selectedOption) => {
    setItemNameTent(selectedOption.value);

    for (let i = 0; i < inventoryItems.length; i++) {
      if (selectedOption.value === inventoryItems[i].itemName) {
        if (inventoryItems[i].totalItemQuantity === 0) {
          alert("Stock Not Available!");
        }

        setItemCountTent(
          parseInt(inventoryItems[i].totalItemQuantity) -
            (isNaN(inventoryItems[i].itemOutForWork)
              ? 0
              : parseInt(inventoryItems[i].itemOutForWork))
        );
      }
    }
  };

  // handle on select change
  const handleSelectChangeLight = (selectedOption) => {
    setItemNameLight(selectedOption.value);

    for (let i = 0; i < inventoryItems.length; i++) {
      if (selectedOption.value === inventoryItems[i].itemName) {
        if (inventoryItems[i].totalItemQuantity === 0) {
          alert("Stock Not Available!");
        }
        setItemCountLight(inventoryItems[i].totalItemQuantity);
      }
    }
  };

  // handle on select change
  const handleSelectChangeBistar = (selectedOption) => {
    setItemNameBistar(selectedOption.value);

    for (let i = 0; i < inventoryItems.length; i++) {
      if (selectedOption.value === inventoryItems[i].itemName) {
        if (inventoryItems[i].totalItemQuantity === 0) {
          alert("Stock Not Available!");
        }
        setItemCountBistar(inventoryItems[i].totalItemQuantity);
      }
    }
  };

  //handle on add items
  // add item for tent
  const handleAddItemTent = () => {
    if (!itemNameTent && !itemCountForOrderTent) {
      setTentCountErrorMessage("Item name and count cannot be empty");
      return;
    }

    const data = {
      itemNameTent,
      itemCountForOrderTent,
    };

    addMultipleItems(data);
    // Reset all the values
    setItemNameTent("");
    setItemCountForOrderTent("");
    setTentCountErrorMessage("");
  };

  const addMultipleItems = (data) => {
    setFormDataTent((prevFormData) => ({
      itemList: [...prevFormData.itemList, data],
    }));
  };

  // handle for add light items
  const handleAddItemLight = () => {
    const data = {
      itemNameLight,
      itemCountForOrderLight,
    };
    addMultipleItemsLight(data);
    // set default all the value
    setItemCountForOrderLight("");
    setItemCountLight("");
  };

  const addMultipleItemsLight = (data) => {
    setFormDataLight((prevFormData) => ({
      itemList: [...prevFormData.itemList, data],
    }));
  };

  // handle for add bistar items
  const handleAddItemBistar = () => {
    const data = {
      itemNameBistar,
      itemCountForOrderBistar,
    };
    addMultipleItemsBistar(data);
    // set default all the value
    setItemCountForOrderBistar("");
    setItemCountBistar("");
  };

  const addMultipleItemsBistar = (data) => {
    setFormDataBistar((prevFormData) => ({
      itemList: [...prevFormData.itemList, data],
    }));
  };

  // REMOVE items lights
  const removeItemTent = (index) => {
    const updatedItemList = [...formDataTent.itemList];
    updatedItemList.splice(index, 1);
    setFormDataTent({ ...formDataTent, itemList: updatedItemList });
  };

  // REMOVE items lights
  const removeItemLight = (index) => {
    const updatedItemList = [...formDataLight.itemList];
    updatedItemList.splice(index, 1);
    setFormDataLight({ ...formDataLight, itemList: updatedItemList });
  };

  // remove items of bistar
  const removeItemBistar = (index) => {
    const updatedItemList = [...formDataBistar.itemList];
    updatedItemList.splice(index, 1);
    setFormDataBistar({ ...formDataBistar, itemList: updatedItemList });
  };

  //handle for create order
  const handleOnCreateOrder = async () => {
    // const relatedItemsList = {
    //   setOFItems: relatedItems,
    // };

    const isToday = (dateString) => {
      // Parse the provided date string into a Date object
      const date = new Date(dateString);

      // Get today's date
      const today = new Date();

      // Compare only the date part (ignore time) by comparing the year, month, and day
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    };

    // Disable the button
    setIsLoading(true);
    // Remove leading and trailing whitespace from phone number
    const trimmedPhoneNumber = customerPhoneNumber.trim();

    // Check if the phone number starts with 0 or +91
    if (
      trimmedPhoneNumber.startsWith("0") ||
      trimmedPhoneNumber.startsWith("+91")
    ) {
      toast.error("Please enter a valid phone number");
      setIsLoading(false); // Enable the button
      return; // Exit the function early if phone number is invalid
    }

    // Check if the phone number is empty or has less than 10 digits
    if (trimmedPhoneNumber.length !== 10) {
      toast.error("Please enter a 10-digit phone number");
      setIsLoading(false); // Enable the button
      return;
    }

    // Continue with other form validations
    if (!customerAddress || !customerName || !dateAndTime) {
      toast.error("Please fill all the fields");
      setIsLoading(false); // Enable the button
      return;
    }

    const tentOrder = {
      itemList: formDataTent.itemList,
      tentArea: tentArea,
    };
    //  let tentOrder = formDataTent.itemList

    let bistarOrder = formDataBistar.itemList;

    let lightOrder = formDataLight.itemList;

    const cateringMeal = meals?.map((meal) => ({
      mealType: meal.mealType,
      mealTime: meal.mealTime,
      peopleCount: meal.peopleCount,
      recipe: meal.recipe.map((rec) => rec.value),
      selectedBeverages: meal.selectedBeverages.map((bev) => bev.value),
    }));

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${config.apiUrl}/order/new`,
        {
          customerName,
          customerAddress,
          customerPhoneNumber: trimmedPhoneNumber,
          customerEmail,
          otherDetails,
          dateAndTime,
          isCateringOrdered,
          isTentOrdered,
          isBistarOrdered,
          isLightOrdered,
          orderStatus: isToday(dateAndTime) ? "In Progress" : "Confirmed",
          tentOrder,
          bistarOrder,
          lightOrder,
          cateringOrder: cateringMeal,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success } = response.data;
      if (success) {
        toast.success("Order created successfully!");
        // Add a delay of 3 seconds before navigating to the "/order" route
        setTimeout(() => {
          navigate("../order");
        }, 1000);
        setIsLoading(false); // Enable the button
      }
    } catch (error) {
      setIsLoading(false); // Enable the button
      console.log(error);
    }
  };

  // custom css for select options model scroll
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 200,
      overflowY: "auto",
    }),
  };

  const recipeOptions = allRecipe.map((rec) => ({
    value: rec.recipeName,
    label: rec.recipeName,
  }));

  const handleBeverageChange = (selectedOptions) => {
    setSelectedBeverages(selectedOptions || []);
  };

  const handleRecipeChange = (selectedOptions) => {
    setRecipe(selectedOptions || []);
  };

  const handleAddMeal = () => {
    // Check if mealType, mealTime, and peopleCount are not empty
    if (!mealType || !mealTime || !peopleCount) {
      alert("Please fill in all fields (Meal Type, Meal Time, Pax).");
      return; // Exit the function if any field is empty
    }

    const newMeal = {
      mealType,
      mealTime,
      peopleCount,
      recipe,
      selectedBeverages,
    };
    if (isEditing) {
      const updatedMeals = [...meals];
      updatedMeals[editingIndex] = newMeal;
      setMeals(updatedMeals);
      setEditingIndex(null);
      setIsEditing(false);
    } else {
      setMeals([...meals, newMeal]);
    }
    setMealType("");
    setMealTime("");
    setPeopleCount("");
    setRecipe([]);
    setSelectedBeverages([]);
  };

  const handleRemoveMeal = (index) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(index, 1);
    setMeals(updatedMeals);
  };
  // fuction for update in the meals details
  const handleEditMeal = (index) => {
    const mealToEdit = meals[index];
    setMealType(mealToEdit.mealType);
    setMealTime(mealToEdit.mealTime);
    setPeopleCount(mealToEdit.peopleCount);
    setRecipe(mealToEdit.recipe);
    setSelectedBeverages(mealToEdit.selectedBeverages);
    setEditingIndex(index);
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col h-full relative w-full bg-gray-50">
      <Toaster />
      {/* form  */}
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 z-50">
          <Loader />
        </div>
      ) : (
        <>
          <div className="h-auto   overflow-x-hidden bg-gray-50">
            <div className="font-bold text-center text-lg uppercase border-b flex flex-row justify-between py-2  bg-white w-full">
              <div className="mx-2">
                <Link to={"../order"}>
                  <Tooltip
                    title="back to order details"
                    placement="bottom"
                    arrow
                  >
                    <IoMdArrowRoundBack className="mx-4 md:mx-10 lg:mx-10 text-2xl hover:text-gray-800 text-gray-500" />
                  </Tooltip>
                </Link>
              </div>
              <div className="mr-24"></div>
            </div>

            <div className="mt-4 mb-20 mx-4 md:mx-auto overflow-hidden overflow-x-hidden max-w-4xl rounded-md bg-white border shadow-lg">
              <div className="w-full bg-gray-500 py-2 px-2 shadow text-start text-white">
                <span className="text-sm uppercase mx-2">Customer Details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-4">
                {/* Customer Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="customerName"
                    className="capitalize peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    Customer Name
                  </label>
                </div>

                {/* Address */}
                <div className="relative">
                  <input
                    type="text"
                    name="customerAddress"
                    className="capitalize peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    Address
                  </label>
                </div>

                {/* Mobile Number */}
                <div className="relative">
                  <input
                    className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    type="tel"
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    value={customerPhoneNumber}
                    onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  />
                  <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    <span className="relative">
                      Mobile Number <sup className="text-red-800">*</sup>
                    </span>
                  </label>
                  {customerPhoneNumber &&
                    (customerPhoneNumber.startsWith("0") ||
                      customerPhoneNumber.startsWith("+91")) && (
                      <p className="text-red-500 text-sm">
                        Phone number should not start with 0 or +91
                      </p>
                    )}
                </div>

                {/* Email (Optional) */}
                <div className="relative">
                  <input
                    className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    type="email"
                    required
                    id="alternateNumber"
                    name="alternateNumber"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                  <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    Email (Optional)
                  </label>
                </div>

                {/* Date and Time */}
                <div className="relative">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      value={dateAndTime}
                      className=" flex  w-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      onChange={handleDateAndTimeChange}
                      renderInput={(params) => (
                        <TextField
                          className=" flex  w-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    <b>Date and Time</b>
                  </label>
                </div>

                {/* Other Details */}
                <div className="relative">
                  <input
                    className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    type="text"
                    value={otherDetails}
                    onChange={(e) => setOtherDetails(e.target.value)}
                  />
                  <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    Other Details
                  </label>
                </div>
              </div>

              {/* order category  */}
              <div className="w-full bg-gray-500 py-2 px-2 shadow-sm text-start text-white">
                <span className="text-sm uppercase mx-2">Choose Order</span>
              </div>
              <div className="flex justify-items-start py-2 px-4">
                <div className="flex mr-4">
                  <input
                    type="checkbox"
                    name="tent"
                    id="tent"
                    className="w-4 mr-1"
                    onClick={() => {
                      const previous = !isTentModelOpen;
                      setIsTentModelOpen(previous);
                      setIsTentOrdered(previous);
                    }}
                  />
                  <label htmlFor="tent">Tent</label>
                </div>
                <div className="flex mr-4">
                  <input
                    type="checkbox"
                    name="bistar"
                    id="bistar"
                    className="w-4 mr-1"
                    onClick={() => {
                      const previous = !isBistarModelOpen;
                      setIsBistarModelOpen(previous);
                      setIsBistarOrdered(previous);
                    }}
                  />
                  <label htmlFor="bistar">Bistar</label>
                </div>
                <div className="flex mr-4">
                  <input
                    type="checkbox"
                    name="light"
                    id="light"
                    className="w-4 mr-1"
                    onClick={() => {
                      const previous = !isLightModelOpen;
                      setIsLightModelOpen(previous);
                      setIsLightOrdered(previous);
                    }}
                  />
                  <label htmlFor="light">Light</label>
                </div>
                <div className="flex mr-4">
                  <input
                    type="checkbox"
                    name="catering"
                    id="catering"
                    className="w-4 mr-1"
                    onClick={() => {
                      const previous = !isCateringModelOpen;
                      setIsCateringModelOpen(previous);
                      setIsCateringOrdered(previous);
                    }}
                  />
                  <label htmlFor="catering">Catering</label>
                </div>
              </div>
              {/* tent order  */}
              {isTentModelOpen && (
                <div className="p-4">
                  <span className="bg-gray-200 w-auto px-5 py-1 block sm:inline">
                    Tent Order
                  </span>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-stretch">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 text-center"
                        type="checkbox"
                        checked={showTentArea}
                        onChange={(e) => setShowTentArea(e.target.checked)}
                      />
                      <label className="pl-1 text-center ">Tent Area:</label>
                    </div>

                    {showTentArea && (
                      <div>
                        <div className="flex flex-col">
                          <label className="text-sm mx-1">
                            Tent Area (Sq Feet):
                          </label>
                          <input
                            type="text"
                            value={tentArea}
                            onChange={handleTentAreaChange}
                            className="border rounded-md py-2 px-2 focus:outline-none focus:border-blue-500"
                          />
                          {errorMessage && (
                            <span className="text-red-500 text-sm mt-1">
                              {errorMessage}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm">Item Name:</label>
                      <Select
                        onChange={handleSelectChangeTent}
                        options={optionsTent}
                        styles={customStyles}
                        className="rounded focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm">Count: {itemCountTent}</label>
                      <input
                        type="number"
                        value={itemCountForOrderTent}
                        onWheel={(e) => e.preventDefault()}
                        onChange={handleItemCountChange}
                        className="border rounded-md py-2 px-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleAddItemTent}
                        className="bg-gray-50 font-semibold px-4 py-2 mt-2 md:mt-5 shadow rounded uppercase w-full"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>

                  <div>
                    {tentCountErrorMessage && (
                      <p className="text-red-500 mt-2">
                        {tentCountErrorMessage}
                      </p>
                    )}
                  </div>
                  {/* list of item  */}
                  <div className="w-full mx-auto p-4">
                    <h2 className="text-sm font-semibold  mb-2">
                      List of Items
                    </h2>

                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100 ">
                          <th className="p-2 font-semibold">S.no</th>
                          <th className="p-2 font-semibold">Item Name</th>
                          <th className="p-2 font-semibold">Count</th>
                          <th className="p-2 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formDataTent.itemList.map((item, index) => (
                          <tr key={index} className="bg-white border-b">
                            <td className="p-2 text-center">{index + 1}</td>
                            <td className="p-2 text-center">
                              {item.itemNameTent}
                            </td>
                            <td className="p-2 text-center">
                              {item.itemCountForOrderTent}
                            </td>
                            <td className="p-2 flex justify-center items-center text-center">
                              <IoIosCloseCircleOutline
                                className="text-red-500 text-2xl "
                                onClick={() => removeItemTent(index)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* bistar order  */}
              {isBistarModelOpen && (
                <div className="px-4">
                  <span className="bg-gray-200 w-auto px-5 py-1 block sm:inline">
                    Bistar Order
                  </span>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm mx-2">Item Name:</label>
                      <Select
                        defaultValue={itemNameBistar}
                        onChange={handleSelectChangeBistar}
                        options={optionsBistar}
                        lassName="rounded focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>

                    <div className="flex flex-col mb-4 sm:mb-0">
                      <label className="text-sm mx-2">
                        Count: {itemCountBistar}
                      </label>
                      <input
                        type="number"
                        value={itemCountForOrderBistar}
                        onWheel={(e) => e.preventDefault()}
                        onChange={(e) => {
                          const inputValue = parseInt(e.target.value);
                          if (!isNaN(inputValue) && inputValue >= 0) {
                            setItemCountForOrderBistar(inputValue);
                          }
                        }}
                        className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddItemBistar();
                        }}
                        className="bg-gray-50 font-semibold px-4 py-2 mt-2 md:mt-5 shadow rounded uppercase w-full"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                  {/* list of item */}
                  <div className="w-full mx-auto p-4">
                    <h2 className="text-sm font-semibold mb-2 uppercase">
                      List of Items
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 font-semibold">S.no</th>
                            <th className="p-2 font-semibold">Item Name</th>
                            <th className="p-2 font-semibold">Count</th>
                            <th className="p-2 font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formDataBistar.itemList.map((item, index) => (
                            <tr key={index} className="bg-white border-b">
                              <td className="p-2 text-center">{index + 1}</td>
                              <td className="p-2 text-center">
                                {item.itemNameBistar}
                              </td>
                              <td className="p-2 text-center">
                                {item.itemCountForOrderBistar}
                              </td>
                              <td className="p-2 text-center flex justify-center items-center">
                                <IoIosCloseCircleOutline
                                  className="text-red-500 text-2xl "
                                  onClick={() => removeItemBistar(index)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* light order  */}
              {isLightModelOpen && (
                <div className="p-4">
                  <span className="bg-gray-200 w-auto px-5 py-1 block sm:inline">
                    Light Order
                  </span>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col mb-4 sm:mb-0">
                      <label className="text-sm mx-2">Item Name</label>
                      <Select
                        defaultValue={setItemNameLight}
                        onChange={handleSelectChangeLight}
                        options={optionsLight}
                        className="rounded focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>

                    <div className="flex flex-col mb-4 sm:mb-0">
                      <label className="text-sm mx-2">
                        Count: {itemCountLight}
                      </label>
                      <input
                        type="number"
                        value={itemCountForOrderLight}
                        onWheel={(e) => e.preventDefault()}
                        onChange={(e) => {
                          const inputValue = parseInt(e.target.value);
                          if (!isNaN(inputValue) && inputValue >= 0) {
                            setItemCountForOrderLight(inputValue);
                          }
                        }}
                        className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddItemLight();
                        }}
                        className="bg-gray-50 font-semibold px-4 py-2 mt-2 md:mt-5 shadow rounded uppercase w-full"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                  {/* list of item */}
                  <div className="w-full mx-auto p-4">
                    <h2 className="text-sm font-semibold mb-4 uppercase">
                      List of Items
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="p-2 font-semibold">S.no</th>
                            <th className="p-2 font-semibold">Item Name</th>
                            <th className="p-2 font-semibold">Count</th>
                            <th className="p-2 font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formDataLight.itemList.map((item, index) => (
                            <tr key={index} className="bg-white border-b">
                              <td className="p-2 text-center">{index + 1}</td>
                              <td className="p-2 text-center">
                                {item.itemNameLight}
                              </td>
                              <td className="p-2 text-center">
                                {item.itemCountForOrderLight}
                              </td>
                              <td className="p-2 text-center flex justify-center items-center">
                                <IoIosCloseCircleOutline
                                  className="text-red-500 text-2xl "
                                  onClick={() => removeItemLight(index)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* catering order  */}
              {isCateringModelOpen && (
                <div className="container mx-auto p-4">
                  <span className="bg-gray-200 w-full sm:w-auto px-5 py-1 block sm:inline">
                    Catering Order
                  </span>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex-1 relative">
                        <label className="block mb-1" htmlFor="mealType">
                          Meal Type
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="mealType"
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                            list="orderTypes"
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter or select Order Type"
                          />
                          <div className="absolute">
                            <datalist id="orderTypes">
                              {orderTypes.map((type, index) => (
                                <option key={index} value={type} />
                              ))}
                            </datalist>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1" htmlFor="mealTime">
                          Meal Timing
                        </label>
                        <input
                          type="time"
                          id="mealTime"
                          value={mealTime}
                          onChange={(e) => setMealTime(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1" htmlFor="peopleCount">
                          PAX Count
                        </label>
                        <input
                          type="number"
                          id="peopleCount"
                          value={peopleCount}
                          onChange={(e) => setPeopleCount(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                      <div className="flex-1">
                        <label
                          className="block font-semibold mb-1"
                          htmlFor="recipe"
                        >
                          Add Recipe
                        </label>
                        <Select
                          styles={{ menu: (provided) => ({ ...provided }) }}
                          onChange={handleRecipeChange}
                          options={recipeOptions}
                          isMulti
                          value={recipe}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                      <div className="flex-1">
                        <label
                          className="block font-semibold mb-1"
                          htmlFor="beverage"
                        >
                          Add Beverage Items
                        </label>
                        <Select
                          styles={{ menu: (provided) => ({ ...provided }) }}
                          isMulti
                          onChange={handleBeverageChange}
                          options={initialBeverageTypes}
                          value={selectedBeverages}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMeal}
                      className={`bg-${
                        isEditing ? "blue" : "green"
                      }-500 text-white p-2 rounded-md`}
                    >
                      {isEditing ? "Update Meal" : "Add Meal"}
                    </button>

                    <div className="mt-6">
                      <h3 className="text-2xl font-bold mb-4">Meals</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {meals.length === 0 && (
                          <div className="w-full p-4 text-center md:text-start rounded-md ">
                            No meals added yet.
                          </div>
                        )}
                        {meals.map((meal, index) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md"
                          >
                            <div className="flex justify-end mb-1">
                              <span
                                onClick={() => handleRemoveMeal(index)}
                                className="text-red-500 rounded-full mr-2"
                              >
                                <IoMdCloseCircleOutline className="text-2xl" />
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-green-50 p-2 rounded-md cursor-pointer">
                              <div className="flex flex-col">
                                <span className="text-[10px] md:text-sm flex items-center">
                                  <PiChefHat className="mr-2" /> Meal Type
                                </span>
                                <span className="text-lg md:text-xl uppercase">
                                  {meal.mealType}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] md:text-sm flex items-center">
                                  <IoTimeOutline className="mr-2" /> Time
                                </span>
                                <span className="text-lg md:text-xl">
                                  {meal.mealTime}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] md:text-sm flex items-center">
                                  <HiOutlineUsers className="mr-2" /> People
                                </span>
                                <span className="text-lg md:text-xl">
                                  {meal.peopleCount}
                                </span>
                              </div>
                            </div>

                            <p className="uppercase mt-4">
                              <strong>Recipes:</strong>
                            </p>
                            <ul className="list-disc list-inside">
                              {meal?.recipe.map((rec, recIndex) => (
                                <li key={recIndex}>{rec.value}</li>
                              ))}
                            </ul>

                            <p className="uppercase mt-4">
                              <strong>Beverage Items:</strong>
                            </p>
                            <ul className="list-disc list-inside">
                              {meal.selectedBeverages.map((bev, bevIndex) => (
                                <li key={bevIndex}>{bev.value}</li>
                              ))}
                            </ul>

                            <div className="flex mt-10 justify-end items-center">
                              <button
                                type="button"
                                onClick={() => handleEditMeal(index)}
                                className="bg-green-500 text-white p-2 rounded-md"
                              >
                                Edit Meal
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* create button for creating new order  */}
              <div className="w-full flex items-center justify-center mb-10 mt-16 py-10">
                <button
                  className="bg-gray-900 text-white px-4 py-2 shadow-lg border rounded-md"
                  onClick={handleOnCreateOrder}
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StepOne;
