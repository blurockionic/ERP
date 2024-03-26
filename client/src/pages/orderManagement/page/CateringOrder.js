import React, { useState } from "react";
import Select from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CateringOrder = () => {
  const [selectedSnacksOptions, setSelectedSnacksOptions] = useState([]);
  const [selectedSoupsAndSaladOptions, setSelectedSoupsAndSaladOptions] = useState([]);
  const [selectedMainCourseOptions, setSelectedMainCourseOptions] = useState([]);
  const [lunchMenuOpen, setLunchMenuOpen] = useState(false);
  const [breakfastMenuOpen, setBreakfastMenuOpen] = useState(false);
  const [breakfastMainCourseOptions, setBreakfastMainCourseOptions] = useState([]);
  const [breakfastIceCreamOptions, setBreakfastIceCreamOptions] = useState([]);
  const [selectedLunchSnacksOptions, setSelectedLunchSnacksOptions] = useState([]);
  const [selectedLunchSoupsOptions, setSelectedLunchSoupsOptions] = useState([]);
  const [dinnerSnacksOptions, setDinnerSnacksOptions] = useState([]);
  const [dinnerMainCourseOptions, setDinnerMainCourseOptions] = useState([]);
  const [dinnerSoupsOptions, setDinnerSoupsOptions] = useState([]);
  const [dinnerIceCreamOptions, setDinnerIceCreamOptions] = useState([]);
  const [dinnerMenuOpen,setDinnerMenuOpen] = useState([])

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
  };
  // lunch Snacks handle
  const handleLunchSnacksSelect = (lunchSnacksOptions) => {
    setSelectedLunchSnacksOptions(lunchSnacksOptions);
  };
  // lunch soups handle
  const handleLunchSoupsSelect = (lunchSoupsOptions) => {
    setSelectedLunchSoupsOptions(lunchSoupsOptions);
  };

  // dinner  Snacks handle
  const handleDinnerSnacksSelect = (dinnerSnacksOptions) => {
    setDinnerSnacksOptions(dinnerSnacksOptions);
  };
  // dinner main course handle
  const handleDinnerMainCourseSelect = (dinnerMainCourse) => {
    setDinnerMainCourseOptions(dinnerMainCourse);
  };
  // dinner Soups  handle
  const handleDinnerSoups = (dinnerSoups) => {
    setDinnerSoupsOptions(dinnerSoups);
  };
  // dinner ice cream handle
  const handleDinnerIceCream = (dinnerIceCream) => {
    setDinnerIceCreamOptions(dinnerIceCream);
  };
  // breakfastmaincourse handle items
  const handleBreakFastMainCourseSelect = (breakfastMaincourse) => {
    setBreakfastMainCourseOptions(breakfastMaincourse);
  };
  //   main course handler
  const handleMainCourseSelect = (mainCourse) => {
    setSelectedMainCourseOptions(mainCourse);
  };

  // snaccks option handler
  const handleSnacksSelect = (selectedSnacks) => {
    setSelectedSnacksOptions(selectedSnacks);
  };

  //   Soup and Salad Handler
  const handleSoupAndSalad = (SoupsAndSalad) => {
    setSelectedSoupsAndSaladOptions(SoupsAndSalad);
  };

  return (
    <>
      <div className="p-6">
        {/* breakFast button */}
        <button
          className="bg-[#d1ece7] font-bold text-xl text-gray-800 hover:bg-gray-200 border-gray-400 hover:border-gray-500 py-2 px-4 rounded w-full flex justify-between mt-4"
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
          <div className="grid grid-cols-2 gap-4 p-3">
            {/* Total Pax Count */}
            <div>
              <label htmlFor="total count" className="p-2 font-bold">
                {" "}
                Total Pax Count
              </label>
              <input
                className="w-full p-2 border-2 outline-none"
                type="text"
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
                className="w-full p-2 border-2 outline-none"
                type="text"
                placeholder="Enter the count of PAX"
              />
            </div>

            {/*lunch Timeing  time */}
            <div>
              <label htmlFor="total count" className="p-2 font-bold">
                {" "}
                Dinner Time
              </label>
              <input
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
    </>
  );
};

export default CateringOrder;
