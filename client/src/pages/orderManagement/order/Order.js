import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import axios from "axios";

import config from "../../../config/config";
import SearchBar from "../../../components/SearchBar";
import { Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";

import CloseIcon from "@mui/icons-material/Close";

import FilterListIcon from "@mui/icons-material/FilterList";

const Order = () => {
  const [showModel, setShowModel] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bedingModalVisible, setBedingModalVisible] = useState(false);
  const [tentModalVisible, setTentModalVisible] = useState(false);
  const [lightModalVisible, setLightModalVisible] = useState(false);
  const [decorationModalVisible, setDecorationtModalVisible] = useState(false);
  const [isOpenFilterModel, setIsOpenFilterModel] = useState(false);
  const [isMonthSelectOption, setIsMonthSelectOption] = useState(false);

  const [onFilterSearch, setOnFilterSearch] = useState("");

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [viewOrder, setViewOrder] = useState(true);
  const [activeButton, setActiveButton] = useState("view");

  const [allOrder, setAllOrder] = useState([]);
  const [allOrdeForSearch, setAllOrderForSearch] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [indexNumber, setIndexNumber] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAddress, setCustomerAdress] = useState("");

  const [specificOrderDetails, setspecificOrderDetails] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  const [changeInputFieldType, setChangeInputFieldType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  // filter usestates
  const [isOpen, setIsOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filterItems, setFilterItems] = useState([]);
  // active data for the new tab
  const [activeFilterItems, setActiveFilterItems] = useState([]);
  // usestate for change filter value
  const [filterValue, setFilterValue] = useState("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [ordersNewStatus, setOrdersNewStatus] = useState("");

  // all order items details are comming from here
  
  useEffect(() => {
    const fetchAllbedingOrder = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/customer/all`, {
          withCredentials: true,
        });

        setIsLoading(false);
        const { customers } = response.data;

        console.log("new customer details array : -", customers);
        setIsLoading(false);
        setAllOrder(customers);
        setAllOrderForSearch(customers);
      } catch (error) {
        // Handle the error here, you can log it or show a message to the user
        console.error("Error fetching orders:", error);
      }
    };

    //invoke
    fetchAllbedingOrder();
  }, [isLoading]);

  //  Toggles the dropdown state and sets the filter active state.
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFilterActive(true);
  };
  // handle filter select handler function
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  // handle view  order details
  const ViewOrderDetailsHandler = () => {
    setActiveButton("view");
    setShowModel(false);
  };

  const handleSelectAll = () => {
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
    console.log(id);
    console.log(customerName, customerAddress, customerPhoneNumber);
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

  // const handleOnEdit = (index, order) => {
  //   setIsUpdateClicked(true);
  //   setIndexNumber(index);
  //   setCustomerAdress(order.customerAddress);
  //   setCustomerName(order.customerName);
  //   setCustomerPhoneNumber(order.customerPhoneNumber);
  // };

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
        console.log("catering all details", specificOrderDetails);
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

  //handle on filter model
  // const handleOnFilter = () => {
  //   setIsOpenFilterModel(true);
  // };

  // handel old filter model close
  const handleOnCloseFilterModel = () => {
    setIsOpenFilterModel(false);
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

  //more filter by date, day, week, month
  const handleSelectFilter = (value) => {
    setSelectedOption(value);
    console.log(value);

    //switch case for change the input field
    switch (value) {
      case "date":
        setChangeInputFieldType("date");
        setIsMonthSelectOption(false);
        break;
      case "month":
        // setChangeInputFieldType("date");
        setIsMonthSelectOption(true);
        break;
      case "name":
        setChangeInputFieldType("text");
        setIsMonthSelectOption(false);
        break;

      case "week":
        setChangeInputFieldType("date");
        setIsMonthSelectOption(false);
        break;

      default:
        setChangeInputFieldType("text");
        setIsMonthSelectOption(false);
    }
  };

  //handle for select month
  const handleOnChangeMonth = (value) => {
    setSelectedMonth(value);
  };

  //handle for apply button
  const handleOnApplyFilter = () => {
    // Filter orders based on the date part only
    setAllOrder(
      allOrdeForSearch.filter((order) => {
        // Extract the date part from the order's createdAt property
        const orderDate = order.dateAndTime?.split("T")[0];
        // Compare the date part of the order's createdAt with onFilterSearch
        return orderDate === onFilterSearch;
      })
    );
    setIsOpenFilterModel(false);
  };

  function isToday(someDate) {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  }

  // select option handler for status
  const handleStatusChange = (newStatus) => {
    setOrdersNewStatus(newStatus);
    // setAllOrder(
    //   allOrder.map((item) =>
    //     item._id === order._id ? { ...item, status: newStatus } : item
    //   )
    // );
  };

  // filtering the data using the useEffect
  useEffect(() => {
    if (selectedFilter === "all") {
      setFilterItems(allOrder);
    } else if (selectedFilter === "active") {
      const activeOrder = allOrder.filter((item) => item.status === "active");
      setFilterItems(activeOrder);
      setActiveFilterItems(activeOrder)
    } else if (selectedFilter === "pending") {
      const pendingOrder = allOrder.filter((item) => item.status === "pending");
      setFilterItems(pendingOrder);
    } else if (selectedFilter === "awaited") {
      const awaitedOrder = allOrder.filter((item) => item.status === "awaited");
      setFilterItems(awaitedOrder);
    } else if (selectedFilter === "scrap") {
      const scrapOrder = allOrder.filter((item) => item.status === "scrap");
      setFilterItems(scrapOrder);
    } else if (selectedFilter === "onhold") {
      const onholdOrder = allOrder.filter((item) => item.status === "onhold");
      setFilterItems(onholdOrder);
    } else if (selectedFilter === "noresponse") {
      const noresponseOrder = allOrder.filter(
        (item) => item.status === "noresponse"
      );
      setFilterItems(noresponseOrder);
    } else if (selectedFilter === "completed") {
      const completedOrder = allOrder.filter(
        (item) => item.status === "completed"
      );

      setFilterItems(completedOrder);
    }
  }, [selectedFilter, allOrder]);
  // status change handler function for order
  const statusChangeHandler = (index) => {
    setFilterValue(index);
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  // handler function for the order status
  const handleSaveNewStatus = async (id) => {
    // console.log("particular id of a row and order ", id);
    setStatusDropdownOpen(false);
    setIsLoading(true);
    try {
      // Make the PUT request to update the status of the order
      const response = await axios.put(
        `${config.apiUrl}/customer/update/status/${id}`,
        { status: ordersNewStatus },
        { withCredentials: true }
      );

      const { success, message } = response.data;
      toast.success(message);

      // Handle success
      console.log("Order status updated successfully:", response.data);

      // If you need to update any local state after the API call, you can do it here
    } catch (error) {
      toast.error("not able to change status");
      // Handle error
      console.error("Error updating order status:", error);
    }
  };
  return (
    <div className=" w-full bg-gray-50">
      <Toaster />
      <nav className="bg-gray-100 flex flex-row justify-between border-b-2">
        {/* order and create order button */}
        <div className="flex items-center">
          <Link>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100 ${
                activeButton === "view" ? "bg-white" : "bg-white"
              }`}
              onClick={ViewOrderDetailsHandler}
            >
              Order
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
        </div>

        <div className="bg-gray-100 flex flex-row justify-between">
          {/* search button tab div */}

          <SearchBar handleOnSearch={handleOnSearch} />

          {/* user detail tab  */}
          <div className=" flex flex-row items-center gap-4 mr-5">
            {/* user menu div  */}
            {/* more add cloumn button */}
            <div>
              {/* three dot button */}
              <Tooltip title="Edit Column " placement="bottom" arrow>
                <MoreVertIcon />
              </Tooltip>
            </div>
            {/* old fillter button */}
            {/* <div>
              <Tooltip title="Filter" placement="bottom" arrow>
                <TuneIcon onClick={handleOnFilter} />
              </Tooltip>
            </div> */}

            {/* filter model and filter button and export button */}
            <div className="relative inline-block">
              {/* Filter button */}
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100 ${
                  filterActive ? "bg-white" : "bg-transparent"
                }`}
                onClick={toggleDropdown}
              >
                <FilterListIcon className="mr-1" />
                Filter
              </div>
              {/* Dropdown menu */}
              {isOpen && (
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
          </div>
        </div>
      </nav>
      {/* if allOrder length less than 0 then  */}
      {allOrder.length > 0 ? (
        <div className="mt-2  table-container h-[585px] overflow-y-auto">
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
              {filterItems.map((order, index) => (
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
                  <td  className="py-2  border-r-2 mx-auto font-bold">

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
                        (order.status === "active"
                          ? "bg-blue-200 w-[5rem]  text-center font-semibold py-1 px-3 rounded "
                          : "") ||
                          (order.status === "pending"
                          ? "bg-blue-200 w-[5rem]  text-center font-semibold py-1 px-3 rounded "
                          : "") ||
                        (order.status === "completed"
                          ? "bg-green-100 font-semibold py-1 px-3 rounded "
                          : "") ||
                        (order.status === "awaited"
                          ? "bg-yellow-100 font-semibold py-1 px-3 rounded "
                          : "") ||
                        (order.status === "scrap"
                          ? "bg-purple-200 font-semibold py-1 px-3 rounded "
                          : "") ||
                        (order.status === "onhold"
                          ? "bg-red-100 font-semibold py-1 px-3 rounded "
                          : "") ||
                        (order.status === "noresponse"
                          ? "bg-slate-100 font-semibold py-1 px-3 rounded "
                          : "")
                      } `}
                    >
                      <button className="mx-auto w-[5rem]" onClick={() => statusChangeHandler(index)}>
                        {order.status}
                      </button>
                    </span>
                    {order.status !== "completed" &&
                      filterValue === index &&
                      statusDropdownOpen && (
                        <div className="items-center absolute top-full left-0 z-10 mt-1 p-2 w-36 bg-white border rounded-md shadow-lg">
                          <div className="">
                            <span className="font-bold capitalize bg-slate-100 py-1 px-3 w-full">
                              {order.status}
                            </span>
                          </div>

                          <div className="relative">
                            <select
                              value={ordersNewStatus}
                              onChange={(e) =>
                                handleStatusChange(e.target.value)
                              }
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
                            onClick={() => handleSaveNewStatus(order._id)}
                          >
                            Save
                          </button>
                        </div>
                      )}
                  </td>

                  {/* event order type  */}
                  <td className="py-2  text-center ">
                    {order.isLightOrdered && (
                      <span
                        onClick={() => {
                          handleOnOrderCategory(order._id, "light");
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
                          handleOnOrderCategory(order._id, "tent");
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
                          handleOnOrderCategory(order._id, "decoration");
                          decorationOpenModel();
                        }}
                        className="bg-slate-100 px-2 mx-1 rounded-lg cursor-pointer"
                      >
                        Decoration
                      </span>
                    )}
                    {order.isbedingOrdered && (
                      <span
                        onClick={() => {
                          handleOnOrderCategory(order._id, "beding");
                          bedingOpenModel();
                        }}
                        className="bg-blue-100 px-2 mx-1 rounded-lg cursor-pointer"
                      >
                        beding
                      </span>
                    )}
                    {order.isCateringOrdered && (
                      <span
                        onClick={() => {
                          handleOnOrderCategory(order._id, "catering");
                          openModal();
                        }}
                        className="bg-red-100 px-2 mx-1 rounded-lg cursor-pointer"
                      >
                        Catering
                      </span>
                    )}
                  </td>
                  {/* Action Update Button */}
                  <td className="py-2 text-center flex justify-evenly cursor-pointer">
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
                          <button className=" text-blue-800 underline py-3">
                            See Details
                          </button>
                        </Link>
                        {/* <EditIcon
                          className="ml-3"
                          onClick={() => handleOnEdit(index + 1, order)}
                        /> */}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-xl p-4 bg-gray-100 m-4">
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

      {/* filter model  */}
      {isOpenFilterModel && (
        <div className="z-50 fixed inset-0 items-start justify-end flex bg-gray-800 bg-opacity-50">
          <div className="h-screen w-72 bg-white p-4">
            <div className="flex justify-between p-1 rounded-md px-2 font-bold bg-[#c9d3fe69]">
              <h1 className=" font-semibold text-xl ">Filter</h1>
              <Tooltip title="close" placement="bottom" arrow>
                <button
                  onClick={handleOnCloseFilterModel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon className="text-red-600" />
                </button>
              </Tooltip>
            </div>
            <div className="w-64 mt-4">
              <label
                htmlFor="select"
                className="block text-sm font-medium text-gray-700"
              >
                Filter by:
              </label>
              <select
                id="select"
                name="select"
                value={selectedOption}
                onChange={(e) => handleSelectFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">-- Please select --</option>
                <option value="date">Date</option>
                <option value="month">Month</option>
              </select>
            </div>

            {/* select month then  */}
            {isMonthSelectOption && (
              <div>
                <label htmlFor="month">Select a month:</label>
                <br />
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => handleOnChangeMonth(e.target.value)}
                  className="w-full py-2 border border-gray-300 rounded-md"
                >
                  <option value="">-- Select --</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            )}
            {/* search bar  */}
            {/* <div className="m-2 h-[2rem]   border border-black  mt-6 rounded">
              <SearchIcon className="ml-2" />

              <input
                className="p-2 h-full outline-none"
                type={changeInputFieldType}
                name=""
                id=""
                onChange={(e) => setOnFilterSearch(e.target.value)}
                placeholder="Search Name......"
              />
            </div>
           
            <div className="flex justify-end mt-6">
              <button
                onClick={handleOnApplyFilter}
                className="bg-blue-400 px-3 py-2 text-white rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
