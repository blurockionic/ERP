// DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const OrderDataContext = createContext();

const OrderDataContextProvider = ({ children }) => {
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

        setAllOrder(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllBedingOrder();
  }, []);

  return (
    <OrderDataContext.Provider value={{ allOrder, isLoading }}>
      {children}
    </OrderDataContext.Provider>
  );
};

export { OrderDataContext, OrderDataContextProvider };