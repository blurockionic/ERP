import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { OrderDataContext } from "../../../context/OrderdataContext";
import axios from "axios";
import config from "../../../config/config";

const CustomerProfilePage = () => {
  // const { id } = useParams();

  // const id = searchParams.get("id");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const customerName = searchParams.get("customerName");

  const [profileDetailsActive, setProfileDetailsActive] = useState(true);
  const [orderHistoryActive, setOrderHistoryActive] = useState(false);

  const [details, setDetails] = useState([]);
  const [customerAllOrder, setCustomerAllOrder] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  console.log(customerName);

  console.log("filter kiya hua deta a raha h", details);

  const tabButtonhandler = (value) => {
    const stateMap = {
      orderHistory: setOrderHistoryActive,
      profileDetails: setProfileDetailsActive,
    };

    // Set the active state corresponding to the given value to true,
    // and set all other states to false
    Object.keys(stateMap).forEach((key) => {
      stateMap[key](key === value);
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchAllCustomer = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${config.apiUrl}/order/allOrderOfACustomer`,
          {
            withCredentials: true,
          }
        );

        setIsLoading(false);
        const { data } = response.data;
        console.log(response.data);

        setIsLoading(false);
        setDetails(data);
      } catch (error) {
        // Handle the error here, you can log it or show a message to the user
        console.error("Error fetching a customer orders:", error);
      }
    };

    //invoke
    fetchAllCustomer();
  }, []);

  console.log("details ka andar data", details);
  useEffect(() => {
    if (customerName) {
      const ACustomerOrders = details.filter(
        (customer) => customer.customerName === customerName
      );
      setCustomerAllOrder(ACustomerOrders);
    }
  }, [details]);

  console.log("customer k all order", customerAllOrder);
  const handleOnUpadateUserDetails = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
    if (isEditing) {
      setIsEditing(false);
      toast.success("details Updated SuccessFully ");
    }
  };

  return (
    <div>
      <Toaster />

      {/* Header div  */}
      <div className="flex flex-row justify-between bg-slate-200 border">
        <Link to={"../customer"}>
          <div className="flex bg-white rounded font-semibold px-3 py-1 m-1 ">
            <Tooltip title="back to all cutomers" placement="bottom" arrow>
              <span className=" ">back</span>
            </Tooltip>
          </div>
        </Link>
      </div>

      {/* customer detils div  */}
      <div className=" ">
        {/* different tab */}
        <div className="m-2 flex bg-slate-100 rounded w-full ">
          <span
            className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
              profileDetailsActive
                ? "bg-white border-b-2 border-black"
                : "bg-transparent"
            }`}
            onClick={() => tabButtonhandler("profileDetails")}
          >
            Profile Details
          </span>
          <span
            className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
              orderHistoryActive
                ? "bg-white border-b-2 border-black"
                : "bg-transparent"
            }`}
            onClick={() => tabButtonhandler("orderHistory")}
          >
            Order History
          </span>
        </div>

        {/* Profile details tab active */}
        {profileDetailsActive && (
          <div className="mt-2 p-4  border-2 h-[550px]  rounded-xl">
            {/* add item div */}

            {/*  table and Add item div */}
            <div className=" grid grid-cols-1">
              {/* left side div  */}
              <div className="">
                {/* Add item div */}

                <div className=" py-4  w-full grid grid-cols-2 gap-x-16 gap-y-4 px-12">
                  <div className="flex flex-col col-span-2">
                    <h1 className="font-bold text-2xl">Personal Details </h1>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold py-2">First Name</span>
                    <span className=" ">
                      {" "}
                      {customerAllOrder[0]?.customerName}{" "}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold py-2 ">Phone Number </span>
                    <span className=" text-sm ">
                      <span>+91</span>{" "}
                      {customerAllOrder[0]?.customerPhoneNumber}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold py-2 ">Email </span>
                    <span className="text-sm ">
                      {" "}
                      {customerAllOrder[0]?.customerEmail}{" "}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold py-2 ">Address </span>
                    <span className="text-sm ">
                      {" "}
                      {customerAllOrder[0]?.customerAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <button
              onClick={handleOnUpadateUserDetails}
              className="rounded py-2 px-6 text-center align-middle text-xs font-bold bg-white border shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {isEditing ? "Save" : "Update"}
            </button> */}
          </div>
        )}
        {/* costomer order History */}
        {orderHistoryActive && (
          <div className="mt-2 p-4  border-2 h-[550px]  rounded-xl">
            {/* add item div */}

            <div>
              <div
                className="h-[5rem] w-[10rem] border p-2 flex flex-col rounded
             "
              >
                <span className="text-lg font-semibold text-center ">
                  Total order
                </span>
                <span className="font-bold text-2xl text-center text-green-600">
                  {/* Calculate the total count of orders */}
                  {customerAllOrder.reduce(
                    (totalCount, customer) =>
                      totalCount + customer.orders.length,
                    0
                  )}
                </span>{" "}
              </div>
            </div>
            <div className="mt-2 table-container h-[90%] overflow-y-auto">
              <table className="w-full text-center">
                <thead className="sticky top-0 bg-white text-sm z-10">
                  <tr className="text-gray-700 py-5">
                    {/* Add more table headers as needed */}
                    <th>S No.</th>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Order Category</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal overflow-y-auto mt-4 bg-white">
                  {customerAllOrder.map((customer, index) =>
                    customer.orders.map((order, orderIndex) => (
                      <tr key={`${index}-${orderIndex}`}>
                        <td> {index + 1} </td>
                        <td>{order.orderId}</td>
                        <td>{order.dateAndTime}</td>
                        <td className="font-semibold">
                          <div className="px-3 border-2 py-1 rounded-full border-gray-500 inline-block">
                            <span
                              className={`w-1.5 h-1.5 rounded-full inline-block mr-1 mb-0.5 ${
                                order.orderStatus === "Completed"
                                  ? "bg-gray-800"
                                  : order.orderStatus === "In Progress"
                                  ? "bg-blue-800"
                                  : order.orderStatus === "Confirmed"
                                  ? "bg-green-800"
                                  : order.orderStatus === "Not Confirmed"
                                  ? "bg-violet-800"
                                  : "bg-white" // Default color for other statuses
                              }`}
                            ></span>
                            {order.orderStatus}
                          </div>
                        </td>
                        {/* event order type  */}
                        <td className="py-2  text-center ">
                          {order.isLightOrdered && (
                            <span className="bg-yellow-100 px-3 mx-1 cursor-pointer border py-1 rounded-full border-gray-500 inline-block">
                              Light
                            </span>
                          )}
                          {order.isTentOrdered && (
                            <span className="bg-green-100 px-3 mx-1 cursor-pointer border py-1 rounded-full border-gray-500 inline-block">
                              Tent
                            </span>
                          )}
                          {order.isDecorationOrdered && (
                            <span className="bg-slate-100 px-3 mx-1  cursor-pointer border py-1 rounded-full border-gray-500 inline-block">
                              Decoration
                            </span>
                          )}
                          {order.isBistarOrdered && (
                            <span className="bg-blue-100 px-3 mx-1   cursor-pointer border py-1 rounded-full border-gray-500 inline-block">
                              beding
                            </span>
                          )}
                          {order.isCateringOrdered && (
                            <span className="bg-red-100 px-3 mx-1  cursor-pointer border py-1 rounded-full border-gray-500 inline-block">
                              Catering
                            </span>
                          )}
                        </td>

                        {/* Add more table cells for other order data */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Add item div */}
              <div>{/* Add your "Add item" functionality here */}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfilePage;
