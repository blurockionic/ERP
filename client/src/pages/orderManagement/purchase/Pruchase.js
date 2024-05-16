import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import { Toaster } from "react-hot-toast";
import { OrderDataContext } from "../../../context/OrderdataContext";
import { Tooltip } from "@mui/material";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import axios from "axios";
import config from "../../../config/config";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Pruchase = () => {
  const { allOrder } = useContext(OrderDataContext);
  const [activeButton, setActiveButton] = useState("view");
  const [todaysOrder, setTodaysOrder] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [moreFilterActiveButton, setMoreFilterActiveButton] = useState(false);
  const [isMoreFilterOpen, setIsMoreFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const ViewOrderDetailsHandler = () => {
    setActiveButton("view");
  };

  // more filter button
  const toggleMorefilterDropdown = () => {
    setIsMoreFilterOpen(!isMoreFilterOpen);
    setMoreFilterActiveButton(!moreFilterActiveButton);
  };

  // handle filter select handler function
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);

    setIsMoreFilterOpen(false);
  };

  // geting all order
  useEffect(() => {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter orders based on today's date
    const filteredOrders = allOrder.filter((order) => {
      const orderDate = new Date(order.dateAndTime);
      orderDate.setHours(0, 0, 0, 0); // Ignore time part
      return orderDate.getTime() >= today.getTime();
    });

    setTodaysOrder(filteredOrders);
  }, [allOrder]);

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilterItems(allOrder);
    } else if (selectedFilter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayOrder = allOrder.filter((item) => {
        const orderDate = new Date(item.dateAndTime);
        return (
          orderDate.getFullYear() === today.getFullYear() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getDate() === today.getDate()
        );
      });
      setFilterItems(todayOrder);
    } else if (selectedFilter === "thisWeek") {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(
        startOfWeek.getDate() -
          startOfWeek.getDay() +
          (startOfWeek.getDay() === 0 ? -6 : 1)
      ); // Set to Monday
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to last day of the week

      const thisWeekOrder = allOrder.filter((item) => {
        const orderDate = new Date(item.dateAndTime);
        return orderDate >= startOfWeek && orderDate <= endOfWeek;
      });
      setFilterItems(thisWeekOrder);
    } else if (selectedFilter === selectedDate) {
      const selectedDateOrder = allOrder.filter((item) => {
        // Convert the order date to a Date object
        const orderDate = new Date(item.dateAndTime);
        // Compare the order date with the selected date
        return orderDate.toDateString() === selectedDate.toDateString();
      });
      setFilterItems(selectedDateOrder);
    }
  }, [selectedFilter, allOrder]);

  // handle selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleFilterSelect(date);
    setIsMoreFilterOpen(false);
  };

  const handleOnGeneratePurchase = async (orderId) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/recipe/specific/order/recipe/${orderId}`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className=" relative w-full bg-gray-50">
      <Toaster />
      <nav className="bg-gray-100 flex flex-row justify-between border-b-2">
        {/* order and create order button */}
        <div className="flex items-center">
          <Link>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer  ${
                activeButton === "view" ? "bg-gray-300" : "bg-white"
              }`}
              onClick={ViewOrderDetailsHandler}
            >
              All Order
            </button>
          </Link>
        </div>

        <div className="bg-gray-100 flex flex-row justify-between">
          {/* search button tab div */}

          {/* <SearchBar handleOnSearch={handleOnSearch} /> */}
        </div>

        {/* more filter items button */}
        <div className="relative inline-block mr-4">
          {/* Filter button */}
          <div
            className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer  ${
              moreFilterActiveButton ? "bg-[#D6DEFF]" : "bg-white"
            }`}
            onClick={toggleMorefilterDropdown}
          >
            <Tooltip title="more Filter" placement="bottom" arrow>
              <>
                <MoreVertIcon />
                Filter by Date
              </>
            </Tooltip>
          </div>
          {/* Dropdown menu */}
          {isMoreFilterOpen && (
            <div className="absolute top-full z-20 right-1 mt-1 w-44 bg-white border rounded-md shadow-lg">
              <div
                className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                  selectedFilter === "all" && "font-bold bg-slate-200"
                }`}
                onClick={() => handleFilterSelect("all")}
              >
                {selectedFilter === "all" && ""}
                All
              </div>
              <div
                className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                  selectedFilter === "today" && "font-bold hover:bg-sky-200"
                }`}
                onClick={() => handleFilterSelect("today")}
              >
                {selectedFilter === "today" && ""}
                Today's Order
              </div>

              <div
                className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                  selectedFilter === selectedDate &&
                  "font-bold hover:bg-sky-200"
                }`}
              >
                {/* Render "Selected Date Order" */}
                Select By Date
                {/* Date picker component */}
                <input
                  type="date"
                  value={
                    selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                  }
                  onChange={(event) =>
                    handleDateChange(new Date(event.target.value))
                  }
                />
              </div>
              <div
                className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                  selectedFilter === "thisWeek" && "font-bold bg-sky-200"
                }`}
                onClick={() => handleFilterSelect("thisWeek")}
              >
                {selectedFilter === "thisWeek" && ""}
                This Week Order
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* if allOrder length less than 0 then  */}
      {filterItems.length > 0 ? (
        <div className="mt-2  table-container h-[590px] overflow-y-auto">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-white text-sm z-10">
              <tr className="text-gray-700 py-5">
                <th>SNo.</th>
                <th>Order Id</th>
                <th>Mobile Number</th>
                <th>Name </th>
                <th>Address</th>
                <th>Date & Time </th>
                <th>Status</th>
                <th>Order Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal overflow-y-auto mt-4 bg-white ">
              {/* made changes for the filter data according to selected filter */}
              {filterItems.length > 0 ? (
                filterItems.map((order, index) => (
                  <tr
                    style={{ cursor: "pointer", height: "80px" }}
                    className={`border-b  text-center ${
                      index + 1 === 1 && "bg-gray-50"
                    }`}
                    key={index}
                  >
                    {/* serial number */}
                    <td className="py-2  border-r-2 mx-auto font-bold">
                      {index + 1}
                    </td>
                    {/* orderId */}
                    <td className="py-2   text-center  ">{order.orderId}</td>
                    {/* cutomer Phone number */}
                    <td className="py-2 text-center font-semibold   ">
                      {order.customerPhoneNumber}
                    </td>
                    {/* cutomer Name */}
                    <td className="py-2  text-center ">{order.customerName}</td>
                    {/* cutomer Address */}
                    <td className="py-2   text-center ">{order.address}</td>
                    {/* event Date */}
                    <td className="py-2 text-center">{order.dateAndTime}</td>
                    {/* status  */}
                    <td className="py-2 text-center relative ">
                      <span
                        className={`cursor-pointer pl-5 py-[2px] flex rounded-full font-semibold text-gray-900 capitalize ${
                          order.orderStatus === "In Progress"
                            ? "bg-green-200 "
                            : order.orderStatus === "Confirmed"
                            ? "bg-yellow-200"
                            : order.orderStatus === "Completed"
                            ? "bg-blue-200 "
                            : order.orderStatus === "Not Confirmed"
                            ? "bg-violet-200"
                            : ""
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* event order type  */}
                    <td className="py-2  text-center ">
                      {order.isLightOrdered && (
                        <span className="bg-yellow-100 px-2 mx-1 rounded-lg cursor-pointer">
                          Light
                        </span>
                      )}
                      {order.isTentOrdered && (
                        <span className="bg-green-100 px-2 mx-1 rounded-lg cursor-pointer">
                          Tent
                        </span>
                      )}
                      {order.isDecorationOrdered && (
                        <span className="bg-slate-100 px-2 mx-1 rounded-lg cursor-pointer">
                          Decoration
                        </span>
                      )}
                      {order.isBistarOrdered && (
                        <span className="bg-blue-100 px-2 mx-1 rounded-lg cursor-pointer capitalize">
                          beding
                        </span>
                      )}
                      {order.isCateringOrdered && (
                        <span className="bg-red-100 px-2 mx-1 rounded-lg cursor-pointer">
                          Catering
                        </span>
                      )}
                    </td>

                    {/* Action Update Button */}
                    <td className="py-2 text-center cursor-pointer w-[5rem]">
                      <>
                        <Link>
                          <Tooltip
                            title="Generate Purchase Order"
                            placement="bottom"
                            arrow
                          >
                            <button
                              className=" text-slate-800 py-3"
                              onClick={() =>
                                handleOnGeneratePurchase(order._id)
                              }
                            >
                              {/* action button */}
                              <ContentPasteGoIcon />
                            </button>
                          </Tooltip>
                        </Link>
                      </>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-4  text-xl p-4 bg-gray-100 m-4 "
                  >
                    Opps, there is no todays order !.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-xl p-4 bg-gray-100 m-4 ">
          Opps, Data Not found
        </div>
      )}
    </div>
  );
};

export default Pruchase;
