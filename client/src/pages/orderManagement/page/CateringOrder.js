import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import Datetime from "react-datetime";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Select from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CateringOrder = ({ setShowModel }) => {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderItems, setorderItems] = useState({});

  //usestate for bistar order
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedSnacksOptions, setSelectedSnacksOptions] = useState([]);
  const [selectedSoupsAndSaladOptions, setSelectedSoupsAndSaladOptions] =
    useState([]);
  const [selectedMainCourseOptions, setSelectedMainCourseOptions] = useState(
    []
  );

  const [lunchMenuOpen, setLunchMenuOpen] = useState(false);
  const [breakfastMenuOpen, setBreakfastMenuOpen] = useState(false);

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

  //   main course handler
  const handleMainCourseSelect = (mainCourse) => {
    setSelectedMainCourseOptions(mainCourse);
  };

  // snaccks option handler
  const handleSnacksSelect = (selectedSnacks) => {
    setSelectedSnacksOptions(selectedSnacks);
  };
  // icecream handler
  const handleMultiSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  //   Soup and Salad Handler
  const handleSoupAndSalad = (SoupsAndSalad) => {
    setSelectedSoupsAndSaladOptions(SoupsAndSalad);
  };

  const handleCountChange = (e, item) => {
    const { value } = e.target;
    setorderItems({ ...orderItems, [item]: parseInt(value) });
  };

  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };

  const handleChangeAlternateNumber = (e) => {
    const { value } = e.target;
    setAlternateNumber(value);
  };

  // date and time handle function
  const handleDateTimeChange = (moment) => {
    setDateAndTime(moment);
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 2);
    }
  };

  // step back hander
  const backButtonHandler = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  return (
    <>
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm ">
        <div className="bg-white rounded-sm w-[50%] h-[90%] p-2 overflow-y-scroll ">
          {/* data fields  */}

          <div className="  border-b-2 flex w-full  justify-between p-2 rounded font-bold text-xl text-black">
            <div className=" ">
              <Tooltip title="Back" placement="bottom" arrow>
                <button
                  className=" text-back font-bold rounded-sm"
                  onClick={backButtonHandler}
                >
                  <ArrowBackIcon />
                </button>
              </Tooltip>
            </div>
            <span> Manage Catering </span>
            {/* close button */}
            <div className=" ">
              <Tooltip title="cancel" placement="bottom" arrow>
                <button
                  className=" text-back font-bold rounded-sm"
                  onClick={() => setShowModel(false)}
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          {/* upper Design div */}
          <div className="flex flex-row justify-between mb-3 p-2">
            <span
              className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2 ml-4
          ${step === 1 ? "text-green-800 bg-slate-300" : "text-gray-500"}`}
            >
              1
            </span>
            <span
              className={` text-gray-500 
           ${
             step >= 2 ? "opacity-100 text-green-600 font-bold " : "opacity-50"
           }`}
            >
              .................................................
            </span>
            <span
              className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2
           ${step === 2 ? "text-green-800 " : "text-gray-500"}`}
            >
              2
            </span>
            <span
              className={` text-gray-500 
           ${
             step > 2 ? "opacity-100 text-green-600 font-bold " : "opacity-50"
           }`}
            >
              .................................................
            </span>
            <span
              className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2 mr-4
           ${step === 3 ? "text-green-800" : "text-gray-500"}`}
            >
              3
            </span>
          </div>

          {/* step 1 div input */}
          <div className="px-6">
            {step === 1 && (
              <>
                {" "}
                <div className="font-bold text-center text-lg uppercase border-b-2 ">
                 Event Details
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Mobile number  and Alternate mobile number */}
                  <div className="mt-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number
                      <sup>*</sup>
                    </label>
                    <input
                      type="tel"
                      required={true}
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handleChangePhoneNumber}
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-2 border rounded-md mb-4"
                    />

                    <label
                      htmlFor="alternateNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Alternate Number
                    </label>
                    <input
                      type="tel"
                      id="alternateNumber"
                      name="alternateNumber"
                      value={alternateNumber}
                      onChange={handleChangeAlternateNumber}
                      placeholder="Enter alternate number (optional)"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    {/*Customer  name*/}
                    <div className="relative mt-2">
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor=""
                      >
                        Customer Name{" "}
                      </label>
                      <input
                        type="text"
                        name="customer Name"
                        placeholder="Enter name"
                        className="w-full px-4 py-2 pl-4 border rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Date and time  */}
                    <div className="mt-4 ">
                      <label
                        htmlFor="dateTime"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date and Time
                      </label>
                      <Datetime
                        inputProps={{
                          id: "dateTime",
                          className: "w-full px-4 py-2 border rounded-md",
                        }}
                        value={dateAndTime}
                        onChange={handleDateTimeChange}
                      />
                    </div>
                  </div>
                  {/* other Details  */}
                  <div className="relative ">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium text-gray-700"
                    >
                      Other Details{" "}
                    </label>
                    <input
                      type="text"
                      placeholder="other details....."
                      className="w-full px-4 py-2 pl-4 border rounded-md"
                      value={otherDetails}
                      onChange={(e) => setOtherDetails(e.target.value)}
                    />
                  </div>
                  {/* Enter Address */}
                  <div className="relative">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor=""
                    >
                      Enter address{" "}
                    </label>
                    <input
                      type="text"
                      name="Address"
                      placeholder="Enter your address..."
                      className="w-full px-4 py-2 pl-4 border rounded-md"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          {/* step 2 input fields  */}
          {step === 2 && (
            <>
              <div className="p-6">
                {/* breakFast button */}
                <button
                  className="font-bold text-xl bg-[#ea638c] p-2 text-white hover:bg-[#89023e] rounded mt-4 w-[12rem] flex justify-between"
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
                        value={selectedSoupsAndSaladOptions}
                        onChange={handleSoupAndSalad}
                      />
                    </div>

                    {/* Ice Cream select div  */}
                    {/* <div className="">
                    <label htmlFor="iceCream" className="p-2 font-bold">
                      Ice Cream
                    </label>
                    <Select
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                      options={options}
                      isMulti
                      value={selectedOptions}
                      onChange={handleMultiSelectChange}
                    />
                  </div> */}
                  </div>
                )}

                {/* Lunch button */}
                <button
                  className="font-bold text-xl bg-[#00afb9] p-2 text-white hover:bg-[#0081a7] rounded  w-[12rem] flex justify-between mt-4"
                  onClick={() => setLunchMenuOpen(!lunchMenuOpen)}
                >
                  {/* Toggle lunchMenuOpen state */}
                  <span>Lunch</span>
                  <span>
                    {" "}
                    {lunchMenuOpen === true ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
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
                        value={selectedSoupsAndSaladOptions}
                        onChange={handleSoupAndSalad}
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
                        value={selectedOptions}
                        onChange={handleMultiSelectChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* step 3 inputs fields  */}
          {step === 3 && (
            <>
              <div>
                {/* Lunch button */}
                <button
                  className="font-bold text-xl bg-[#9d4edd] p-2 text-white hover:bg-[#5a189a] rounded  w-[12rem] flex justify-between mt-4"
                  onClick={() => setLunchMenuOpen(!lunchMenuOpen)}
                >
                  {/* Toggle lunchMenuOpen state */}
                  <span>Dinner</span>
                  <span>
                    {" "}
                    {lunchMenuOpen === true ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
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
                        value={selectedSoupsAndSaladOptions}
                        onChange={handleSoupAndSalad}
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
                        value={selectedOptions}
                        onChange={handleMultiSelectChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-4 mb-3 mr-4 flex justify-end ">
            {step !== 1 && step === 3 && (
              <div className="mb-8">
                <button
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md mr-4"
                  onClick={handlePrevious}
                >
                  Preview
                </button>
                <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md">
                  Submit
                </button>
              </div>
            )}

            {step !== 3 && (
              <button
                className="  px-4 py-2 text-sm bg-green-600 text-white rounded-md"
                onClick={handleNext}
              >
                Save & Next
              </button>
            )}
          </div>
        </div>

        {/* Additional content of your modal */}
      </div>
    </>
  );
};

export default CateringOrder;
