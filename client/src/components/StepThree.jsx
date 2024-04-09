import React, { useState } from "react";
import Select from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import config from "../config/config";

const StepThree = ({ nextStep }) => {
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
  const options = [
    { value: "Vanilla", label: "vanilla" },
    { value: "Chocolate", label: "Chocolate" },
    { value: "StrewBerry", label: "StrewBerry" },
    { value: "Mango", label: "Mango" },
    { value: "fruit Cream", label: "Fruit Cream" },
    { value: "Custom", label: "Custom" },
    // Add more options as needed
  ];
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
  console.log(lunchIceCream);
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

  const handleNext = async () => {
    // Validation logic can be added here

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

    //get customer id
    const customerId = await localStorage.getItem("customerId");

    try {
      const response = await axios.post(
        `${config.apiUrl}/catering/new`,
        {
          customerId,
          breakfast,
          lunch,
          dinner,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      throw error;
    }

    nextStep();
  };

  return (
    <>
      <div className="p-6">
        {/* breakFast button */}
        <button
          className="bg-[#d1ece7] font-bold text-xl text-gray-800 hover:bg-gray-200 border-gray-400 hover:border-gray-500 py-2 px-4 rounded w-full flex justify-between mt-4 "
          onClick={() => setBreakfastMenuOpen(!breakfastMenuOpen)}
        >
          {" "}
          {/* Toggle lunchMenuOpen state */}
          <span>breakfast</span>
          <span>
            {" "}
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
              <label htmlFor="total count" className="p-2 font-bold">
                {" "}
                Total Pax Count
              </label>
              <input
                className="w-full p-2 border-2 outline-none"
                type="text"
                value={bfTotalPacCount}
                onChange={(e) => setBfTotalPacCount(e.target.value)}
                placeholder="Enter the count of PAX"
              />
            </div>

            {/* Snacks select div  */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Snacks (StreetFood)
              </label>
              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={StreetFoodOptions}
                isMulti
                value={selectedSnacksOptions}
                onChange={handleSnacksSelect}
              />
            </div>

            {/* Main Course Items  */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Main Course
              </label>
              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={vegMainCourseOptions}
                isMulti
                value={breakfastMainCourseOptions}
                onChange={handleBreakFastMainCourseSelect}
              />
            </div>

            {/* Soup and Salads */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Soups & Salads
              </label>
              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={SoupAndSaladOption}
                isMulti
                value={selectedSoupsAndSaladOptions}
                onChange={handleSoupAndSalad}
              />
            </div>
          </div>
        )}

        {/* Lunch button */}
        <button
          className="font-bold text-xl bg-[#00afb9] p-2 text-white hover:bg-[#0081a7] rounded  w-full flex justify-between mt-4"
          onClick={() => setLunchMenuOpen(!lunchMenuOpen)}
        >
          {/* Toggle lunchMenuOpen state */}
          <span>Lunch</span>
          <span>
            {" "}
            {lunchMenuOpen === true ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </span>
        </button>
        {lunchMenuOpen && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/*  */}
            <div>
              <label htmlFor="total count" className="p-2 font-bold">
                {" "}
                Total Pax Count
              </label>
              <input
                value={lunchTotalPackCount}
                onChange={(e) => setLunchTotalPackCount(e.target.value)}
                className="w-full p-2 border-2 outline-none"
                type="text"
                placeholder="Enter the count of PAX"
              />
            </div>

            {/*lunch Timeing  time */}
            <div>
              <label htmlFor="total count" className="p-2 font-bold">
                {" "}
                Lunch Time
              </label>
              <input
                value={lunchTime}
                onChange={(e) => setLunchTime(e.target.value)}
                className="w-full p-2 border-2 outline-none"
                type="time"
                placeholder="Enter the count of PAX"
              />
            </div>

            {/* Snacks select div  */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Snacks (StreetFood)
              </label>

              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={StreetFoodOptions}
                isMulti
                value={selectedLunchSnacksOptions}
                onChange={handleLunchSnacksSelect}
              />
            </div>

            {/* Main Course Items  */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Main Course
              </label>

              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={vegMainCourseOptions}
                isMulti
                value={selectedMainCourseOptions}
                onChange={handleMainCourseSelect}
              />
            </div>
            {/* Soup and Salads */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Soups & Salads
              </label>

              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={SoupAndSaladOption}
                isMulti
                value={selectedLunchSoupsOptions}
                onChange={handleLunchSoupsSelect}
              />
            </div>

            {/* ice Cream select div  */}
            <div className=" ">
              <label htmlFor="iceCream" className="p-2 font-bold">
                Ice Cream
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

        {/* Dinner button */}
        <button
          className="font-bold text-xl bg-[#0E7C7B] text-white  p-2 border-2  rounded  w-full flex justify-between mt-4"
          onClick={() => setDinnerMenuOpen(!dinnerMenuOpen)}
        >
          {/* Toggle dinnerMenuOpen state */}
          <span>Dinner</span>
          <span>
            {" "}
            {dinnerMenuOpen === true ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </span>
        </button>
        {dinnerMenuOpen && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/*  */}
            <div>
              <label htmlFor="total count" className="p-2 font-bold">
                {" "}
                Total Pax Count
              </label>
              <input
                value={dinnerTotalPackCount}
                onChange={(e) => setDinnerTotalPackCount(e.target.value)}
                className="w-full p-2 border-2 outline-none"
                type="text"
                placeholder="Enter the count of PAX"
              />
            </div>
            {/*Dinner Timeing  time */}
            <div>
              <label htmlFor="total count" className="p-2 font-bold">
                {" "}
                Dinner Time
              </label>
              <input
                value={dinnerTime}
                onChange={(e) => setDinnerTime(e.target.value)}
                className="w-full p-2 border-2 outline-none"
                type="time"
                placeholder="Enter the count of PAX"
              />
            </div>

            {/* Snacks select div  */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Snacks (StreetFood)
              </label>

              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={StreetFoodOptions}
                isMulti
                value={dinnerSnacksOptions}
                onChange={handleDinnerSnacksSelect}
              />
            </div>

            {/* Main Course Items  */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Main Course
              </label>

              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={vegMainCourseOptions}
                isMulti
                value={dinnerMainCourseOptions}
                onChange={handleDinnerMainCourseSelect}
              />
            </div>
            {/* Soup and Salads */}
            <div>
              <label htmlFor="iceCream" className="p-2 font-bold">
                Soups & Salads
              </label>

              <Select
                style={{ maxHeight: "200px", overflowY: "auto" }}
                options={SoupAndSaladOption}
                isMulti
                value={dinnerSoupsOptions}
                onChange={handleDinnerSoups}
              />
            </div>

            {/* ice Cream select div  */}
            <div className=" ">
              <label htmlFor="iceCream" className="p-2 font-bold">
                Ice Cream
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
      <button onClick={handleNext} className="m-10 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        Next
      </button>
    </>
  );
};

export default StepThree;
