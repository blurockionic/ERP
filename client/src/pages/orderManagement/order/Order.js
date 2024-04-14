import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../config/config";
import SearchBar from "../../../components/SearchBar";
import { Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";

import CloseIcon from "@mui/icons-material/Close";
const Order = () => {
  const [showModel, setShowModel] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bistarModalVisible, setBitarModalVisible] = useState(false);
  const [tentModalVisible, setTentModalVisible] = useState(false);
  const [lightModalVisible, setLightModalVisible] = useState(false);
  const [decorationModalVisible, setDecorationtModalVisible] = useState(false);
  const [isOpenFilterModel, setIsOpenFilterModel] = useState(false);
  const [isMonthSelectOption, setIsMonthSelectOption] = useState(false);

  const [onFilterSearch, setOnFilterSearch] = useState("");

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewOrder, setViewOrder] = useState(true);
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

  useEffect(() => {
    const fetchAllBistarOrder = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/customer/all`, {
          withCredentials: true,
        });

        setIsLoading(false);
        const { customers } = response.data;

        console.log(customers);
        setAllOrder(customers);
        setAllOrderForSearch(customers);
      } catch (error) {
        // Handle the error here, you can log it or show a message to the user
        console.error("Error fetching orders:", error);
      }
    };

    //invoke
    fetchAllBistarOrder();
  }, [isLoading]);

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

  const handleOnEdit = (index, order) => {
    setIsUpdateClicked(true);
    setIndexNumber(index);
    setCustomerAdress(order.customerAddress);
    setCustomerName(order.customerName);
    setCustomerPhoneNumber(order.customerPhoneNumber);
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
        console.log("catering all details", specificOrderDetails);
      }
      //bistar
      if (success && value === "bistar") {
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

  // bistar
  const bistaerCloseModal = () => {
    setBitarModalVisible(false);
  };
  const bistarOpenModel = () => {
    setBitarModalVisible(true);
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
  const handleOnFilter = () => {
    setIsOpenFilterModel(true);
  };

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

  //current date
  console.log("hello")

  return (
    <div className=" w-full ">
      <Toaster />
      <nav className="bg-white flex flex-row justify-between border-b-2">
        {/* company Details  */}
        <div className="flex items-center">
          <Link>
            <button
              className={`p-2 m-2 rounded ${
                activeButton === "view" ? "bg-slate-100" : "bg-white"
              }`}
              onClick={ViewOrderDetailsHandler}
            >
              View Order Details
            </button>
          </Link>

          <Link to={"../neworder"}>
            <button
              className={`p-2 m-2 font-semibold rounded  hover:bg-lime-400 ${
                activeButton === "create" ? "bg-slate-100" : "bg-lime-300"
              }`}
            >
              <span className="px-1 ">
                <AddIcon />
                Create new Order
              </span>
            </button>
          </Link>
        </div>

        <div className="bg-white flex flex-row justify-between border-b-2">
          {/* search button tab div */}
          <div className="pt-1">
            <SearchBar handleOnSearch={handleOnSearch} />
          </div>
          {/* user detail tab  */}
          <div className=" flex flex-row items-center gap-4 mr-5">
            {/* user menu div  */}

            <div>
              {/* three dot button */}
              <Tooltip title="Edit Column " placement="bottom" arrow>
                <MoreVertIcon />
              </Tooltip>
            </div>

            <div>
              <Tooltip title="Fillter" placement="bottom" arrow>
                <TuneIcon onClick={handleOnFilter} />
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
      {/* if allOrder length less than 0 then  */}
      {allOrder.length > 0 ? (
        <div className="mt-2 border-2 table-container h-[35rem] overflow-y-auto">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-slate-300 ">
              <tr>
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
                <th className=" border-r-2 ">Order Id</th>
                <th className=" border-r-2 ">Mobile Number</th>
                <th className="border-r-2">Name </th>
                <th className="border-r-2">Address</th>
                <th className="border-r-2">Date & Time </th>
                <th className="border-r-2">Order Category</th>
                <th className="border-r-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal overflow-y-auto mt-4 ">
              {allOrder.map((order, index) => (
                <tr
                  className={`border-b h-16 text-center ${
                    index + 1 === indexNumber &&
                    isUpdateClicked === true &&
                    "bg-slate-100"
                  }`}
                  key={index}
                >
                  <td className="py-2  border-r-2 mx-auto font-bold">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td className="py-2   text-center  ">{order.orderId}</td>
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
                        className={`border  ${
                          index + 1 === indexNumber &&
                          isUpdateClicked === true &&
                          "border-green-500"
                        }`}
                      />
                    )}
                  </td>
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
                        className={`border ${
                          index + 1 === indexNumber &&
                          isUpdateClicked === true &&
                          "border-green-500"
                        }`}
                      />
                    )}
                  </td>
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
                        className={`border w-full ${
                          index + 1 === indexNumber &&
                          isUpdateClicked === true &&
                          "border-green-500"
                        }`}
                      />
                    )}
                  </td>
                  <td className="py-2   text-center ">
                    {order.dateAndTime === "" ? (
                      "-"
                    ) : (
                      // <input
                      //   type={
                      //     index + 1 === indexNumber && isUpdateClicked === true
                      //       ? "date"
                      //       : "text"
                      //   }
                      //   disabled={
                      //     index + 1 === indexNumber && isUpdateClicked === true
                      //       ? false
                      //       : true
                      //   }
                      //   value={
                      //     index + 1 === indexNumber && isUpdateClicked === true
                      //       ? new Date(order.dateAndTime)
                      //           .toISOString()
                      //           .slice(0, 16)
                      //       : new Date(order.dateAndTime).toLocaleString()
                      //   }
                      //   className={`border ${
                      //     index + 1 === indexNumber && isUpdateClicked === true
                      //       ? "border-green-500"
                      //       : ""
                      //   }`}

                        <input
                        type={"text"}
                        
                        value={
                          new Date(order.dateAndTime).toLocaleString()
                                
                            
                        }
                        disabled
                        // className={`border ${
                        //   index + 1 === indexNumber && isUpdateClicked === true
                        //     ? "border-green-500"
                        //     : ""
                        // }`}
                      />
                    )}
                  </td>
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
                    {order.isBistarOrdered && (
                      <span
                        onClick={() => {
                          handleOnOrderCategory(order._id, "bistar");
                          bistarOpenModel();
                        }}
                        className="bg-blue-100 px-2 mx-1 rounded-lg cursor-pointer"
                      >
                        Bistar
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
                          <button className=" text-blue-800 underline">
                            See Details
                          </button>
                        </Link>
                        <EditIcon
                          className="ml-3"
                          onClick={() => handleOnEdit(index + 1, order)}
                        />
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
                 <CloseIcon/>
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
      {/* bistar model  */}
      {bistarModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <div className="flex justify-between bg-[#DBEAFE] ">
              <div>
                <p className="font-bold uppercase px-2 rounded-md">
                  Bistar order Details
                </p>
              </div>
              <Tooltip title="close" placement="bottom" arrow>
                <button
                  onClick={bistaerCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                <CloseIcon/>
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
            <div className="m-2 h-[2rem]   border border-black  mt-6 rounded">
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
            {/* apply button
             */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleOnApplyFilter}
                className="bg-blue-400 px-3 py-2 text-white rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
