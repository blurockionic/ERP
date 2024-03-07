import React, { useState } from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";
import UserProfileModel from "./UserProfileModel";


const NavBarforAllProjects = () => {
  const [title, setTitle] = useState("Lead Management");

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="">
      <nav className="w-full flex flex-row justify-between bg-slate-100 border-b-stone-300 border p-18 mt-0">
        <div className=" ml-12 font-extrabold text-2xl ">
          <span>LOGO</span>
        </div>

        <div>
          <span className="hidden lg:inline-block lg:text-[#581845]  xl:inline-block xl:text-[#581845] font-semibold text-2xl">
            {title}
          </span>
        </div>
        <div className="md:mr-12 sm:m-0 ">
          <Tooltip title="Settings" arrow>
            <button className="p-1">
              <SettingsIcon sx={{ fontSize: 25, color: "#581845" }} />
            </button>
          </Tooltip>
          <Tooltip title="Notifications" arrow>
            <button className="p-1">
              <NotificationsIcon sx={{ fontSize: 25, color: "#581845" }} />
            </button>
          </Tooltip>
          <Tooltip title="User Profile" arrow>
            <button className="p-1"  onClick={ ()=>setIsModalOpen(!isModalOpen)}>
              <AccountBoxIcon sx={{ fontSize: 25, color: "#581845" }} />
            </button>
          </Tooltip>
        </div>
      
      </nav>
    </div>
 {
  isModalOpen && (<UserProfileModel onRequestClose={setIsModalOpen}  />)
 }
    </>


  );
};

export default NavBarforAllProjects;
