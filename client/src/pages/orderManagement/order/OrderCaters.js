import React, { useEffect, useState } from "react";
import StepOne from "../../../components/StepOne";

import axios from "axios";
import config from "../../../config/config";

const OrderCaters = () => {
  const [allItem, setAllItem] = useState([]);

  // get all inventary items
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/inventory/all`, {
          withCredentials: true,
        });
        setAllItem(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchInventoryItems();
  }, []);

  return (
    <>
      <StepOne />
    </>
  );
};

export default OrderCaters;
