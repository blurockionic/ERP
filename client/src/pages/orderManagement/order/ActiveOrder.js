import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { OrderDataContext } from "../../../context/OrderdataContext";

const ActiveOrder = () => {
  const { allOrder } = useContext(OrderDataContext);
  const [activeOrderData, setActiveOrderData] = useState([]);

  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  // filtering the data using the useEffect
  useEffect(() => {
    const activeOrder = allOrder.filter((item) => item.status === "active");
    setActiveOrderData(activeOrder);
  }, [activeOrderData, allOrder]);

  return (
    <>
      <Toaster />
      <div className=" h-auto bg-slate-50 p-2">
        {/* heading items */}

        <div className="flex flex-row justify-between  bg-transparent  ">
          {/*  back button */}
          <div className="flex bg-slate-100 rounded ">
            <div className="relative inline-block">
              <Link to={"../order"}>
                <div
                  className={`px-3 bg-white py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100`}
                >
                  Back
                </div>
              </Link>
            </div>
          </div>

          <div className="flex bg-slate-100 rounded ">
            <div className="relative inline-block">
              {/* Filter button */}
              <div
                className={`px-3  bg-white py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100`}
                // onClick={toggleDropdown}
              >
                <FilterListIcon className="mr-1" />
                Filter
              </div>
              {/* Dropdown menu */}
            </div>
          </div>
        </div>

        <div className="mt-2 p-4  border-2 h-[628px]  rounded-xl">
          <div className="flex justify-between">
            {/* Tab Heading */}
            <div className="pl-4">
              <span className="text-3xl font-semibold ">Active Order </span>
              <p>Current active order</p>
            </div>
          </div>
          {/*  table and Add item div */}
          <div className="h-[90%] overflow-y-scroll ">
            {/* Add item div */}
            <div className="">
              <div className=" bg-white border p-3 rounded-md mt-4">
                <div className="mt-2  table-container h-screen overflow-y-auto">
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
                      </tr>
                    </thead>
                    <tbody className="text-sm font-normal overflow-y-auto mt-4 bg-white">
                      {activeOrderData.map((order, index) => (
                        <React.Fragment key={index}>
                          <tr
                            className={`border-b text-center`}
                            onClick={() => toggleRow(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <td className="py-2 border-r-2 mx-auto font-bold">
                              {index + 1}
                            </td>
                            <td className="py-2 text-center">
                              {order.orderId}
                            </td>
                            <td className="py-2 text-center font-semibold">
                              {order.customerPhoneNumber}
                            </td>
                            <td className="py-2 text-center">
                              {order.customerName}
                            </td>
                            <td className="py-2 text-center">
                              {order.customerAddress}
                            </td>
                            <td className="py-2 text-center">
                              {order.dateAndTime}
                            </td>
                            <td className="py-2 text-center relative">
                              <span
                                className={`${
                                  order.status === "active"
                                    ? "bg-blue-200 w-[5rem] text-center font-semibold py-1 px-3 rounded"
                                    : ""
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                          {expandedRow === index && (
                            <tr>
                              <td colSpan="7" className="py-2 px-4">
                                {/* Render additional details here */}
                                {/* Example: <div>{order.additionalDetails}</div> */}
                                <div>
                                  Additional details for order with ID{" "}
                                  {order.orderId}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </>
  );
};

export default ActiveOrder;
