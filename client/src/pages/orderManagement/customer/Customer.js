import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config/config";
import Loader from "../../../components/Loader";

import ReadMoreIcon from "@mui/icons-material/ReadMore";

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
        <div className=" inset-0 flex justify-center items-center h-[500px] z-30">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div>
          {/* Table and Add item div */}
          <div className="container mx-auto px-4 overflow-y-scroll h-[600px]">
            <div className="mt-4 flex justify-between items-center bg-gray-500 text-white py-4 px-8 rounded-lg shadow-md mb-6 w-[20rem]">
              <h2 className="text-xl font-semibold">Total Customers</h2>
              <span className="text-xl font-semibold">
                {allCustomer.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
              {allCustomer.map((order, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg border p-4"
                >
                  <div className="text-sm font-semibold text-gray-500 mb-2">
                    Customer #{index + 1}
                  </div>
                  <div className="text-lg font-bold capitalize mb-2">
                    {order.customerName}
                  </div>
                  <div className="text-gray-700 mb-2">
                    Mobile: {order.customerPhoneNumber}
                  </div>
                  <div className="mt-6">
                    <Link
                      to={{
                        pathname: "customerProfileDetails",
                        search: `?customerName=${order.customerName}`,
                      }}
                      className=" mt-4"
                    >
                      <span className=" py-1.5 px-2 border  bg-white shadow-md rounded-md">
                        see more details
                        <ReadMoreIcon className="mx-2" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;
