import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-datetime/css/react-datetime.css";
import config from "../config/config";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";

const StepOne = ({ nextStep }) => {
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
  const [dateAndTime, setDateAndTime] = useState("");
  const [status, setStatus] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [itemNameTent, setItemNameTent] = useState("");
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

  const [selectedSnacksOptions, setSelectedSnacksOptions] = useState([]);
  const [selectedSoupsAndSaladOptions, setSelectedSoupsAndSaladOptions] =
    useState([]);
  const [selectedMainCourseOptions, setSelectedMainCourseOptions] = useState(
    []
  );
  const [lunchMenuOpen, setLunchMenuOpen] = useState(false);
  const [breakfastMenuOpen, setBreakfastMenuOpen] = useState(false);
  const [breakfastMainCourseOptions, setBreakfastMainCourseOptions] = useState(
    []
  );
  const [breakfastIceCreamOptions, setBreakfastIceCreamOptions] = useState([]);
  const [selectedLunchSnacksOptions, setSelectedLunchSnacksOptions] = useState(
    []
  );
  const [selectedLunchSoupsOptions, setSelectedLunchSoupsOptions] = useState(
    []
  );
  const [dinnerSnacksOptions, setDinnerSnacksOptions] = useState([]);
  const [dinnerMainCourseOptions, setDinnerMainCourseOptions] = useState([]);
  const [dinnerSoupsOptions, setDinnerSoupsOptions] = useState([]);
  const [dinnerIceCreamOptions, setDinnerIceCreamOptions] = useState([]);
  const [dinnerMenuOpen, setDinnerMenuOpen] = useState([]);

  //breakfast
  const [bfTotalPacCount, setBfTotalPacCount] = useState("");
  const [bfSnacks, setBfSnacks] = useState([]);
  const [bfSoupAndSalad, setBfSoupAndSalad] = useState([]);
  const [bfMainCourse, setBfMainCourse] = useState([]);

  //lunch
  const [lunchTotalPackCount, setLunchTotalPackCount] = useState("");
  const [lunchTime, setLunchTime] = useState("");
  const [lunchSnacks, setLunchSnacks] = useState([]);
  const [lunchMainCourse, setLunchMainCourse] = useState([]);
  const [lunchSoupAndSalad, setLunchSoupAndSalad] = useState([]);
  const [lunchIceCream, setLunchIceCream] = useState([]);

  //lunch
  const [dinnerTotalPackCount, setDinnerTotalPackCount] = useState("");
  const [dinnerTime, setDinnerTime] = useState("");
  const [dinnerSnacks, setDinnerSnacks] = useState([]);
  const [dinnerMainCourse, setDinnerMainCourse] = useState([]);
  const [dinnerSoupAndSalad, setDinnerSoupAndSalad] = useState([]);
  const [dinnerIceCream, setDinnerIceCream] = useState([]);

  // ice Cream
  const options = [];
  // street food  or catering type
  const StreetFoodOptions = [
    { value: "Paneer Tikka", label: "Paneer Tikka" },
    { value: "Paneer Roll", label: "Paneer Roll" },
    { value: "Paneer 65", label: "Paneer 65" },
    { value: "Achari Paneer Tikka ", label: "Achari Paneer Tikka" },
    { value: "Paneer Malai Tikka ", label: "Paneer Malai Tikka" },
    { value: "Haryali Paneer Tikka ", label: " Hariyali Paneer Tikka" },
    { value: "Paneer Malai  ", label: "Paneer Malai" },
    {
      value: "Tandoori Gobi / Gobi Tikka ",
      label: "Tandoori Gobi /Gobi Tikka",
    },
    { value: "Aloo Tikka ", label: "Aloo tikka" },
    { value: "Mushroom Tikka ", label: "Mushroom Tikka " },
    { value: "cutlet ", label: "Cutlet" },
    { value: "Harabhara Kabab ", label: "Harabhara Kabab" },
    { value: "Dahi Kabab", label: "Dahi Kabab" },
    { value: "Paneer Cutlet", label: "Paneer Cutlet" },
    { value: "French Fries", label: "French Fries" },
    { value: "Garlic Bread", label: "Garlic Bread" },
  ];

  //   option of Soups and Salads
  const SoupAndSaladOption = [
    { value: "Tomato Soup", label: "Tomato Soup" },
    { value: "Sweet Corn Soup", label: "Sweet Corn Soup" },
    { value: "Vegitable Soup", label: "Vegetable Soup" },
    { value: "Carrot Soup", label: "Carrot Soup" },
    { value: "Mashroom Soup", label: "Mashroom Soup" },
    { value: "Hot And Sour Soup", label: "Hot And Sour Soup" },
    { value: "Manchow Soup", label: "Manchaow soup" },
    { value: "Pasta Salad", label: "Pasta Salad" },
    { value: "vegetable Salad", label: "Vegetable Salad" },
    { value: "Kachumber Salad", label: "Kachumber Salad" },
    { value: "Onion Salad", label: "Onion Salad" },
    { value: "Sprouts Salad", label: "Sprouts Salad" },
    { value: "fruit Salad", label: "Fruit Salad" },
    { value: "Carrot  Potato Salad", label: "Carrot Salad" },
    // Add more items here.
  ];
  // veg main course  options
  const vegMainCourseOptions = [
    { value: "Matar Paneer", label: "Matar Paneer" },
    { value: "Dal Makhani", label: "Dal Makhani" },

    { value: "kadhi", label: "kadhi" },
    { value: "Chana masala", label: "Chana masala" },
    { value: "Kofta ", label: "Kofta" },
    { value: "Palak paneer", label: "Palak paneer" },
    { value: "Rajma", label: "Rajma" },
    { value: "Vegetable fried rice", label: "Vegetable fried rice" },
    { value: "Aloo gobi", label: "Aloo gobi" },
    { value: "Authentic saag paneer", label: "Authentic saag paneer" },

    { value: "Chilli paneer", label: "Chilli paneer" },
    { value: "Dal", label: "Dal" },
    { value: "Pav bhaji", label: "Pav bhaji" },
    { value: "Tawa Veg", label: "Tawa veg" },
    { value: "Baingan bharta", label: "Baingan bharta" },
    { value: "Basanti Pulao", label: "Basanti Pulao" },
    { value: "Navratan Korma", label: "Navratan Korma" },
    { value: "Urad Dal  (Maa ki Dal)", label: "Urad Dal  (Maa ki Dal)" },
    { value: "Saag Paneer", label: "Saag Paneer" },

    { value: "Matar Paneer ", label: "Matar Paneer" },
    { value: "Chole Masala", label: "Chole Masala" },
    { value: "Easy Aloo Palak", label: "Easy Aloo Palak" },
    { value: "Moong Dal Tadka", label: "Moong Dal Tadka" },
    { value: "Paneer Bhurji", label: "Paneer Bhurji" },

    { value: "Mixed Veg", label: "Mixed Veg" },
    { value: "Paneer Butter Masala ", label: "Paneer Butter Masala " },
    { value: "Paneer Tikka Masala", label: "Paneer Tikka Masala" },
    { value: "Aloo Matar", label: "Aloo Matar" },
    { value: "Kadai Paneer", label: "Kadai Paneer" },

    { value: "Chana Masala", label: "Chana Masala" },
    { value: "Achari Bhindi", label: "Achari Bhindi" },
    { value: "Gajar Matar Sabzi", label: "Gajar Matar Sabzi" },
    { value: "Matar mashroom", label: "Matar Mushroom" },

    { value: "Chana Dal ", label: "Chana Dal " },
    { value: "Methi Matar Malai", label: "Methi Matar Malai" },
  ];

  //fetch all the inventpry
  useEffect(() => {
    const fetchInventoryItem = async () => {
      const response = await axios.get(`${config.apiUrl}/inventory/all`, {
        withCredentials: true,
      });
      const { statusText, data } = response;
      if (statusText === "OK") {
        setInventoryItems(data);
      }
    };

    const fetchRecipeItem = async () => {
      const response = await axios.get(`${config.apiUrl}/recipe/all`, {
        withCredentials: true,
      });
      const { success, recipes } = response.data;
      if (success) {
        setAllRecipe(recipes);
      }
    };

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
  const deserts = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Deserts"
  );
  const soupAndSalad = allRecipe.filter(
    (recipe) => recipe.recipeSubCategory === "Soup and Stews"
  );

  const lengthOfMainCourseItem = mainCourse.length;
  for (let i = 0; i < lengthOfMainCourseItem; i++) {
    options.push({
      label: mainCourse[i].recipeName,
      value: mainCourse[i].recipeName,
    })
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
  }

  // Handle date and time change
  const handleDateAndTimeChange = (event) => {
    console.log(event.target.value);
    setDateAndTime(event.target.value);
  };

  // Determine the status based on the order date

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
  //add item for tent
  const handleAddItemTent = () => {
    const data = {
      itemNameTent,
      itemCountForOrderTent,
    };

    addMultipleItems(data);
    // set default all the value
    setItemCountForOrderTent("");
    setItemCountTent("");
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
    const breakfast = {
      totalPackCount: bfTotalPacCount,
      snacks: bfSnacks,
      soupAndSalad: bfSoupAndSalad,
      mainCourse: bfMainCourse,
    };
    const lunch = {
      totalPackCount: lunchTotalPackCount,
      time: lunchTime,
      snacks: lunchSnacks,
      mainCourse: lunchMainCourse,
      soupAndSalad: lunchSoupAndSalad,
      iceCream: lunchIceCream,
    };
    const dinner = {
      totalPackCount: dinnerTotalPackCount,
      time: dinnerTime,
      snacks: dinnerSnacks,
      mainCourse: dinnerMainCourse,
      soupAndSalad: dinnerSoupAndSalad,
      iceCream: dinnerIceCream,
    };

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

    let tentOrder = formDataTent.itemList;

    let bistarOrder = formDataBistar.itemList;

    let lightOrder = formDataLight.itemList;

    // console.log(lightOrder);

    let cateringOrder = {
      lunch,
      dinner,
      breakfast,
    };

    try {
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
          cateringOrder,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      const { success } = response.data;
      if (success) {
        alert("Order created successfully!");
        navigate("../order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // lunch ice cream handle
  const handleLunchIceCreamChange = (iceCreamOptions) => {
    setBreakfastIceCreamOptions(iceCreamOptions);
    for (let item of iceCreamOptions) {
      // Check if the value already exists in setBfSnacks array
      if (!lunchIceCream.includes(item.value)) {
        setLunchIceCream((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // lunch Snacks handle
  const handleLunchSnacksSelect = (lunchSnacksOptions) => {
    setSelectedLunchSnacksOptions(lunchSnacksOptions);
    for (let item of lunchSnacksOptions) {
      // Check if the value already exists in setBfSnacks array
      if (!lunchSnacks.includes(item.value)) {
        setLunchSnacks((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // lunch soups handle
  const handleLunchSoupsSelect = (lunchSoupsOptions) => {
    setSelectedLunchSoupsOptions(lunchSoupsOptions);
    for (let item of lunchSoupsOptions) {
      // Check if the value already exists in setBfSnacks array
      if (!lunchSoupAndSalad.includes(item.value)) {
        setLunchSoupAndSalad((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  //  lunch main course handler
  const handleMainCourseSelect = (mainCourse) => {
    setSelectedMainCourseOptions(mainCourse);
    for (let item of mainCourse) {
      // Check if the value already exists in setBfSnacks array
      if (!lunchMainCourse.includes(item.value)) {
        setLunchMainCourse((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // dinner  Snacks handle
  const handleDinnerSnacksSelect = (dinnerSnacksOptions) => {
    setDinnerSnacksOptions(dinnerSnacksOptions);
    for (let item of dinnerSnacksOptions) {
      // Check if the value already exists in setBfSnacks array
      if (!dinnerSnacks.includes(item.value)) {
        setDinnerSnacks((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // dinner main course handle
  const handleDinnerMainCourseSelect = (dinnerMainCourseOption) => {
    setDinnerMainCourseOptions(dinnerMainCourseOption);
    for (let item of dinnerMainCourseOption) {
      // Check if the value already exists in setBfSnacks array
      if (!dinnerMainCourse.includes(item.value)) {
        setDinnerMainCourse((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // dinner Soups  handle
  const handleDinnerSoups = (dinnerSoups) => {
    setDinnerSoupsOptions(dinnerSoups);
    for (let item of dinnerSoups) {
      // Check if the value already exists in setBfSnacks array
      if (!dinnerSoupAndSalad.includes(item.value)) {
        setDinnerSoupAndSalad((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };
  // dinner ice cream handle
  const handleDinnerIceCream = (dinnerIceCreamOption) => {
    setDinnerIceCreamOptions(dinnerIceCreamOption);
    for (let item of dinnerIceCreamOption) {
      // Check if the value already exists in setBfSnacks array
      if (!dinnerIceCream.includes(item.value)) {
        setDinnerIceCream((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // breakfast maincourse handle items
  const handleBreakFastMainCourseSelect = (breakfastMaincourse) => {
    setBreakfastMainCourseOptions(breakfastMaincourse);

    for (let item of breakfastMaincourse) {
      // Check if the value already exists in setBfSnacks array
      if (!bfMainCourse.includes(item.value)) {
        setBfMainCourse((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // beakfast snacks option handler
  const handleSnacksSelect = (selectedSnacks) => {
    setSelectedSnacksOptions(selectedSnacks);

    for (let item of selectedSnacks) {
      // Check if the value already exists in setBfSnacks array
      if (!bfSnacks.includes(item.value)) {
        setBfSnacks((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  // breack fast  Soup and Salad Handler
  const handleSoupAndSalad = (SoupsAndSalad) => {
    setSelectedSoupsAndSaladOptions(SoupsAndSalad);

    for (let item of SoupsAndSalad) {
      // Check if the value already exists in setBfSnacks array
      if (!bfSoupAndSalad.includes(item.value)) {
        setBfSoupAndSalad((prevSnacks) => [...prevSnacks, item.value]);
      }
    }
  };

  return (
    <>
      <Toaster />
      {/* form  */}
      <div className="h-screen  overflow-x-hidden bg-gray-50">
        {/* <div className="font-bold text-center text-lg uppercase border-b-2 flex flex-row justify-between py-2  bg-white w-full">
          <div className="mx-2">
            <Link to={"../order"}>
              <Tooltip title="back to order details " placement="bottom" arrow>
                <button className="rounded  py-2 px-6 text-center align-middle text-xs font-bold bg-white border  shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Back
                </button>
              </Tooltip>
            </Link>
          </div>
          <div> Customer Details</div>
          <div></div>
        </div> */}
        <div className="w-full bg-white py-2 px-2 shadow text-center">
          {" "}
          <span className="text-lg uppercase">New Order </span>
        </div>

        <div className="mt-8 mb-20 overflow-hidden overflow-x-hidden w-[90%] rounded-md mx-auto bg-white border shadow-lg">
          <div className="w-full bg-gray-50 py-2 px-2 shadow text-start">
            <span className="text-sm uppercase mx-2">Customer Details</span>
          </div>

          <div className="grid grid-cols-2 gap-8 m-4  ">
            <div className="relative">
              <input
                type="text"
                name="customer name"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none   disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Customer Name
              </label>
            </div>
            <div className="relative ">
              <input
                type="text"
                name=""
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Address
              </label>
            </div>
            <div className="relative">
              <input
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                type="tel"
                required={true}
                id="phoneNumber"
                name="phoneNumber"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                <span className="relative">
                  Mobile Number <sup className="text-red-800">*</sup>
                </span>
              </label>

              {/* Remark for phone number */}
              {customerPhoneNumber &&
                (customerPhoneNumber.startsWith("0") ||
                  customerPhoneNumber.startsWith("+91")) && (
                  <p className="text-red-500 text-sm">
                    Phone number should not start with 0 or +91
                  </p>
                )}
            </div>
            <div className="relative">
              <input
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                type="email"
                required={true}
                id="alternateNumber"
                name="alternateNumber"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Email (Optional)
              </label>
            </div>
            <div className="relative">
              <input
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                type="datetime-local"
                value={dateAndTime}
                onChange={(e) => handleDateAndTimeChange(e)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                <b>Date and Time</b>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer w-full h-[40px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                type="text"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
              <label className="flex w-full h-[40px] select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Other Details
              </label>
            </div>
          </div>
          {/* <div className="flex justify-center mt-20">
            <button
              onClick={handleNext}
              disabled={isLoading} // Disable the button if loading
              className="select-none rounded bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? "Loading..." : "Save & Next"}
            </button>
          </div> */}

          {/* order category  */}
          <div className="w-full bg-gray-50 py-2 px-2 shadow text-start">
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
              <span className="bg-gray-200 w-auto px-5 py-1">Tent Order</span>
              <div className="flex items-center space-x-4 p-3">
                <div className="flex flex-col">
                  <label className="text-sm mx-2">Item Name:</label>
                  <Select
                    onChange={handleSelectChangeTent}
                    options={optionsTent}
                    className="w-64 py-1 px-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm">Count: {itemCountTent}</label>
                  <input
                    type="number"
                    value={itemCountForOrderTent}
                    onWheel={(e) => e.preventDefault()}
                    onChange={(e) => setItemCountForOrderTent(e.target.value)}
                    className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleAddItemTent();
                  }}
                  className="bg-gray-50 font-semibold px-4 py-2 mt-5 shadow rounded uppercase"
                >
                  Add Item
                </button>
              </div>
              {/* list of item  */}
              <div className="w-full mx-auto p-4">
                <h2 className="text-sm font-semibold  mb-2">List of Items</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 ">S.no</th>
                      <th className="p-2 ">Item Name</th>
                      <th className="p-2">Count</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDataTent.itemList.map((item, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2 text-center">{item.itemNameTent}</td>
                        <td className="p-2 text-center">
                          {item.itemCountForOrderTent}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeItemTent(index)}
                            className="bg-red-100 px-3 py-1 rounded-full border"
                          >
                            Remove
                          </button>
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
              <span className="bg-gray-200 w-auto px-5 py-1">Bistar Order</span>
              <div className="flex items-center space-x-4  p-4">
                <div className="flex flex-col">
                  <label className="text-sm mx-2">Item Name:</label>
                  <Select
                    defaultValue={itemNameBistar}
                    onChange={handleSelectChangeBistar}
                    options={optionsBistar}
                    className="w-64 py-1 px-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm mx-2">
                    Count: {itemCountBistar}
                  </label>
                  <input
                    type="number"
                    value={itemCountForOrderBistar}
                    onWheel={(e) => e.preventDefault()}
                    onChange={(e) => setItemCountForOrderBistar(e.target.value)}
                    className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleAddItemBistar();
                  }}
                  className="bg-gray-100  font-semibold shadow px-4 py-2 mt-5 rounded uppercase"
                >
                  Add Item
                </button>
              </div>
              {/* list of item  */}
              <div className="w-full mx-auto p-4">
                <h2 className="text-sm font-semibold  mb-2">List of Items</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 ">S.no</th>
                      <th className="p-2 ">Item Name</th>
                      <th className="p-2">Count</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDataBistar.itemList.map((item, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2 text-center">
                          {item.itemNameBistar}
                        </td>
                        <td className="p-2 text-center">
                          {item.itemCountForOrderBistar}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeItemBistar(index)}
                            className="bg-red-100 px-3 py-1 rounded-full border"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* light order  */}
          {isLightModelOpen && (
            <div className="p-4">
              <span className="bg-gray-200 w-auto px-5 py-1">Light Order</span>
              <div className="flex items-center space-x-4 p-4">
                <div className="flex flex-col">
                  <label className="text-sm mx-2">Item Name</label>
                  <Select
                    defaultValue={setItemNameLight}
                    onChange={handleSelectChangeLight}
                    options={optionsLight}
                    className="w-64 py-1 px-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm mx-2">
                    Count: {itemCountLight}
                  </label>
                  <input
                    type="number"
                    value={itemCountForOrderLight}
                    onWheel={(e) => e.preventDefault()}
                    onChange={(e) => setItemCountForOrderLight(e.target.value)}
                    className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleAddItemLight();
                  }}
                  className="bg-gray-100  font-semibold shadow px-4 py-2 mt-5 rounded uppercase"
                >
                  Add Item
                </button>
              </div>
              {/* list of item  */}
              <div className="w-full mx-auto p-4">
                <h2 className="text-sm font-semibold mb-4">List of Items</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 ">S.no</th>
                      <th className="p-2 ">Item Name</th>
                      <th className="p-2">Count</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDataLight.itemList.map((item, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2 text-center">
                          {item.itemNameLight}
                        </td>
                        <td className="p-2 text-center">
                          {item.itemCountForOrderLight}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeItemLight(index)}
                            className="bg-red-100 px-3 py-1 rounded-full border"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* catering order  */}
          {isCateringModelOpen && (
            <div className="p-4">
              <span className="bg-gray-200 w-auto px-5 py-1">
                Catering Order
              </span>
              <div className="px-6 ">
                {/* breakFast button */}
                <div className="bg-white shadow-sm">
                  <button
                    className="border-b font-bold text-xl text-slate-800  hover:border-gray-50 py-2 px-4  w-full flex justify-between mt-4 "
                    onClick={() => setBreakfastMenuOpen(!breakfastMenuOpen)}
                  >
                    {/* Toggle lunchMenuOpen state */}
                    <span className="text-center font-normal">Breakfast</span>
                    <span>
                      {breakfastMenuOpen === true ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </span>
                  </button>
                  {breakfastMenuOpen && (
                    <div className="grid grid-cols-2 gap-4 p-3 ">
                      {/* Total Pax Count */}
                      <div>
                        <label htmlFor="total count" className="font-normal">
                          Total Pax Count
                        </label>
                        <input
                          className="w-full p-[6px] border border-gray-300 outline-none rounded"
                          type="text"
                          value={bfTotalPacCount}
                          onChange={(e) => setBfTotalPacCount(e.target.value)}
                          placeholder="Enter the count of PAX"
                        />
                      </div>

                      {/* Snacks select div  */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Breakfast
                        </label>
                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={selectedSnacksOptions}
                          onChange={handleSnacksSelect}
                        />
                      </div>

                      {/* Main Course Items  */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Brunch
                        </label>
                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={breakfastMainCourseOptions}
                          onChange={handleBreakFastMainCourseSelect}
                        />
                      </div>

                      {/* Soup and Salads */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Soups & Salads
                        </label>
                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={selectedSoupsAndSaladOptions}
                          onChange={handleSoupAndSalad}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Lunch button */}
                <div className="bg-white shadow-sm">
                  <button
                    className="border-b font-bold text-xl text-slate-800  hover:border-gray-50 py-2 px-4  w-full flex justify-between mt-4 "
                    onClick={() => setLunchMenuOpen(!lunchMenuOpen)}
                  >
                    {/* Toggle lunchMenuOpen state */}
                    <span className="font-normal">Lunch</span>
                    <span>
                      {lunchMenuOpen === true ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </span>
                  </button>
                  {lunchMenuOpen && (
                    <div className="grid grid-cols-2 gap-4 p-2">
                      {/*  */}
                      <div>
                        <label htmlFor="total count" className="font-normal">
                          Total Pax Count
                        </label>
                        <input
                          value={lunchTotalPackCount}
                          onChange={(e) =>
                            setLunchTotalPackCount(e.target.value)
                          }
                          className="w-full p-[6px] border border-gray-300 outline-none rounded"
                          type="text"
                          placeholder="Enter the count of PAX"
                        />
                      </div>

                      {/*lunch Timeing  time */}
                      <div>
                        <label htmlFor="total count" className="font-normal">
                          {" "}
                          Lunch Time
                        </label>
                        <input
                          value={lunchTime}
                          onChange={(e) => setLunchTime(e.target.value)}
                          className="w-full p-[5px] border border-gray-300 outline-none rounded"
                          type="time"
                          placeholder="Enter the count of PAX"
                        />
                      </div>

                      {/* Snacks select div  */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Starter
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={selectedLunchSnacksOptions}
                          onChange={handleLunchSnacksSelect}
                        />
                      </div>

                      {/* Main Course Items  */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Main Course
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={selectedMainCourseOptions}
                          onChange={handleMainCourseSelect}
                        />
                      </div>
                      {/* Soup and Salads */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Soups & Salads
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={selectedLunchSoupsOptions}
                          onChange={handleLunchSoupsSelect}
                        />
                      </div>

                      {/* ice Cream select div  */}
                      <div className=" ">
                        <label htmlFor="iceCream" className="font-normal">
                          Dessert
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={breakfastIceCreamOptions}
                          onChange={handleLunchIceCreamChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Dinner button */}
                <div className="bg-white shadow-sm">
                  <button
                    className="border-b font-bold text-xl text-slate-800  hover:border-gray-50 py-2 px-4  w-full flex justify-between mt-4 "
                    onClick={() => setDinnerMenuOpen(!dinnerMenuOpen)}
                  >
                    {/* Toggle dinnerMenuOpen state */}
                    <span className="font-normal">Dinner</span>
                    <span>
                      {dinnerMenuOpen === true ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </span>
                  </button>
                  {dinnerMenuOpen && (
                    <div className="grid grid-cols-2 gap-4  p-2">
                      {/*  */}
                      <div>
                        <label htmlFor="total count" className="font-normal">
                          Total Pax Count
                        </label>
                        <input
                          value={dinnerTotalPackCount}
                          onChange={(e) =>
                            setDinnerTotalPackCount(e.target.value)
                          }
                          className="w-full p-[6px] border border-gray-300 outline-none rounded"
                          type="text"
                          placeholder="Enter the count of PAX"
                        />
                      </div>
                      {/*Dinner Timeing  time */}
                      <div>
                        <label htmlFor="total count" className="font-normal">
                          {" "}
                          Dinner Time
                        </label>
                        <input
                          value={dinnerTime}
                          onChange={(e) => setDinnerTime(e.target.value)}
                          className="w-full p-[5px] border border-gray-300 outline-none rounded"
                          type="time"
                          placeholder="Enter the count of PAX"
                        />
                      </div>

                      {/* Snacks select div  */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Starter
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={dinnerSnacksOptions}
                          onChange={handleDinnerSnacksSelect}
                        />
                      </div>

                      {/* Main Course Items  */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Main Course
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={dinnerMainCourseOptions}
                          onChange={handleDinnerMainCourseSelect}
                        />
                      </div>
                      {/* Soup and Salads */}
                      <div>
                        <label htmlFor="iceCream" className="font-normal">
                          Soups & Salads
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={dinnerSoupsOptions}
                          onChange={handleDinnerSoups}
                        />
                      </div>

                      {/* ice Cream select div  */}
                      <div className=" ">
                        <label htmlFor="iceCream" className="font-normal">
                          Dessert
                        </label>

                        <Select
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                          options={options}
                          isMulti
                          value={dinnerIceCreamOptions}
                          onChange={handleDinnerIceCream}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* create button for creating new order  */}
          <div className="w-full flex items-center justify-center mb-6">
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
  );
};

export default StepOne;
