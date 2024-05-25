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

const OrderManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [active, setActive] = useState(false);
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname);

  useEffect(() => {
    setPath(location?.pathname?.split("/")[2]);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="w-full flex flex-row justify-between bg-gray-100 border py-3 sm:py-5 md:py-5 lg:py-5 xl:-py-5 mt-0">
        <span className="flex uppercase xl:ml-12  mx-4 md:mx-10 lg:mx-10 xl:mx-10 py-2 font-medium sm:text-sm md:text-xl lg:text-xl xl:text-xl">
          <FiAlignLeft
            className="text-3xl mr-5 md:mr-10 lg:mr-10 xl:mr-10 cursor-pointer"
            onClick={() => setActive(!active)}
          />
          <span className="hidden sm:inline md:inline lg:inline xl:inline">
            Order Management System
          </span>
        </span>
        <div className="md:mr-12 sm:m-0 px-2">
          <Tooltip title="Settings" arrow>
            <button className="p-1">
              <SettingsIcon sx={{ fontSize: 25, color: "#581845" }} />
            </button>
          </Tooltip>
          <Tooltip title="Notifications" arrow>
            <button
              className="p-1"
              onClick={() =>
                setIsNotificationModalOpen(!isNotificationModalOpen)
              }
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
      <div className="flex flex-row w-full h-full fixed">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      {isModalOpen && (
        <UserProfileModel onRequestClose={() => setIsModalOpen(false)} />
      )}
      {isNotificationModalOpen && <NotificationDetailsPage />}

      {active && (
        <>
          <div
            className={` ${
              active
                ? "w-[18rem] z-100 inset-0 absolute top-0 bg-white h-full flex ease-in-out duration-500 transform translate-x-0"
                : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col justify-between h-screen">
              {/* sidenav bar */}
              <div className="flex flex-col items-center w-full cursor-pointer ">
                <div className="w-full flex justify-between px-3 items-center py-5">
                  <span className="text-lg uppercase">DG Caterers</span>
                  <button
                    className=" self-end p-2 m-2 text-gray-600 hover:text-red-600"
                    onClick={toggleSidebar}
                  >
                    <IoCloseSharp className="text-xl" />
                  </button>
                </div>
                <ul>
                  <li className="flex flex-row justify-between text-lg">
                    {active ? (
                      <Link to={"./home"}>
                        <div
                          className={`w-[18rem] flex flex-row hover:bg-indigo-100  border-slate-800 ${
                            path === "home"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2">
                            <DashboardIcon sx={{ color: "#581845" }} />
                          </span>
                          <button className="">Dashboard</button>
                        </div>
                      </Link>
                    ) : (
                      <Link to="./home">
                        <Tooltip title="Dashboard" arrow placement="right">
                          <button className="p-2">
                            <DashboardIcon sx={{ color: "#581845" }} />
                          </button>
                        </Tooltip>
                      </Link>
                    )}
                  </li>
                  <li className="flex flex-row justify-between text-lg">
                    {active ? (
                      <Link to={"./order"}>
                        <div
                          className={`w-[18rem] flex flex-row hover:bg-indigo-100 active:border-r-2 border-slate-800 ${
                            path === "order"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2">
                            <ContactPhoneIcon sx={{ color: "#581845" }} />
                          </span>
                          <button className="">Order</button>
                        </div>
                      </Link>
                    ) : (
                      <Link to="./order">
                        <Tooltip title="Order" arrow placement="right">
                          <button className="p-2">
                            <ContactPhoneIcon sx={{ color: "#581845" }} />
                          </button>
                        </Tooltip>
                      </Link>
                    )}
                  </li>
                  <li className="flex flex-row justify-between text-lg">
                    {active ? (
                      <Link to={"./inventory"}>
                        <div
                          className={`w-[18rem] flex flex-row hover:bg-indigo-100 active:border-r-2 border-slate-800 ${
                            path === "inventory"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2">
                            <InventoryIcon sx={{ color: "#581845" }} />
                          </span>
                          <button className="">Inventory</button>
                        </div>
                      </Link>
                    ) : (
                      <Link to={"./inventory"}>
                        <Tooltip title="Inventory" arrow placement="right">
                          <button className="p-2">
                            <InventoryIcon sx={{ color: "#581845" }} />
                          </button>
                        </Tooltip>
                      </Link>
                    )}
                  </li>
                  <li className="flex flex-row justify-between text-lg">
                    {active ? (
                      <Link to={"./purchase"}>
                        <div
                          className={`w-[18rem] flex flex-row hover:bg-indigo-100 active:border-r-2 border-slate-800 ${
                            path === "purchase"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2">
                            <StoreIcon sx={{ color: "#581845" }} />
                          </span>
                          <button className="">Purchase</button>
                        </div>
                      </Link>

                    ) : (
                      <Link to={"./purchase"}>
                        <Tooltip title="Purchase" arrow placement="right">
                          <button className="p-2">
                            <StoreIcon sx={{ color: "#581845" }} />
                          </button>
                        </Tooltip>
                      </Link>
                    )}
                  </li>
                  <li className="flex flex-row justify-between text-lg">
                    {active ? (
                      <Link to={"./customer"}>
                        <div
                          className={`w-[18rem] flex flex-row hover:bg-indigo-100 active:border-r-2 border-slate-800 ${
                            path === "customer"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2">
                            <PortraitIcon sx={{ color: "#581845" }} />
                          </span>
                          <button className="">Customer</button>
                        </div>
                      </Link>
                    ) : (
                      <Link to={"./customer"}>
                        <Tooltip title="Customer" arrow placement="right">
                          <button className="p-2">
                            <PortraitIcon sx={{ color: "#581845" }} />
                          </button>
                        </Tooltip>
                      </Link>
                    )}
                  </li>
                  <li className="flex flex-row justify-between text-lg">
                    {active ? (
                      <Link to={"./allRecipes"}>
                        <div
                          className={`w-[18rem] flex flex-row hover:bg-indigo-100 active:border-r-2 border-slate-800 ${
                            path === "allRecipes"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2">
                            <FoodBankIcon sx={{ color: "#581845" }} />
                          </span>
                          <button className="">Recipes</button>
                        </div>
                      </Link>
                    ) : (
                      <Link to={"./allRecipes"}>
                        <Tooltip title="All Recipes" arrow placement="right">
                          <button className="p-2">
                            <FoodBankIcon sx={{ color: "#581845" }} />
                          </button>
                        </Tooltip>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              {/* for lout and version  */}
              <div className="flex flex-col justify-center items-center">
                <span className="capitalize underline py-1 cursor-pointer text-sm text-gray-500">
                  {" "}
                  version v1.0.1
                </span>
                <button className="p-3 bg-indigo-300 w-full uppercase text-white">
                  Follow us on
                </button>
              </div>
            </div>
          </div>

          {/* blur effect  */}
          <div
            onClick={toggleSidebar}
            className={`z-100 inset-0 absolute top-0 bg-gray-800 opacity-50 ${
              active
                ? `w-auto ml-[18rem] h-screen flex transition-all ease-in-out duration-200 `
                : "w-auto h-screen "
            }`}
          ></div>
        </>
      )}
    </>
  );
};

export default OrderManagement;
