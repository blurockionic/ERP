// File: src/components/OrderManagement.js

import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";
import { FiAlignLeft } from "react-icons/fi";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import InventoryIcon from "@mui/icons-material/Inventory";
import PortraitIcon from "@mui/icons-material/Portrait";
import StoreIcon from "@mui/icons-material/Store";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import UserProfileModel from "../../components/UserProfileModel";
import NotificationDetailsPage from "../../components/NotificationDetailsPage";
import { IoCloseSharp } from "react-icons/io5";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

const OrderManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [active, setActive] = useState(false);
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname?.split("/")[2]);


  useEffect(() => {
    setPath(location?.pathname?.split("/")[2]);
  }, [location?.pathname]);

  const toggleSidebar = () => {
    setActive(!active);
  };

  const pathNames = {
    "neworder": "New Order",
    "orderdetails": "Order Details",
    "allRecipes": "Recipe",
    "createNewRecipes": "New Recipe"
  };

  const sidebarClass = `bg-white z-50 h-full fixed top-0 transition-transform duration-500 ${
    active ? "translate-x-0 w-[18rem]" : "-translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 top-0 bg-gray-800 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "w-full h-full fixed" : "hidden"
  }`;

  return (
    <div className="flex flex-col h-full w-full fixed">
      <nav className="w-full flex flex-row justify-between bg-gray-100 border py-3">
        <span className="flex uppercase xl:ml-12 mx-4 font-medium sm:text-sm md:text-xl">
          <FiAlignLeft
            className="text-3xl mr-5 cursor-pointer"
            onClick={toggleSidebar}
          />
          <span className="hidden sm:inline">{pathNames[path] || path}</span>
        </span>
        <div className="flex space-x-4 md:mr-12 px-2">
          <Tooltip title="Settings" arrow>
            <button className="p-1">
              <SettingsIcon sx={{ fontSize: 25, color: "#581845" }} />
            </button>
          </Tooltip>
          <Tooltip title="Notifications" arrow>
            <button
              className="p-1"
              onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
            >
              <NotificationsIcon sx={{ fontSize: 25, color: "#581845" }} />
            </button>
          </Tooltip>
          <Tooltip title="User Profile" arrow>
            <button
              className="p-1"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <AccountBoxIcon sx={{ fontSize: 25, color: "#581845" }} />
            </button>
          </Tooltip>
        </div>
      </nav>
      <div className="flex-grow relative overflow-auto">
        <Outlet />
      </div>
      {isModalOpen && <UserProfileModel onRequestClose={() => setIsModalOpen(false)} />}
      {isNotificationModalOpen && <NotificationDetailsPage />}
      <div className={sidebarClass}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <div className="w-full flex justify-between px-3 items-center py-5">
              <span className="text-lg uppercase">DG Caterers</span>
              <button
                className="self-end p-2 m-2 text-gray-600 hover:text-red-600"
                onClick={toggleSidebar}
              >
                <IoCloseSharp className="text-xl" />
              </button>
            </div>
            <ul>
              <SidebarLink to="home" active={active} path={path} icon={<DashboardIcon sx={{ color: "#581845" }} />} text="Dashboard" />
              <SidebarLink to="order" active={active} path={path} icon={<ContactPhoneIcon sx={{ color: "#581845" }} />} text="Order" />
              <SidebarLink to="inventory" active={active} path={path} icon={<InventoryIcon sx={{ color: "#581845" }} />} text="Inventory" />
              <SidebarLink to="purchase" active={active} path={path} icon={<StoreIcon sx={{ color: "#581845" }} />} text="Purchase" />
              <SidebarLink to="customer" active={active} path={path} icon={<PortraitIcon sx={{ color: "#581845" }} />} text="Customer" />
              <SidebarLink to="allRecipes" active={active} path={path} icon={<FoodBankIcon sx={{ color: "#581845" }} />} text="Recipes" />
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="capitalize underline py-1 cursor-pointer text-sm text-gray-500">version v1.0.1</span>
            <button className="p-3 bg-indigo-300 w-full uppercase text-white">Follow us on</button>
          </div>
        </div>
      </div>
      <div className={blurEffectClass} onClick={toggleSidebar}></div>
    </div>
  );
};

const SidebarLink = ({ to, active, path, icon, text }) => (
  <li className="flex flex-row justify-between text-lg">
    {active ? (
      <Link to={to}>
        <div className={`w-[18rem] flex flex-row hover:bg-indigo-100 ${path === to ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]" : "hover:bg-indigo-50 text-gray-600"}`}>
          <span className="p-2">{icon}</span>
          <button className="">{text}</button>
        </div>
      </Link>
    ) : (
      <Link to={to}>
        <Tooltip title={text} arrow placement="right">
          <button className="p-2">{icon}</button>
        </Tooltip>
      </Link>
    )}
  </li>
);

export default OrderManagement;
