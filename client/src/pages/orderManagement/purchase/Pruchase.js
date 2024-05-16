import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { OrderDataContext } from "../../../context/OrderdataContext";
import { Tooltip } from "@mui/material";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";

const Pruchase = () => {
  const { allOrder } = useContext(OrderDataContext);
  const [activeButton, setActiveButton] = useState("view");
  const [todaysOrder, setTodaysOrder] = useState([]);
  const ViewOrderDetailsHandler = () => {
    setActiveButton("view");
  };
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

  const handleOnGeneratePurchase= async(orderId)=>{
    //SET ID IN LOCALSTORAGE
    localStorage.setItem("purchaseId", orderId)
  }

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
      </nav>
      {/* if allOrder length less than 0 then  */}
      {allOrder.length > 0 ? (
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
              {todaysOrder.length > 0 ? (
                todaysOrder.map((order, index) => (
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
                        <Link to={"../generate-purchase"}>
                          <Tooltip
                            title="Generate Purchase Order"
                            placement="bottom"
                            arrow
                          >
                            <button className=" text-slate-800 py-3" onClick={()=>handleOnGeneratePurchase(order._id)}>
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
