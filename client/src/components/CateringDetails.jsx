import React, { useEffect, useState } from "react";
import Select from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import config from "../config/config";

const CateringDetails = ({value}) => {
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

  //dinner
  const [dinnerTotalPackCount, setDinnerTotalPackCount] = useState("");
  const [dinnerTime, setDinnerTime] = useState("");
  const [dinnerSnacks, setDinnerSnacks] = useState([]);
  const [dinnerMainCourse, setDinnerMainCourse] = useState([]);
  const [dinnerSoupAndSalad, setDinnerSoupAndSalad] = useState([]);
  const [dinnerIceCream, setDinnerIceCream] = useState([]);
  const [cateringDetails, setCateringDetails] = useState([]);

  useEffect(() => {
    // console.log(cateringDtails?.lunch)
    const id = localStorage.getItem("customerId");
    //get catering details
    const fetchCateringDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/catering/specific/${id}`,
          {
            withCredentials: true,
          }
        );
        const { orders, success } = response.data;
        if (success) {
          //breakfast
          setBfTotalPacCount(orders?.breakfast?.totalPackCount);
          setBfSnacks(orders?.breakfast?.snacks);
          setBfSoupAndSalad(orders?.breakfast?.soupAndSalad);
          setBfMainCourse(orders?.breakfast?.mainCourse);

          // lunch
          setLunchTotalPackCount(orders?.lunch?.totalPackCount);
          setLunchTime(orders?.lunch?.time);
          setLunchSnacks(orders?.lunch?.snacks);
          setLunchMainCourse(orders?.lunch?.mainCourse);
          setLunchIceCream(orders?.lunch?.iceCream);
          setLunchSoupAndSalad(orders?.lunch?.soupAndSalad);

          //dinner
          setDinnerTotalPackCount(orders?.dinner?.totalPackCount);
          setDinnerTime(orders?.dinner?.time);
          setDinnerSnacks(orders?.dinner?.snacks);
          setDinnerMainCourse(orders?.dinner?.mainCourse);
          setDinnerSoupAndSalad(orders?.dinner?.soupAndSalad);
          setDinnerIceCream(orders?.dinner?.iceCream);
        }
      } catch (error) {
        console.log(error.response);
      }

      // invoke
    };
    fetchCateringDetails();
  }, []);

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
    } catch (error) {
      throw error;
    }
  };

    //handle on catering details update
    const handleOnCateringDetailsEdit =  async()=>{

    }

  return (
    <>
     <div className="font-bold text-left text-lg uppercase border-b-2 flex justify-between mx-2 py-1 bg-gray-200">
        <p className="px-4 my-1">Catering Order Details</p>
        <p onClick={handleOnCateringDetailsEdit} className="bg-white rounded-full px-4 my-1 mx-2 cursor-pointer  shadow-sm">
          Edit
        </p>
      </div>
      <div className="p-6">
        <p className="px-2 py-2 text-lg bg-green-50 uppercase">breakfast</p>
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
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={StreetFoodOptions}
              isMulti
              value={selectedSnacksOptions}
              onChange={handleSnacksSelect}
            /> */}
            {bfSnacks?.map((item) => (
              <span>{item}</span>
            ))}
          </div>

          {/* Main Course Items  */}
          <div>
            <label htmlFor="iceCream" className="p-2 font-bold">
              Main Course
            </label>
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={vegMainCourseOptions}
              isMulti
              value={breakfastMainCourseOptions}
              onChange={handleBreakFastMainCourseSelect}
            /> */}
            {bfMainCourse?.map((item) => (
              <span>{item}</span>
            ))}
          </div>

          {/* Soup and Salads */}
          <div>
            <label htmlFor="iceCream" className="p-2 font-bold">
              Soups & Salads
            </label>
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={SoupAndSaladOption}
              isMulti
              value={selectedSoupsAndSaladOptions}
              onChange={handleSoupAndSalad}
            /> */}
            {bfSoupAndSalad?.map((item) => (
              <span>{item}</span>
            ))}
          </div>
        </div>

        {/* Lunch button */}

        <p className="px-2 py-2 text-lg bg-green-50 uppercase">lunch</p>
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
            </label>{" "}
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={StreetFoodOptions}
              isMulti
              value={selectedLunchSnacksOptions}
              onChange={handleLunchSnacksSelect}
            /> */}
            {lunchSnacks?.map((item) => (
              <span>{item}</span>
            ))}
          </div>

          {/* Main Course Items  */}
          <div>
            <label htmlFor="iceCream" className="p-2 font-bold">
              Main Course
            </label>
            <br />

            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={vegMainCourseOptions}
              isMulti
              value={selectedMainCourseOptions}
              onChange={handleMainCourseSelect}
            /> */}
            {lunchMainCourse?.map((item) => (
              <span>{item}</span>
            ))}
          </div>
          {/* Soup and Salads */}
          <div>
            <label htmlFor="iceCream" className="p-2 font-bold">
              Soups & Salads
            </label>
            <br />

            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={SoupAndSaladOption}
              isMulti
              value={selectedLunchSoupsOptions}
              onChange={handleLunchSoupsSelect}
            /> */}
            {lunchSoupAndSalad?.map((item) => (
              <span>{item}</span>
            ))}
          </div>

          {/* ice Cream select div  */}
          <div className=" ">
            <label htmlFor="iceCream" className="p-2 font-bold">
              Ice Cream
            </label>
            <br />

            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={options}
              isMulti
              value={breakfastIceCreamOptions}
              onChange={handleLunchIceCreamChange}
            /> */}
            {lunchIceCream?.map((item) => (
              <span>{item}</span>
            ))}
          </div>
        </div>

        {/* dinner  */}

        <p className="px-2 py-2 text-lg bg-green-50 uppercase">Dinner</p>
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
            </label>{" "}
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={StreetFoodOptions}
              isMulti
              value={dinnerSnacksOptions}
              onChange={handleDinnerSnacksSelect}
            /> */}
            {dinnerSnacks?.map((item) => (
              <span>{item}</span>
            ))}
          </div>

          {/* Main Course Items  */}
          <div>
            <label htmlFor="iceCream" className="p-2 font-bold">
              Main Course
            </label>{" "}
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={vegMainCourseOptions}
              isMulti
              value={dinnerMainCourseOptions}
              onChange={handleDinnerMainCourseSelect}
            /> */}
            {dinnerMainCourse?.map((item) => (
              <span>{item}</span>
            ))}
          </div>
          {/* Soup and Salads */}
          <div>
            <label htmlFor="iceCream" className="p-2 font-bold">
              Soups & Salads
            </label>{" "}
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={SoupAndSaladOption}
              isMulti
              value={dinnerSoupsOptions}
              onChange={handleDinnerSoups}
            /> */}
            {dinnerSoupAndSalad?.map((item) => (
              <span>{item}</span>
            ))}
          </div>

          {/* ice Cream select div  */}
          <div className=" ">
            <label htmlFor="iceCream" className="p-2 font-bold">
              Ice Cream
            </label>{" "}
            <br />
            {/* <Select
              style={{ maxHeight: "200px", overflowY: "auto" }}
              options={options}
              isMulti
              value={dinnerIceCreamOptions}
              onChange={handleDinnerIceCream}
            /> */}
            {dinnerIceCream?.map((item) => (
              <span>{item}</span>
            ))}
          </div>
        </div>
      </div>
     
    </>
  );
};

export default CateringDetails;
