import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { OrderDataContext } from "../../../context/OrderdataContext";
import { Tooltip } from "@mui/material";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loader from "../../../components/Loader";

const Purchase = () => {
  const { allOrder } = useContext(OrderDataContext);
  const [activeButton, setActiveButton] = useState("view");

  const [filterItems, setFilterItems] = useState([]);
  const [moreFilterActiveButton, setMoreFilterActiveButton] = useState(false);
  const [isMoreFilterOpen, setIsMoreFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add this state for loading

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
    if (allOrder.length > 0) {
      setIsLoading(false); // Set loading to false once data is fetched
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filteredOrders = allOrder.filter((order) => {
        const orderDate = new Date(order.dateAndTime);
        orderDate.setHours(0, 0, 0, 0); // Ignore time part
        return orderDate.getTime() >= today.getTime();
      });

    }
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
    //SET ID IN LOCALSTORAGE
    localStorage.setItem("purchaseId", orderId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`; // Custom format: DD-MM-YYYY
  };

  return (
    <div className=" relative w-full bg-white">
      <Toaster />
      <nav className=" flex flex-row justify-between border-b-2">
        {/* order and create order button */}
        <div className="flex items-center">
          <Link>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer  ${
                activeButton === "view" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={ViewOrderDetailsHandler}
            >
              Order
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
      {isLoading ? (
        <div className=" flex justify-center items-center h-[500px] z-30">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <>
          {filterItems.length > 0 ? (
            <div className="mt-2  table-container h-[590px] overflow-y-auto">
              <table className="w-full text-center">
                <thead className="sticky top-0 bg-white text-sm z-10 uppercase shadow-md">
                  <tr className="text-gray-900 py-5">
                    <th className="hidden sm:table-cell text-xs sm:text-sm">
                      SNo.
                    </th>
                    <th className="hidden sm:table-cell text-xs sm:text-sm">
                      Order Id
                    </th>
                    <th className="px-5 md:px-0 lg:px-0 text-start md:text-center lg:text-center  text-xs sm:text-sm">
                      Name{" "}
                    </th>
                    <th className="hidden sm:table-cell text-xs sm:text-sm">
                      Mobile Number
                    </th>
                    {/* <th className="hidden sm:table-cell text-xs sm:text-sm">
                  Address
                </th> */}
                    <th className=" text-xs sm:text-sm">Date</th>
                    <th className="hidden sm:table-cell text-xs sm:text-sm">
                      Status
                    </th>
                    <th className="hidden sm:table-cell text-xs sm:text-sm">
                      Order Category
                    </th>
                    <th className=" text-xs sm:text-sm">Actions</th>
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
                        <td className="py-2  border-r-2 mx-auto font-bold hidden sm:table-cell">
                          {index + 1}
                        </td>
                        {/* orderId */}
                        <td className="py-2   text-center hidden sm:table-cell ">
                          {order.orderId}
                        </td>
                        {/* cutomer Name */}
                        <td className="py-2 px-5 md:px-0 lg:px-0 text-start md:text-center lg:text-center">
                          {order.customerName}
                        </td>
                        {/* cutomer Phone number */}
                        <td className="py-2 text-center font-semibold  hidden sm:table-cell ">
                          {order.customerPhoneNumber}
                        </td>

                        {/* cutomer Address */}
                        {/* <td className="py-2   text-center hidden sm:table-cell">
                      {order.address}
                    </td> */}
                        {/* event Date */}
                        <td className="py-2 text-center ">
                          {formatDate(order.dateAndTime)}
                        </td>
                        {/* status  */}
                        <td className="py-2 text-center relative hidden sm:table-cell ">
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
                        <td className="py-2  text-center hidden sm:table-cell ">
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
                            <Link to={"../generate-purchase"}>
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
        </>
      )}
    </div>
  );
};

export default Purchase;
