import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { OrderDataContext } from "../../../context/OrderdataContext";

import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config/config";

const Customer = () => {
  // const { allOrder } = useContext(OrderDataContext);
  // const [filteredCustomer, setFiteredCustomer] = useState([]);

  const [allCustomer, setAllCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [filteredCustomer, setFiteredCustomer] = useState([]);

  useEffect(() => {
    const fetchAllCustomer = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/order/all`, {
          withCredentials: true,
        });

        setIsLoading(false);
        const { data } = response.data;

        setIsLoading(false);
        setAllCustomer(data);
      } catch (error) {
        // Handle the error here, you can log it or show a message to the user
        console.error("Error fetching orders:", error);
      }
    };

    //invoke
    fetchAllCustomer();
  }, []);
  console.log(
    "all customre k data k andar kya kya fields present h ",
    allCustomer
  );
  // console.log("filter liye hue customer aa rahe ", filteredCustomer);

  const toggleToCustomerProfilePageHandler = (index) => {
    console.log("this is toggle ", index + 1);
  };
  return (
    <>
      {" "}
      <div>
        {/* Table and Add item div */}
        <div className="h-[680px]">
          <div className="pl-4">
            <span className="text-3xl font-semibold">Our Customers</span>
          </div>

          <div className="mt-2 table-container h-[90%] overflow-y-auto">
            <table className="w-full text-center">
              <thead className="sticky top-0 bg-white text-sm z-10">
                <tr className="text-gray-700 py-5">
                  <th>SNo.</th>
                  <th>Mobile Number</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>More Details</th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal overflow-y-auto mt-4 bg-white">
                {allCustomer.map((order, index) => (
                  <tr
                    key={index}
                    className={`border-b text-center`}
                    onClick={() => toggleToCustomerProfilePageHandler(index)}
                    style={{ cursor: "pointer", height: "80px" }}
                  >
                    <td className="py-2 border-r-2 mx-auto font-bold">
                      {index + 1}
                    </td>
                    <td className="py-2 text-center font-semibold">
                      {order.customerPhoneNumber}
                    </td>
                    <td className="py-2 text-center capitalize font-bold">
                      {order.customerName}
                    </td>
                    <td className="py-2 text-center">
                      {order.customerAddress}
                    </td>
                    <td className="align-middle text-center relative">
                      <Link
                        to={{
                          pathname: "customerProfileDetails",
                          search: `?id=${order._id}`,
                        }}
                      >
                        show
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer

