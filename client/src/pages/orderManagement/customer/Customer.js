import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config/config";
import Loader from "../../../components/Loader";

const Customer = () => {
  const [allCustomer, setAllCustomer] = useState([]);
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

        setAllCustomer(data);
      } catch (error) {
        setIsLoading(false);
        // Handle the error here, you can log it or show a message to the user
        console.error("Error fetching orders:", error);
      }
    };

    //invoke
    fetchAllCustomer();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className=" inset-0 flex justify-center items-center h-[500px] z-30"> <Loader/> </div>
      ) : (
        <div>
          {/* Table and Add item div */}
          <div className="h-[680px]">
            <div className=" table-container h-[90%] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-white text-gray-900 sticky top-0 shadow-md uppercase">
                  <tr>
                    <th className="py-2 px-4 text-left hidden sm:table-cell text-xs sm:text-sm">
                      SNo.
                    </th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Mobile Number</th>
                    {/* <th className="py-2 px-4 text-left">Address</th> */}
                    <th className="py-2 px-4 text-left">More Details</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomer.map((order, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-100 h-16" : "bg-white h-16"
                      }
                    >
                      <td className="py-2 px-4 font-semibold hidden sm:table-cell text-xs sm:text-sm">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 capitalize font-semibold">
                        {order.customerName}
                      </td>
                      <td className="py-2 px-4">{order.customerPhoneNumber}</td>
                      {/* <td className="py-2 px-4">{order.customerAddress}</td> */}

                      <td className="py-2 px-4">
                        <Link
                          to={{
                            pathname: "customerProfileDetails",
                            search: `?customerName=${order.customerName}`,
                          }}
                          className="text-blue-500 underline"
                        >
                          Show
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;
