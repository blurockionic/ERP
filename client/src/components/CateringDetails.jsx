import React, { useEffect, useState } from "react";
import Select from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import config from "../config/config";

const CateringDetails = ({ cateringDetails }) => {
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

  // console.log("catering data", cateringDetails);
  // useEffect(() => {
  //   // console.log(cateringDtails?.lunch)
  //   // const id = localStorage.getItem("customerId");
  //   const id = cateringDetails.customerId;
  //   //get catering details
  //   const fetchCateringDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${config.apiUrl}/catering/specific/${id}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       const { orders, success } = response.data;
  //       // console.log("catering data aa raha h kya ",response.data);
  //       if (success) {
  //         //breakfast
  //         setBfTotalPacCount(orders?.breakfast?.totalPackCount);
  //         setBfSnacks(orders?.breakfast?.snacks);
  //         setBfSoupAndSalad(orders?.breakfast?.soupAndSalad);
  //         setBfMainCourse(orders?.breakfast?.mainCourse);

  //         // lunch
  //         setLunchTotalPackCount(orders?.lunch?.totalPackCount);
  //         setLunchTime(orders?.lunch?.time);
  //         setLunchSnacks(orders?.lunch?.snacks);
  //         setLunchMainCourse(orders?.lunch?.mainCourse);
  //         setLunchIceCream(orders?.lunch?.iceCream);
  //         setLunchSoupAndSalad(orders?.lunch?.soupAndSalad);

  //         //dinner
  //         setDinnerTotalPackCount(orders?.dinner?.totalPackCount);
  //         setDinnerTime(orders?.dinner?.time);
  //         setDinnerSnacks(orders?.dinner?.snacks);
  //         setDinnerMainCourse(orders?.dinner?.mainCourse);
  //         setDinnerSoupAndSalad(orders?.dinner?.soupAndSalad);
  //         setDinnerIceCream(orders?.dinner?.iceCream);
  //       }
  //     } catch (error) {
  //       console.log(error.response);
  //     }

  //     // invoke
  //   };
  //   fetchCateringDetails();
  // }, []);

  // ice Cream

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

  return (
    <>
      <div className="p-6">
        <p className="px-2 py-2 text-lg bg-green-50 uppercase">breakfast</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
          {/* Total Pax Count */}
          <div>
            <label htmlFor="total count" className="p-2">
              Total Pax Count
            </label>
            <input
              className="w-full text-sm p-1 border outline-none"
              type="text"
              disabled
              value={cateringDetails?.breakfast?.totalPackCount}
              onChange={(e) => setBfTotalPacCount(e.target.value)}
              placeholder="Enter the count of PAX"
            />
          </div>

          {/* Snacks select div */}
          <div className="flex flex-col">
            <label htmlFor="snacks" className="p-2">
              Snacks (StreetFood)
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={StreetFoodOptions}
        isMulti
        value={selectedSnacksOptions}
        onChange={handleSnacksSelect}
      /> */}
              {cateringDetails?.breakfast?.snacks?.map((item, index) => (
                <span className="mx-1 px-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>

          {/* Main Course Items */}
          <div className="flex flex-col">
            <label htmlFor="mainCourse" className="p-2">
              Main Course
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={vegMainCourseOptions}
        isMulti
        value={breakfastMainCourseOptions}
        onChange={handleBreakFastMainCourseSelect}
      /> */}
              {cateringDetails?.breakfast?.mainCourse?.map((item, index) => (
                <span className="mx-1 px-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>

          {/* Soup and Salads */}
          <div className="flex flex-col">
            <label htmlFor="soupAndSalad" className="p-2">
              Soups & Salads
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={SoupAndSaladOption}
        isMulti
        value={selectedSoupsAndSaladOptions}
        onChange={handleSoupAndSalad}
      /> */}
              {cateringDetails?.breakfast?.soupAndSalad?.map((item, index) => (
                <span className="mx-1 px-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Lunch button */}

        <p className="px-2 py-2 text-lg bg-green-50 uppercase mt-10">lunch</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Total Pax Count */}
          <div>
            <label htmlFor="totalCount" className="p-2">
              Total Pax Count
            </label>
            <input
              value={cateringDetails?.lunch?.totalPackCount}
              disabled
              className="w-full p-1 border text-sm outline-none"
              type="text"
              placeholder="Enter the count of PAX"
            />
          </div>

          {/* Lunch Timing */}
          <div>
            <label htmlFor="lunchTime" className="p-2">
              Lunch Time
            </label>
            <input
              disabled
              value={cateringDetails?.lunch?.time}
              className="w-full p-1 border text-sm outline-none"
              type="text"
              placeholder="Enter the count of PAX"
            />
          </div>

          {/* Snacks */}
          <div className="flex flex-col">
            <label htmlFor="snacks" className="p-2">
              Snacks (StreetFood)
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={StreetFoodOptions}
        isMulti
        value={selectedLunchSnacksOptions}
        onChange={handleLunchSnacksSelect}
      /> */}
              {cateringDetails?.lunch?.snacks?.map((item, index) => (
                <span className="mx-1 px-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>

          {/* Main Course */}
          <div className="flex flex-col">
            <label htmlFor="mainCourse" className="p-2">
              Main Course
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={vegMainCourseOptions}
        isMulti
        value={selectedMainCourseOptions}
        onChange={handleMainCourseSelect}
      /> */}
              {cateringDetails?.lunch?.mainCourse?.map((item, index) => (
                <span className="p-1 mx-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>

          {/* Soups and Salads */}
          <div className="flex flex-col">
            <label htmlFor="soupsAndSalads" className="p-2">
              Soups & Salads
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={SoupAndSaladOption}
        isMulti
        value={selectedLunchSoupsOptions}
        onChange={handleLunchSoupsSelect}
      /> */}
              {cateringDetails?.lunch?.soupAndSalad?.map((item, index) => (
                <span className="p-1 mx-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>

          {/* Ice Cream */}
          <div className="flex flex-col">
            <label htmlFor="iceCream" className="p-2">
              Ice Cream
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={options}
        isMulti
        value={breakfastIceCreamOptions}
        onChange={handleLunchIceCreamChange}
      /> */}
              {cateringDetails?.lunch?.iceCream?.map((item, index) => (
                <span className="p-1 mx-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* dinner  */}

        <p className="mt-4 px-2 py-2 text-lg bg-green-50 uppercase">Dinner</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Total Pax Count */}
          <div>
            <label htmlFor="totalCount" className="p-2">
              Total Pax Count
            </label>
            <input
              disabled
              value={cateringDetails?.dinner?.totalPackCount}
              className="w-full p-1 text-sm border outline-none"
              type="text"
              placeholder="Enter the count of PAX"
            />
          </div>

          {/* Dinner Timing */}
          <div>
            <label htmlFor="dinnerTime" className="p-2">
              Dinner Time
            </label>
            <input
              disabled
              value={cateringDetails?.dinner?.time}
              className="w-full p-1 text-sm border outline-none"
              type="time"
              placeholder="Enter the count of PAX"
            />
          </div>

          {/* Snacks */}
          <div className="flex flex-col">
            <label htmlFor="snacks" className="p-2">
              Snacks (StreetFood)
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={StreetFoodOptions}
        isMulti
        value={dinnerSnacksOptions}
        onChange={handleDinnerSnacksSelect}
      /> */}
              {cateringDetails?.dinner?.snacks?.map((item, index) => (
                <span
                  className="px-1 mt-1 text-sm rounded border mx-1"
                  key={index}
                >
                  {item}
                </span>
              ))}
            </span>
          </div>

          {/* Main Course */}
          <div className="flex flex-col">
            <label htmlFor="mainCourse" className="p-2">
              Main Course
            </label>
            <div className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={vegMainCourseOptions}
        isMulti
        value={dinnerMainCourseOptions}
        onChange={handleDinnerMainCourseSelect}
      /> */}
              {cateringDetails?.dinner?.mainCourse?.map((item, index) => (
                <span
                  key={index}
                  className="mt-1 mx-1 text-sm rounded border px-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Soups and Salads */}
          <div className="flex flex-col">
            <label htmlFor="soupsAndSalads" className="p-2">
              Soups & Salads
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={SoupAndSaladOption}
        isMulti
        value={dinnerSoupsOptions}
        onChange={handleDinnerSoups}
      /> */}
              {cateringDetails?.dinner?.soupAndSalad?.map((item, index) => (
                <span
                  key={index}
                  className="mt-1 mx-1 text-sm rounded border px-1"
                >
                  {item}
                </span>
              ))}
            </span>
          </div>

          {/* Ice Cream */}
          <div className="flex flex-col">
            <label htmlFor="iceCream" className="p-2">
              Ice Cream
            </label>
            <span className="mt-1">
              {/* <Select
        style={{ maxHeight: "200px", overflowY: "auto" }}
        options={options}
        isMulti
        value={dinnerIceCreamOptions}
        onChange={handleDinnerIceCream}
      /> */}
              {cateringDetails?.dinner?.iceCream?.map((item, index) => (
                <span className="px-1 mx-1 text-sm rounded border" key={index}>
                  {item}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CateringDetails;
