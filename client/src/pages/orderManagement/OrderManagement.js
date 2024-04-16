import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import InventoryIcon from "@mui/icons-material/Inventory";
import PortraitIcon from '@mui/icons-material/Portrait';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApprovalIcon from "@mui/icons-material/Approval";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavBarforAllProjects from "../../components/NavBarforAllProjects";

const OrderManagement = () => {
  const [active, setActive] = useState(true);
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname);

  useEffect(() => {
    setPath(location?.pathname?.split("/")[2]);
  }, [location.pathname]);

  // Extract the pathname from the location object
  // Remove the leading slash
  return (
    <>
      <NavBarforAllProjects />
      <div className="flex flex-row w-full h-full fixed ">
        {/* navbar  */}
        {/* sidebar */}
        <div
          className={`${
            active
              ? `w-[12rem] h-[41rem]  flex transition-all ease-in-out duration-200 border-2`
              : " w-auto h-[41rem] border-r-2 "
          }`}
        >
          {/* side menubar */}
          <div>
            <button className="p-2">
              <MenuIcon
                sx={{
                  fontSize: 35,
                  color: "#581845",
                  marginLeft: active ? ` 9rem` : "",
                  transition: "ease-in-out 0.2s",
                }}
                onClick={() => setActive(!active)}
              />
            </button>

            <div className="flex flex-col items-center w-full cursor-pointer transition-all ease-in-out duration-200 ">
              <ul>
                {/* dashboard */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to={"./home"}>
                        <div
                          className={`w-[12rem] flex flex-row  hover:bg-indigo-100 active:border-r-2 border-slate-800    ${
                            path === "home"
                            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                            : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <DashboardIcon
                              sx={{
                                color: "#581845",
                              }}
                            />
                          </span>
                          <button className="">Dashboard</button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link to="./home">
                      <Tooltip title="Dashboard " arrow placement="right">
                        <button className="p-2">
                          <DashboardIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </button>
                      </Tooltip>
                    </Link>
                  )}
                </li>
                {/* order */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to={"./order"}>
                        <div
                          className={`w-[12rem] flex flex-row  hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "order"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <ContactPhoneIcon
                              sx={{
                                color: "#581845",
                              }}
                            />
                          </span>
                          <button className="">Order</button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link to="./order">
                      <Tooltip title="Order" arrow placement="right">
                        <button className="p-2">
                          <ContactPhoneIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </button>
                      </Tooltip>
                    </Link>
                  )}
                </li>

                {/* Inventory  */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to={"./inventory"}>
                      <div
                          className={`w-[12rem] flex flex-row  hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "inventory"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <InventoryIcon
                              sx={{
                                color: "#581845",
                              }}
                            />
                          </span>
                          <button className="">Inventory</button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link to={"./inventory"}>
                      <Tooltip title="Inventory" arrow placement="right">
                        <button className="p-2">
                          <InventoryIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </button>
                      </Tooltip>
                    </Link>
                  )}
                </li>
                {/* cutomer */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to={"./customer"}>
                      <div
                          className={`w-[12rem] flex flex-row  hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "customer"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <PortraitIcon
                              sx={{
                                color: "#581845",
                              }}
                            />
                          </span>
                          <button className="">Customer</button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link to={"./customer"}>
                      <Tooltip title="Customer" arrow placement="right">
                        <button className="p-2">
                          <PortraitIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </button>
                      </Tooltip>
                    </Link>
                  )}
                </li>
                {/* calendar */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to={"./calendar"}>
                        <div
                          className={`w-[12rem] flex flex-row hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "calendar"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845] "
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <CalendarMonthIcon
                              sx={{
                                color: "#581845",
                              }}
                            />
                          </span>
                          <button
                            className=""
                            // onClick={() => alert(" calendar clicked ")}
                          >
                            Calendar
                          </button>
                        </div>
                      </Link>
                    </>
                  ) : (
                   <Link  to={"./calendar"}>
                    <Tooltip title="Calendar" arrow placement="right">
                      <button className="p-2">
                        <CalendarMonthIcon
                          sx={{
                            color: "#581845",
                          }}
                        />
                      </button>
                    </Tooltip>
                   </Link>
                  )}
                </li>

                {/* Approval */}
                {/* <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to="./approval">
                        <div
                          className={`w-[12rem] flex flex-row hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "approval"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900  border-r-4 border-[#581845]"
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <ApprovalIcon
                              sx={{
                                color: "#581845",
                              }}
                            />
                          </span>
                          <button
                            className=""
                            // onClick={() => alert("Approval clicked ")}
                          >
                            Approval
                          </button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link to="./approval">
                      <Tooltip title="Approval " arrow placement="right">
                        <button className="p-2">
                          <ApprovalIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </button>
                      </Tooltip>
                    </Link>
                  )}
                </li> */}

              
              </ul>
            </div>
          </div>
        </div>

        {/* outlet  */}
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default OrderManagement;
