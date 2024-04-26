import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { OrderDataContext } from "../../../context/OrderdataContext";

const Customer = () => {
  const { allOrder } = useContext(OrderDataContext);
  const [filteredCustomer, setFiteredCustomer] = useState([]);
  useEffect(() => {
    setFiteredCustomer(
      allOrder.filter((customer) => customer.status === "completed")
    );
  }, [allOrder]);
  console.log("filter liye hue customer aa rahe ", filteredCustomer);
  return (
    <div>
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
                  {filteredCustomer.map((order, index) => (
                    <tr
                      className={`border-b text-center`}
                     
                      style={{ cursor: "pointer" }}
                    >
                      <td className="py-2 border-r-2 mx-auto font-bold">
                        {index + 1}
                      </td>
                      <td className="py-2 text-center">{order.orderId}</td>
                      <td className="py-2 text-center font-semibold">
                        {order.customerPhoneNumber}
                      </td>
                      <td className="py-2 text-center">{order.customerName}</td>
                      <td className="py-2 text-center">
                        {order.customerAddress}
                      </td>
                      <td className="py-2 text-center">{order.dateAndTime}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
