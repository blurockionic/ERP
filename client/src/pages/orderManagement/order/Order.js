import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../config/config";
import SearchBar from "../../../components/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import CreateAllOrders from "../../../components/CreateAllOrders";
import toast, { Toaster } from "react-hot-toast";

const Order = () => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bistarModalVisible, setBitarModalVisible] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewOrder, setViewOrder] = useState(true);
  const [activeButton, setActiveButton] = useState("view");

  const [allOrder, setAllOrder] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [indexNumber, setIndexNumber] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAddress, setCustomerAdress] = useState("");

  const [specificOrderDetails, setspecificOrderDetails] = useState([]);

  useEffect(() => {
    const fetchAllBistarOrder = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/customer/all`, {
          withCredentials: true,
        });

        setIsLoading(false);
        const { customers } = response.data;

        setAllOrder(customers);
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
    setViewOrder(true);
  };
  // create button handler
  const CreateOrderHandler = () => {
    setActiveButton("create");
    setViewOrder(false);
    setShowModel(true);
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
    console.log(id, value);
    console.log(`${config.apiUrl}/${value}/specific/${id}`);
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
      //bistar
      if (success && value === "bistar") {
        setspecificOrderDetails(orders);
      }

      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log(specificOrderDetails.breakfast);

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

          {/* <Link>
            <button
              className={`p-2 m-2 rounded ${
                activeButton === "create" ? "bg-slate-100" : "bg-white"
              }`}
              onClick={CreateOrderHandler}
            >
              Create Order
            </button>
          </Link> */}

          <Link to={"../neworder"}>
            <button
              className={`p-2 m-2 rounded ${
                activeButton === "create" ? "bg-slate-100" : "bg-white"
              }`}
            >
              Create new Order
            </button>
          </Link>
        </div>

        <div className="bg-white flex flex-row justify-between border-b-2">
          {/* search button tab div */}
          <div className="pt-1">
            <SearchBar />
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
                <TuneIcon />
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>

      {/* table div*/}
      {viewOrder && (
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
                  className={`border-b ${
                    index + 1 === indexNumber &&
                    isUpdateClicked === true &&
                    "bg-slate-100"
                  }`}
                  key={index}
                >
                  <td className="py-2  border-r-2 text-center font-bold">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td className="py-2   text-center  ">{order.orderId}</td>
                  <td className="py-2   text-center ">
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
                        className={`border ${
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
                      <input
                        type={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? "date"
                            : "text"
                        }
                        disabled={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? false
                            : true
                        }
                        value={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? new Date(order.dateAndTime)
                                .toISOString()
                                .slice(0, 16)
                            : new Date(order.dateAndTime).toLocaleString()
                        }
                        className={`border ${
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? "border-green-500"
                            : ""
                        }`}
                      />
                    )}
                  </td>
                  <td className="py-2  text-center ">
                    {order.isLightOrdered && (
                      <span
                        onClick={() =>
                          handleOnOrderCategory(order._id, "light")
                        }
                        className="bg-yellow-100 px-2 mx-1 rounded-lg cursor-pointer"
                      >
                        Light
                      </span>
                    )}
                    {order.isTentOrdered && (
                      <span
                        onClick={() => handleOnOrderCategory(order._id, "tent")}
                        className="bg-green-100 px-2 mx-1 rounded-lg cursor-pointer"
                      >
                        Tent
                      </span>
                    )}
                    {order.isDecorationOrdered && (
                      <span
                        onClick={() =>
                          handleOnOrderCategory(order._id, "decoration")
                        }
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
                        <EditIcon
                          onClick={() => handleOnEdit(index + 1, order)}
                        />
                        <button className="ml-3 text-blue-800 underline">See Details</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* //catering model details  */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-2 ">
            <div className="flex justify-between">
              <h1 className="text-2xl">Catering</h1>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </div>
            <hr />
            <div className="w-[700px] grid grid-cols-2">
              <div className="col-span-1 m-4">
                <h6 className="px-2 py-2 bg-gray-200">Breakfast</h6>
                <div>
                  <span>Total Pack</span>
                  <p>{specificOrderDetails.breakfast?.totalPackCount}</p>
                </div>
                <div className="mb-2">
                  <p className="px-2 py-1 bg-gray-50 mb-2">Snack</p>
                  {specificOrderDetails.breakfast?.snacks?.map(
                    (item, index) => (
                      <span
                        className="bg-slate-50 rounded-full px-2 py-1"
                        key={index}
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Soup and Salad</p>
                  {specificOrderDetails.breakfast?.soupAndSalad?.map(
                    (item, index) => (
                      <span key={index}>{item}</span>
                    )
                  )}
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Main Course</p>
                  {specificOrderDetails.breakfast?.mainCourse?.map(
                    (item, index) => (
                      <span key={index}>{item}</span>
                    )
                  )}
                </div>
              </div>
              {/* lunch */}
              <div className="col-span-1 m-4">
                <h6 className="px-2 py-2 bg-gray-200">Lunch</h6>
                <div>
                  <span>Total Pack</span>
                  <p>{specificOrderDetails.lunch?.totalPackCount}</p>
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Snack</p>
                  {specificOrderDetails.lunch?.snacks?.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Soup and Salad</p>
                  {specificOrderDetails.lunch?.soupAndSalad?.map(
                    (item, index) => (
                      <span key={index}>{item}</span>
                    )
                  )}
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Main Course</p>
                  {specificOrderDetails.lunch?.mainCourse?.map(
                    (item, index) => (
                      <span key={index}>{item}</span>
                    )
                  )}
                </div>
              </div>
              {/* dinner */}
              <div className="col-span-2 m-4">
                <h6 className="px-2 py-2 bg-gray-200">Dinner</h6>
                <div>
                  <span>Total Pack</span>
                  <p>{specificOrderDetails.dinner?.totalPackCount}</p>
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Snack</p>
                  {specificOrderDetails.dinner?.snacks?.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Soup and Salad</p>
                  {specificOrderDetails.dinner?.soupAndSalad?.map(
                    (item, index) => (
                      <span key={index}>{item}</span>
                    )
                  )}
                </div>
                <div>
                  <p className="px-2 py-1 bg-gray-50">Main Course</p>
                  {specificOrderDetails.dinner?.mainCourse?.map(
                    (item, index) => (
                      <span key={index}>{item}</span>
                    )
                  )}
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
            <div className="flex justify-between">
              <dir>
                <p>Bistar</p>
              </dir>
              <button
                onClick={bistaerCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.414 6.586a2 2 0 0 0-2.828 0L10 7.172 8.586 5.757a2 2 0 1 0-2.828 2.828L7.172 10l-1.415 1.414a2 2 0 1 0 2.828 2.828L10 12.828l1.414 1.414a2 2 0 1 0 2.828-2.828L12.828 10l1.414-1.414a2 2 0 0 0 0-2.828z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <div>
                <h1>Pillow</h1>
                <p>{specificOrderDetails.pillow}</p>
              </div>
              <div>
                <h1>Bedsheet</h1>
                <p>{specificOrderDetails.bedsheet}</p>
              </div>
              <div>
                <h1>Blanket</h1>
                <p>{specificOrderDetails.blanket}</p>
              </div>
              <div>
                <h1>Chadar</h1>
                <p>{specificOrderDetails.chadar}</p>
              </div>
              <div>
                <h1>Bed</h1>
                <p>{specificOrderDetails.bed}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModel && <CreateAllOrders setShowModel={setShowModel} />}
    </div>
  );
};

export default Order;
