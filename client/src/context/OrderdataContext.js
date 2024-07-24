// DataContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";
import { useSelector } from "react-redux";

const OrderDataContext = createContext();

const OrderDataContextProvider = ({ children }) => {
  //get user details
  const { currentUser } = useSelector((state) => state.user);

  const [allOrder, setAllOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllBedingOrder = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/order/all`, {
          withCredentials: true,
        });

        setIsLoading(false);
        const { data } = response.data;

        //filter the data by company
        const filterdataByCompany =  data.filter((customer)=>customer.companyId === currentUser.companyId)

        setAllOrder(filterdataByCompany);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllBedingOrder();
  }, []);

  console.log(allOrder)

  return (
    <OrderDataContext.Provider value={{ allOrder, isLoading }}>
      {children}
    </OrderDataContext.Provider>
  );
};

export { OrderDataContext, OrderDataContextProvider };
