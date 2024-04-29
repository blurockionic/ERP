import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { OrderDataContext } from "../../../context/OrderdataContext";

const CustomerProfilePage = () => {
  // const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [profileDetailsActive, setProfileDetailsActive] = useState(true);
  const [orderHistoryActive, setOrderHistoryActive] = useState(false);
  const [orderderCategoryActive, setOrderderCategoryActive] = useState(false);
  const [details, setDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { allOrder } = useContext(OrderDataContext);

  useEffect(() => {
    if (allOrder) {
      const data = allOrder.filter((item) => item._id === id);
      setDetails(data);
    }
  }, [allOrder]);

  console.log("filter kiya hua deta a raha h", details);

  const tabButtonhandler = (value) => {
    const stateMap = {
      orderHistory: setOrderHistoryActive,
      orderCategory: setOrderderCategoryActive,
      profileDetails: setProfileDetailsActive,
    };

    // Set the active state corresponding to the given value to true,
    // and set all other states to false
    Object.keys(stateMap).forEach((key) => {
      stateMap[key](key === value);
    });
  };



  const handleOnUpadateUserDetails = () => {
    if(!isEditing){

        setIsEditing(true);
    }
    if (isEditing) {
      setIsEditing(false);
      toast.success("details Updated SuccessFully ");
    }
  };


  return (
    <div>
      <Toaster />

      {/* Header div  */}
      <div className="flex flex-row justify-between bg-slate-200 border">
        <Link to={"../customer"}>
          <div className="flex bg-white rounded font-semibold px-3 py-1 m-1 ">
            <Tooltip title="back to all cutomers" placement="bottom" arrow>
              <span className=" ">back</span>
            </Tooltip>
          </div>
        </Link>
      </div>

      {/* customer detils div  */}
      <div className=" ">
        {/* different tab */}
        <div className="m-2 flex bg-slate-100 rounded w-full ">
          <span
            className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
              profileDetailsActive
                ? "bg-white border-b-2 border-black"
                : "bg-transparent"
            }`}
            onClick={() => tabButtonhandler("profileDetails")}
          >
            Profile Details
          </span>
          <span
            className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
              orderHistoryActive
                ? "bg-white border-b-2 border-black"
                : "bg-transparent"
            }`}
            onClick={() => tabButtonhandler("orderHistory")}
          >
            Order History
          </span>
          <div
            className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer ${
              orderderCategoryActive
                ? "bg-white border-b-2 border-black"
                : "bg-transparent"
            }`}
            onClick={() => tabButtonhandler("orderCategory")}
          >
            {" "}
            Order Category
          </div>
        </div>

        {/* Profile details tab active */}
        {profileDetailsActive && (
          <div className="mt-2 p-4  border-2 h-[550px]  rounded-xl">
            {/* add item div */}

            {/*  table and Add item div */}
            <div className="flex flex-row ">
              {/* left side div  */}
              <div className=" w-[40rem] flex border-r-2 ">
                {/* Add item div */}

                <div className=" py-4  w-full grid grid-cols-2 gap-x-16 gap-y-4 px-12">
                  <div className="flex flex-col col-span-2">
                    <h1 className="font-bold text-2xl">Personal Details </h1>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold py-2">First Name</span>
                    <span className=" "> {details[0]?.customerName} </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold py-2 ">Phone Number </span>
                    <span className=" text-sm ">
                      <span>+91</span> {details[0]?.customerPhoneNumber}
                    </span>
                  </div>
                  {/* <div className="flex flex-col">
                    <span className="font-semibold py-2 ">
                      WhatsApp Number{" "}
                    </span>
                    <span className="text-sm ">{details[0].customerPhoneNumber }</span>
                  </div> */}
                  <div className="flex flex-col">
                    <span className="font-semibold py-2 ">Email </span>
                    <span className="text-sm ">
                      {" "}
                      {details[0]?.customerEmail}{" "}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold py-2 ">Address </span>
                    <span className="text-sm ">
                      {" "}
                      {details[0]?.customerAddress}
                    </span>
                  </div>
                  {/* <div className="flex flex-col">
                    <span className="font-semibold py-2 ">City </span>
                    <span className="text-sm ">Ludhiana </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold py-2 ">State</span>
                    <span className="text-sm ">Pujab</span>
                  </div> */}
                </div>
              </div>
              {/* right side div */}
              <div className=" w-[40rem] flex">
                {/* Add item div */}
                <div className=" py-4  w-full grid grid-cols-1 gap-x-16 gap-y-4 px-12">
                  <h1 className="font-bold text-2xl">Location</h1>
                </div>
              </div>
            </div>

            <button
              onClick={handleOnUpadateUserDetails}
              className="rounded py-2 px-6 text-center align-middle text-xs font-bold bg-white border shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {isEditing ? "Save" : "Update"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfilePage;
