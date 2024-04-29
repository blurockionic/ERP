import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const CustomerProfilePage = () => {
  // const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [profileDetailsActive, setProfileDetailsActive] = useState(true);
  const [orderHistoryActive, setOrderHistoryActive] = useState(false);
  const [orderderCategoryActive, setOrderderCategoryActive] = useState(false);

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

  return (
    <div>
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
            <div className="flex justify-between">
              {/* Tab Heading */}
              <div className="pl-4">
                <span className="text-3xl font-semibold ">Profile</span>
                <p>Recent Items from your store</p>
              </div>
            </div>
            {/*  table and Add item div */}
            <div className="h-[90%] overflow-y-scroll ">
              {/* Add item div */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfilePage;
