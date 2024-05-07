import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import axios from "axios";

import config from "../../../config/config";
import SearchBar from "../../../components/SearchBar";
import { Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import AddIcon from "@mui/icons-material/Add";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import CloseIcon from "@mui/icons-material/Close";

import FilterListIcon from "@mui/icons-material/FilterList";

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import MoreOptionModel from "../../../components/MoreOptionModel";

const Order = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bedingModalVisible, setBedingModalVisible] = useState(false);
  const [tentModalVisible, setTentModalVisible] = useState(false);
  const [lightModalVisible, setLightModalVisible] = useState(false);
  const [decorationModalVisible, setDecorationtModalVisible] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [activeButton, setActiveButton] = useState("view");

  const [allOrder, setAllOrder] = useState([]);
  const [allOrdeForSearch, setAllOrderForSearch] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [indexNumber, setIndexNumber] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAddress, setCustomerAdress] = useState("");

  const [specificOrderDetails, setspecificOrderDetails] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("");
  // filter usestates
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMoreFilterOpen, setIsMoreFilterOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [filterItems, setFilterItems] = useState([]);
  // active data for the new tab

  // usestate for change filter value
  const [filterValue, setFilterValue] = useState("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [ordersNewStatus, setOrdersNewStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [moreFilterActiveButton, setMoreFilterActiveButton] = useState(false);
  const [FilterButtonActive, setFilterButtonActive] = useState(false);


  // more option model 
  const [moreOptionModel, setMoreOptionModel] = useState(false);

  // all order items details are comming from here

  useEffect(() => {
    const fetchAllbedingOrder = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/order/all`, {
          withCredentials: true,
        });

        setIsLoading(false);
        const { data } = response.data;
        setIsLoading(false);
        setAllOrder(data);
        setAllOrderForSearch(data);
      } catch (error) {
        // Handle the error here, you can log it or show a message to the user
        console.error("Error fetching orders:", error);
      }
    };

    //invoke
    fetchAllbedingOrder();
  }, [isLoading]);

  // handle selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleFilterSelect(date);
    setIsMoreFilterOpen(false);
  };

  //
  // more filter button
  const toggleMorefilterDropdown = () => {
    setIsMoreFilterOpen(!isMoreFilterOpen);
    setFilterActive(true);
    setFilterButtonActive(false)
    setMoreFilterActiveButton(true)
  };

  // filter button for open and close its model
  const toggleDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
    setMoreFilterActiveButton(false)
    setFilterButtonActive(true)

  };

  // handle filter select handler function
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
    setIsMoreFilterOpen(false);
  };

  // handle view  order details
  const ViewOrderDetailsHandler = () => {
    setActiveButton("view");
  };

  // function for seletec all 
  const handleSelectAll = () => {
    setMoreOptionModel(true)
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll
        ? []
        : Array.from({ length: allOrder.length }, (_, index) => index)
    );

  };
  // Function to handle individual row selection
  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        return prevSelectedRows.filter((row) => row !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
  };


  //handle for save the updated details
  const handleOnSave = async (id) => {
    setIsUpdateClicked(false);

    try {
      const response = await axios.put(
        `${config.apiUrl}/customer/update/${id}`,
        { customerAddress, customerPhoneNumber, customerName },
        { withCredentials: true }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //handle on order category
  const handleOnOrderCategory = async (id, value) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/${value}/specific/${id}`,
        { withCredentials: true }
      );

      const { success, orders } = response.data;
      //catering
      if (success && value === "catering") {
        setspecificOrderDetails(orders);
      }
      //beding
      if (success && value === "beding") {
        setspecificOrderDetails(orders);
      }

      //tent
      if (success && value === "tent") {
        setspecificOrderDetails(orders);
      }

      //light
      if (success && value === "light") {
        setspecificOrderDetails(orders);
      }

      //decoration
      if (success && value === "decoration") {
        setspecificOrderDetails(orders);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //catering model
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  // beding
  const bedingCloseModal = () => {
    setBedingModalVisible(false);
  };
  const bedingOpenModel = () => {
    setBedingModalVisible(true);
  };

  //TENT
  const tentCloseModal = () => {
    setTentModalVisible(false);
  };
  const tentOpenModel = () => {
    setTentModalVisible(true);
  };

  //light
  const lightCloseModal = () => {
    setLightModalVisible(false);
  };
  const lightOpenModel = () => {
    setLightModalVisible(true);
  };

  //light
  const decorationCloseModal = () => {
    setDecorationtModalVisible(false);
  };
  const decorationOpenModel = () => {
    setDecorationtModalVisible(true);
  };

  //handle on search
  const handleOnSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setAllOrder(allOrder);
    } else {
      // Filter the array based on the search term
      const tempVar = allOrdeForSearch?.filter((item) =>
        item.customerName?.trim().toLowerCase().includes(searchTerm)
      );
      setAllOrder(tempVar); // Update the array state with the filtered results
    }
  };

  //handle for select month
  const handleOnChangeMonth = (value) => {
    setSelectedMonth(value);

    handleFilterSelect(value);
    setIsMoreFilterOpen(false);
  };

  // check the today
  function isToday(someDate) {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  }



  // filtering the data using the useEffect

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilterItems(allOrder);
    } else if (selectedFilter === "active") {
      const activeOrder = allOrder.filter(
        (item) => item.orderStatus === "active"
      );
      setFilterItems(activeOrder);
    } else if (selectedFilter === "pending") {
      const pendingOrder = allOrder.filter(
        (item) => item.orderStatus === "pending"
      );
      setFilterItems(pendingOrder);
    } else if (selectedFilter === "awaited") {
      const awaitedOrder = allOrder.filter(
        (item) => item.orderStatus === "awaited"
      );
      setFilterItems(awaitedOrder);
    } else if (selectedFilter === "scrap") {
      const scrapOrder = allOrder.filter(
        (item) => item.orderStatus === "scrap"
      );
      setFilterItems(scrapOrder);
    } else if (selectedFilter === "onhold") {
      const onholdOrder = allOrder.filter(
        (item) => item.orderStatus === "onhold"
      );
      setFilterItems(onholdOrder);
    } else if (selectedFilter === "noresponse") {
      const noresponseOrder = allOrder.filter(
        (item) => item.orderStatus === "noresponse"
      );
      setFilterItems(noresponseOrder);
    } else if (selectedFilter === "completed") {
      const completedOrder = allOrder.filter(
        (item) => item.orderStatus === "completed"
      );

      setFilterItems(completedOrder);
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
    }
    
    // else if (selectedFilter === "thisWeek") {
    //   const today = new Date();
    //   const startOfWeek = new Date(today);
    //   startOfWeek.setDate(
    //     startOfWeek.getDate() -
    //       startOfWeek.getDay() +
    //       (startOfWeek.getDay() === 0 ? -6 : 1)
    //   ); // Set to Monday
    //   startOfWeek.setHours(0, 0, 0, 0);

    //   const endOfWeek = new Date(startOfWeek);
    //   endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to last day of the week

    //   const thisWeekOrder = allOrder.filter((item) => {
    //     const orderDate = new Date(item.dateAndTime);
    //     return orderDate >= startOfWeek && orderDate <= endOfWeek;
    //   });
    //   setFilterItems(thisWeekOrder);
    // } 
    
    
    else if (selectedFilter === selectedMonth) {
      const monthbyOrders = allOrder.filter((item) => {
        const months = {
          january: 0,
          february: 1,
          march: 2,
          april: 3,
          may: 4,
          june: 5,
          july: 6,
          august: 7,
          september: 8,
          october: 9,
          november: 10,
          december: 11,
        };
        const orderDate = new Date(item.dateAndTime);
        const orderMonth = orderDate.getMonth(); // Get the month of the order
        const orderYear = orderDate.getFullYear(); // Get the year of the order
        // Compare if the order's month and year match the selected month and current year
        return (
          orderMonth === months[selectedMonth] &&
          orderYear === new Date().getFullYear()
        );
      });
      setFilterItems(monthbyOrders);
    } else if (selectedFilter === "range") {
      const dateRangeOrders = allOrder.filter((item) => {
        const orderDate = new Date(item.dateAndTime);
        return (
          orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
        );
      });
      setFilterItems(dateRangeOrders);
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

  // status change handler function for order
  const statusChangeHandler = (index) => {
    setFilterValue(index);
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  // range related function
  const handleApplyRange = (value) => {
    handleFilterSelect(value);
    setIsMoreFilterOpen(false);
  };

  //handle on update order status
  const handleOnUpdateOrderStatus = async (status, id) => {
    console.log(status === "active")
    let orderStatus = status;
    try {
      // Request for updating the status of the order
      const response = await axios.put(
        `${config.apiUrl}/order/update/status/${id}`,
        { orderStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { success, message } = response.data;
      if (success) {
        alert(message);
        setIsLoading(true);
        setStatusDropdownOpen(false);
      }

      //if order status is active then
      if (status === "active") {
        console.log("working")
        handleOnUpdateInventoryItemCount(id);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      // Handle error, maybe show an error message to the user
    }
  };

  // finction for update inventory
  const handleOnUpdateInventoryItemCount = async (id) => {
    const response = await axios.put(
      `${config.apiUrl}/inventory/update/item/count/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response);
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

          <Link to={"../activeOrder"}>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100  ${
                activeButton === "activeOrder" ? "bg-slate-100" : "bg-white"
              }`}
            >
              {/* <AddIcon className="px-1" /> */}
              Active Orders
            </button>
          </Link>

          <Link to={"../neworder"}>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100  ${
                activeButton === "create" ? "bg-slate-100" : "bg-white"
              }`}
            >
              <AddIcon className="px-1" />
              Create Order
            </button>
          </Link>
          <Link to={"./calendar"}>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100  ${
                activeButton === "viewOrder" ? "bg-white" : "bg-white"
              }`}
            >
              <CalendarMonthIcon className="px-1 mr-1 " />
              View Order
            </button>
          </Link>
        </div>

        <div className="bg-gray-100 flex flex-row justify-between">
          {/* search button tab div */}

          <SearchBar handleOnSearch={handleOnSearch} />

          {/* user detail tab  */}
          <div className=" flex flex-row items-center gap-4 mr-5">
            {/* filter model and filter button  */}
            <div className="relative inline-block">
              {/* Filter button */}
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100 ${
                  FilterButtonActive ? "bg-[#D6DEFF]" : "bg-white"
                }`}
                onClick={toggleDropdown}
              >
                <FilterListIcon className="mr-1" />
                Filter by Status
              </div>
              {/* Dropdown menu */}
              {isFilterOpen && (
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
                      selectedFilter === "pending" &&
                      "font-bold hover:bg-sky-200"
                    }`}
                    onClick={() => handleFilterSelect("pending")}
                  >
                    {selectedFilter === "pending" && ""}
                    Pending
                  </div>
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "active" && "font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("active")}
                  >
                    {selectedFilter === "active" && ""}
                    Active
                  </div>
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "awaited" && "font-bold bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("awaited")}
                  >
                    {selectedFilter === "awaited" && ""}
                    Awaited
                  </div>
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "completed" &&
                      "font-bold bg-slate-200  "
                    }`}
                    onClick={() => handleFilterSelect("completed")}
                  >
                    {selectedFilter === "completed" && ""}
                    Completed
                  </div>
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "scrap" &&
                      "font-bold hover:bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("scrap")}
                  >
                    {selectedFilter === "scrap" && ""}
                    Scrap
                  </div>
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "onhold" &&
                      "font-bold hover:bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("onhold")}
                  >
                    {selectedFilter === "onhold" && ""}
                    On Hold
                  </div>
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "noresponse" &&
                      "font-bold hover:bg-slate-200"
                    }`}
                    onClick={() => handleFilterSelect("noresponse")}
                  >
                    {selectedFilter === "noresponse" && ""}
                    No Response
                  </div>
                </div>
              )}
            </div>

            {/* more filter items button */}
            <div className="relative inline-block">
              {/* Filter button */}
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100 ${
                  moreFilterActiveButton ? "bg-[#D6DEFF]" : "bg-white"
                }`}
                onClick={toggleMorefilterDropdown}
              >
                <Tooltip title="more Filter" placement="bottom" arrow>
                  <MoreVertIcon />
                  Filter by Date
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
                        selectedDate
                          ? selectedDate.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(event) =>
                        handleDateChange(new Date(event.target.value))
                      }
                    />
                  </div>

                  {/* <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "thisWeek" && "font-bold bg-sky-200"
                    }`}
                    onClick={() => handleFilterSelect("thisWeek")}
                  >
                    {selectedFilter === "thisWeek" && ""}
                    This Week Order
                  </div> */}
                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === selectedMonth && "font-bold"
                    }`}
                  >
                    <span>Each Month Order</span>
                    <select
                      name="eachmonth"
                      className={`text-left w-full p-2  cursor-pointer hover:bg-slate-100 ${
                        selectedFilter === selectedMonth &&
                        "font-bold bg-slate-200"
                      }`}
                      value={selectedMonth}
                      onChange={(e) => handleOnChangeMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      <option value="january">January</option>
                      <option value="february">February</option>
                      <option value="march">March</option>
                      <option value="april">April</option>
                      <option value="may">May</option>
                      <option value="june">June</option>
                      <option value="july">July</option>
                      <option value="august">August</option>
                      <option value="september">September</option>
                      <option value="october">October</option>
                      <option value="november">November</option>
                      <option value="december">December</option>
                    </select>
                  </div>

                  <div
                    className={`text-left pl-6 p-2 cursor-pointer hover:bg-slate-100 ${
                      selectedFilter === "range" && "font-bold bg-slate-100"
                    }`}
                  >
                    Range Filter
                    <div>
                      <div className="ml-2 mr-2 flex flex-col">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="border rounded-md p-1"
                        />
                        <span className="mx-2">to</span>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="border rounded-md p-1"
                        />
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100 bg-white "
                      onClick={() => handleApplyRange("range")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* if allOrder length less than 0 then  */}
      {allOrder.length > 0 ? (
        <div className="mt-2  table-container h-[590px] overflow-y-auto">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-white text-sm z-10">
              <tr className="text-gray-700 py-5">
                <th className="border-r-2 p-2 ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600"
                    style={{
                      marginTop: "1px", // Adjust vertical alignment if necessary
                    }}
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
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
              {
              
              filterItems.length > 0 ?(
                filterItems.map((order, index) => (
                  <tr
                    style={{ cursor: "pointer", height: "80px" }}
                    className={`border-b  text-center ${
                      index + 1 === 1 && "bg-gray-50"
                    } ${
                      index + 1 === indexNumber &&
                      isUpdateClicked === true &&
                      "bg-slate-100"
                    }`}
                    key={index}
                  >
                    {/* checkbox */}
                    <td className="py-2  border-r-2 mx-auto font-bold">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelect(index)}
                      />
                    </td>
                    {/* serial number */}
                    <td className="py-2  border-r-2 mx-auto font-bold">
                      {index + 1}
                    </td>
                    {/* orderId */}
                    <td className="py-2   text-center  ">{order.orderId}</td>
                    {/* cutomer Phone number */}
                    <td className="py-2 text-center font-semibold   ">
                      {order.customerPhoneNumber === "" ? (
                        "-"
                      ) : (
                        <input
                          type={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? "text"
                              : null
                          }
                          disabled={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? false
                              : true
                          }
                          value={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? customerPhoneNumber
                              : order.customerPhoneNumber
                          }
                          onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                          className={` bg-white text-center ${
                            index + 1 === indexNumber &&
                            isUpdateClicked === true &&
                            "border-green-500"
                          }`}
                        />
                      )}
                    </td>
                    {/* cutomer Name */}
                    <td className="py-2  text-center ">
                      {order.customerName === "" ? (
                        "-"
                      ) : (
                        <input
                          type={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? "text"
                              : null
                          }
                          disabled={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? false
                              : true
                          }
                          value={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? customerName
                              : order.customerName
                          }
                          onChange={(e) => setCustomerName(e.target.value)}
                          className={`bg-white text-center ${
                            index + 1 === indexNumber &&
                            isUpdateClicked === true &&
                            "border-green-500"
                          }`}
                        />
                      )}
                    </td>
                    {/* cutomer Address */}
                    <td className="py-2   text-center ">
                      {order.address === "" ? (
                        "-"
                      ) : (
                        <input
                          type={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? "text"
                              : null
                          }
                          disabled={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? false
                              : true
                          }
                          value={
                            index + 1 === indexNumber && isUpdateClicked === true
                              ? customerAddress
                              : order.customerAddress
                          }
                          onChange={(e) => setCustomerAdress(e.target.value)}
                          className={`bg-white text-center ${
                            index + 1 === indexNumber &&
                            isUpdateClicked === true &&
                            "border-green-500"
                          }`}
                        />
                      )}
                    </td>
                    {/* event Date */}
                    <td className="py-2 text-center">
                      {order.dateAndTime === "" ? (
                        "-"
                      ) : (
                        <>
                          <input
                            type="text"
                            value={new Date(order.dateAndTime).toLocaleString()}
                            disabled
                            className={`bg-white text-center ${
                              index + 1 === indexNumber && isUpdateClicked
                                ? "border-green-500"
                                : ""
                            }`}
                          />
                          {isToday(new Date(order.dateAndTime)) && (
                            <span className="relative flex h-2 w-2 -top-7 left-44">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                          )}
                        </>
                      )}
                    </td>
  
                    {/*Order status */}
                    <td className="py-2   text-center relative">
                      <span
                        className={`${
                          (order.orderStatus === "active"
                            ? "bg-blue-200 w-[5rem]  text-center font-semibold py-1 px-3 rounded "
                            : "") ||
                          (order.orderStatus === "pending"
                            ? "bg-blue-200 w-[5rem]  text-center font-semibold py-1 px-3 rounded "
                            : "") ||
                          (order.orderStatus === "completed"
                            ? "bg-green-100 font-semibold py-1 px-3 rounded "
                            : "") ||
                          (order.orderStatus === "awaited"
                            ? "bg-yellow-100 font-semibold py-1 px-3 rounded "
                            : "") ||
                          (order.orderStatus === "scrap"
                            ? "bg-purple-200 font-semibold py-1 px-3 rounded "
                            : "") ||
                          (order.orderStatus === "onhold"
                            ? "bg-red-100 font-semibold py-1 px-3 rounded "
                            : "") ||
                          (order.orderStatus === "noresponse"
                            ? "bg-slate-100 font-semibold py-1 px-3 rounded "
                            : "")
                        } `}
                      >
                        <button
                          className="mx-auto w-[5rem] capitalize"
                          onClick={() => statusChangeHandler(index)}
                        >
                          {order.orderStatus}
                        </button>
                      </span>
                      {order.orderStatus !== "completed" &&
                        filterValue === index &&
                        statusDropdownOpen && (
                          <div className="items-center absolute top-full left-0 z-10 mt-1 p-2 w-36 bg-white border rounded-md shadow-lg">
                            <div className="">
                              <span className="font-bold capitalize bg-slate-100 py-1 px-3 w-full">
                                {order.orderStatus}
                              </span>
                            </div>
  
                            <div className="relative">
                              <select
                                value={ordersNewStatus}
                                onChange={(e) => {
                                  setOrdersNewStatus(e.target.value);
                                  // handleOnUpdateOrderStatus(
                                  //   e.target.value,
                                  //   order._id
                                  // );
                                }}
                                class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 pl-2 py-1 rounded mt-2 leading-tight focus:outline-none font-semibold "
                              >
                                <option value="onhold">On Hold</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="scrap">Scrap</option>
                                <option value="completed">Completed</option>
                                <option value="noresponse">No Response</option>
                              </select>
                            </div>
  
                            <button
                              className="bg-slate-900 text-white font-semibold py-1 px-4 rounded mt-4"
                              onClick={() =>
                                handleOnUpdateOrderStatus(
                                  ordersNewStatus,
                                  order._id
                                )
                              }
                            >
                              Save
                            </button>
                          </div>
                        )}
                    </td>
  
                    {/* event order type  */}
                    <td className="py-2  text-center w-[10rem] ">
                      {order.isLightOrdered && (
                        <span
                          onClick={() => {
                            handleOnOrderCategory(order.lightOrdered, "light");
                            lightOpenModel();
                          }}
                          className="bg-yellow-100 px-2 mx-1 rounded-lg cursor-pointer"
                        >
                          Light
                        </span>
                      )}
                      {order.isTentOrdered && (
                        <span
                          onClick={() => {
                            handleOnOrderCategory(order.tentOrdered, "tent");
                            tentOpenModel();
                          }}
                          className="bg-green-100 px-2 mx-1 rounded-lg cursor-pointer"
                        >
                          Tent
                        </span>
                      )}
                      {order.isDecorationOrdered && (
                        <span
                          onClick={() => {
                            handleOnOrderCategory(
                              order.decorationOrdered,
                              "decoration"
                            );
                            decorationOpenModel();
                          }}
                          className="bg-slate-100 px-2 mx-1 rounded-lg cursor-pointer"
                        >
                          Decoration
                        </span>
                      )}
                      {order.isBistarOrdered && (
                        <span
                          onClick={() => {
                            handleOnOrderCategory(order.bistarOrdered, "beding");
                            bedingOpenModel();
                          }}
                          className="bg-blue-100 px-2 mx-1 rounded-lg cursor-pointer capitalize"
                        >
                          beding
                        </span>
                      )}
                      {order.isCateringOrdered && (
                        <span
                          onClick={() => {
                            handleOnOrderCategory(
                              order.cateringOrdered,
                              "catering"
                            );
                            openModal();
                          }}
                          className="bg-red-100 px-2 mx-1 rounded-lg cursor-pointer"
                        >
                          Catering
                        </span>
                      )}
                    </td>
                    {/* Action Update Button */}
                    <td className="py-2 text-center flex justify-evenly cursor-pointer w-[5rem]">
                      {index + 1 === indexNumber && isUpdateClicked === true ? (
                        <span
                          className="bg-green-50 px-4 border rounded-full"
                          onClick={() => handleOnSave(order._id)}
                        >
                          Save
                        </span>
                      ) : (
                        <>
                          <Link to={`../orderdetails/${order._id}`}>
                          <Tooltip title="See more Details" placement="bottom" arrow>
                          <button className=" text-slate-800 underline py-3">
                             <ReadMoreIcon />
                            </button>
                          </Tooltip>
                          </Link>
                          {/* <EditIcon
                            className="ml-3"
                            onClick={() => handleOnEdit(index + 1, order)}
                          /> */}
                        </>
                      )}
                    </td>
                  </tr>
                ))

              ) : ( <tr>
              <td colSpan="10" className="text-center py-4  text-xl p-4 bg-gray-100 m-4 font-mono">
                Opps, the selected filter data was not found.
              </td>
            </tr>)
            }
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-xl p-4 bg-gray-100 m-4 font-mono">
          Opps, Data Not found
        </div>
      )}
      {/* //catering model details  */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-2 w-[90%] mx-auto h-[95%] overflow-auto scroll-smooth ">
            <div className="flex justify-between p-1 rounded-md px-2 font-bold uppercase bg-[#FEE2E2]">
              <h1 className="uppercase font-extrabold text-xl ">
                Catering order Details
              </h1>
              <Tooltip title="close" placement="bottom" arrow>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
            <hr />
            <div className=" grid grid-cols-2 mt-2">
              <div className="col-span-1 m-4">
                <div className="flex flex-row justify-between px-2 py-2 bg-gray-200">
                  <span className="font-bold uppercase text-lg">Breakfast</span>

                  <span className="flex flex-row gap-2">
                    <p className="text-gray-950 font-bold">
                      {specificOrderDetails.breakfast?.totalPackCount
                        ? specificOrderDetails.breakfast?.totalPackCount
                        : "0"}
                    </p>
                    <span className="font-bold">PAX</span>
                  </span>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Snack
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-bold rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.breakfast?.snacks?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="  bg-[#D4FCE0] py-1 px-2 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Soup and Snacks
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-bold rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.breakfast?.soupAndSalad?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="  bg-[#D4FCE0] py-1 px-2 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Main Course
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-bold rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.breakfast?.mainCourse?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="  bg-[#D4FCE0] py-1 px-2 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* lunch */}
              <div className="col-span-1 m-4">
                <div className="flex flex-row justify-between  px-2 py-2 bg-gray-200">
                  <span className="font-bold uppercase text-lg">Lunch</span>
                  <span className="flex flex-row gap-2">
                    <p className="text-gray-950 font-bold">
                      {specificOrderDetails.lunch?.totalPackCount
                        ? specificOrderDetails.lunch?.totalPackCount
                        : "0"}
                    </p>
                    <span className="font-bold">PAX</span>
                  </span>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Snacks
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-bold rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.lunch?.snacks?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="  bg-[#D4FCE0] py-1 px-2 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Soup and Salad
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-bold rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.lunch?.soupAndSalad?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="  bg-[#FEE2E2] py-1 px-2 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Main Course
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-bold rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.lunch?.mainCourse?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="  bg-[#D4FCE0] py-1 px-2 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* dinner */}
              <div className="col-span-2 m-4">
                <div className="flex flex-row justify-between  px-2 py-2 bg-gray-200">
                  <span className="font-bold uppercase text-lg">Dinner</span>
                  <span className="flex flex-row gap-2">
                    <p className="text-gray-950 font-bold">
                      {specificOrderDetails.dinner?.totalPackCount
                        ? specificOrderDetails.dinner?.totalPackCount
                        : "0"}
                    </p>
                    <span className=" font-bold">PAX</span>
                  </span>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Snack
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-bold rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.dinner?.snacks?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="  bg-[#D4FCE0] py-1 px-2 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center border w-[30%]">
                    <span className="font-bold uppercase flex bg-gray-200 text-xl mx-auto">
                      {" "}
                      Soup And Salad
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-medium rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.dinner?.soupAndSalad?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className="bg-[#FEE2E2] px-2 py-1 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-evenly border mt-4 ">
                  <div className=" flex flex-wrap text-center bg-gray-200 border w-[30%]">
                    <span className="font-bold uppercase flex  text-base mx-auto">
                      Main Course{" "}
                    </span>
                  </div>
                  <div className="w-[70%] p-2 ">
                    <ul className="font-medium rounded-md flex flex-wrap gap-4  ">
                      {specificOrderDetails.dinner?.mainCourse?.map(
                        (item, index) => (
                          <li key={index}>
                            <span className=" bg-[#CFEEF7] px-2 py-1 border rounded">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* beding model  */}
      {bedingModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <div className="flex justify-between bg-[#DBEAFE] ">
              <div>
                <p className="font-bold uppercase px-2 rounded-md">
                  beding order Details
                </p>
              </div>
              <Tooltip title="close" placement="bottom" arrow>
                <button
                  onClick={bedingCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2  border mt-4 p-1 font-medium gap-4 ">
              <div className="bg-[#DCFCE7] flex flex-col  w-32 text-center  p-1 rounded-full ">
                <span className=" font-extrabold">Pillow</span>
                <span className="font-bold">{specificOrderDetails.pillow}</span>
              </div>
              <div className="bg-[#f6fcdc] flex flex-col  w-32 text-center  p-1 rounded-full ">
                <h1 className="font-extrabold">Bedsheet</h1>
                <p className="font-bold ">{specificOrderDetails.bedsheet}</p>
              </div>
              <div className="bg-[#FEE2E2] flex flex-col  w-32 text-center  p-1 rounded-full ">
                <h1 className="font-extrabold">Blanket</h1>
                <p>{specificOrderDetails.blanket}</p>
              </div>
              <div className="bg-[#d7d7ff] flex flex-col  w-32 text-center  p-1 rounded-full ">
                <h1 className="font-extrabold">Chadar</h1>
                <p className="font-bold">{specificOrderDetails.chadar}</p>
              </div>
              <div className="bg-[#eedcfc] flex flex-col  w-32 text-center  p-1 rounded-full ">
                <h1 className="font-extrabold">Bed</h1>
                <p className="font-bold">{specificOrderDetails.bed}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* tent model  */}
      {tentModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <div className="flex justify-between font-bold uppercase bg-[#DCFCE7] px-2 py-1 rounded-md ">
              <div>
                <p className=" ">Tent Order Details</p>
              </div>
              <Tooltip title="Close Tent Model" placement="bottom" arrow>
                <button
                  onClick={tentCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 border-2 mt-4">
              <div className="cols-span-1 border-r-2 border-gray-200 ">
                {specificOrderDetails?.orderedItems?.map((item) => (
                  <>
                    <ul className="p-1">
                      <li className=" font-medium ">{item}</li>
                    </ul>
                  </>
                ))}
              </div>
              <div className="cols-span-1 ">
                {specificOrderDetails?.orderedItemsCount?.map((item) => (
                  <>
                    <ul className="p-1">
                      <li className="font-medium text-center">{item}</li>
                    </ul>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* light  */}
      {lightModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-auto">
            <div className="flex justify-between p-1 rounded-md px-2 font-bold uppercase bg-[#fef9c3]">
              <h1 className="uppercase font-extrabold text-xl ">
                Light order Details
              </h1>
              <Tooltip title="close" placement="bottom" arrow>
                <button
                  onClick={lightCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
            <div className="grid grid-cols-1 mt-4">
              <table className="table-auto border-collapse border border-gray-500">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Ladi White
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Ladi Blue
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Ladi Yellow
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Ladi Pink
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Ladi Red
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-gray-500">
                      {specificOrderDetails?.lights?.ladiWhite}
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      {specificOrderDetails?.lights?.ladiBlue}
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      {specificOrderDetails?.lights?.ladiYellow}
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      {specificOrderDetails?.lights?.ladiPink}
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      {specificOrderDetails?.lights?.ladiRed}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* decoration model  */}
      {decorationModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <div className="flex justify-between">
              <dir>
                <p>Decoration Order item Details</p>
              </dir>
              <button
                onClick={decorationCloseModal}
                className="text-gray-500 hover:text-gray-700"
              ></button>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-center">Comming Soon!</p>
            </div>
          </div>
        </div>
      )}

      {/* more option model */}
      {/* {
        moreOptionModel && (
        
          <div className="flex items-end justify-center w-full h-full fixed inset-0 z-50">
          <div className="flex flex-row justify-between mb-10">
            <MoreOptionModel selectedRows={selectedRows} setMoreOptionModel={setMoreOptionModel} />
          </div>
        </div>
        
      )
      } */}
    </div>
  );
};

export default Order;
