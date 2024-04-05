import React, { useEffect, useState } from "react";
import TabButtons from "../../../components/TabButtons";
import axios from "axios";
import config from "../../../config/config";

const Om_Dashboard = () => {
  const [orderModel, setOrderModel] = useState(true);
  const [otherDetails, setOtherDetails] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([])
  const [tentOrder, setTentOrder] = useState([])
  const [cateringOrder, setCateringOrder] = useState([])
  const [bistarOrder, setBistarOrder] = useState([])
  const [lightOrder, setLightOrder] = useState([])
  const [decorationOrder, setDecorationOrder] = useState([])

  useEffect(() => {
    //fetch customer details
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/customer/all`,
          {
            withCredentials: true,
          }
        );
        const { customers, success } = response.data;
        if (success) {
          setCustomerDetails(customers);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //invoke
    fetchCustomerDetails()
  },[])

  //count the data according to order type
  for (let i = 0; i < customerDetails.length; i++){
    if(customerDetails.isCateringOrdered){
      setCateringOrder([...cateringOrder, customerDetails])
    }
  }

  const otherDetailsHandler = () => {
    setOtherDetails(true);
    setOrderModel(false);
  };
  const allOrderhandler = () => {
    setOrderModel(true);
    setOtherDetails(false);
  };


  return (
    <>
      <div className=" xl:w-full">
        <nav className="xl:flex flex-row xl:border-b-2 sm:flex sm:w-full ">
          {/* company Details  */}
          <div className="flex items-center">
            {" "}
            <div className=" w-[3rem] h-[3rem] border-2 solid border-black bg-white ml-5  rounded-full">
              {" "}
            </div>
            <div className="sm:hidden xl:inline-flex"> company Name</div>
          </div>
        </nav>

        <nav className="bg-slate-100 flex flex-row border-b-2">
          {/* dashboard  */}
          <div className="text-sm w-[7rem] text-center m-2 bg-[#d0dde0dd] p-2 font-semibold rounded-md">
            <button onClick={allOrderhandler}>All Type Order</button>{" "}
          </div>
          <div className="text-sm  w-[7rem] text-center m-2 bg-[#FAF3DD] p-2 font-semibold rounded-md">
            <button className="" onClick={otherDetailsHandler}>
              Other Details
            </button>{" "}
          </div>
        </nav>
      </div>

      {/* Crad div  */}
      {orderModel && <TabButtons />}

      {otherDetails && (
        <>
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Coming Soon!</h2>
            <p className="text-lg text-gray-100">
              We're working on bringing you an exciting new feature. Stay tuned!
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Om_Dashboard;
