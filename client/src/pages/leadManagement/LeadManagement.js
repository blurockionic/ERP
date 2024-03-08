import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApprovalIcon from "@mui/icons-material/Approval";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavBarforAllProjects from "../../components/NavBarforAllProjects";

const LeadManagement = () => {
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
              ? `w-[12rem] h-[41.1rem]  flex transition-all ease-in-out duration-200 border-2`
              : " w-auto h-[41.1rem] border-r-2 "
          }`}
        >
          {/* side menubar */}
          <div>
            <button className="p-1">
              <MenuIcon
                sx={{
                  fontSize: 35,
                  color: "#581845",
                  marginLeft: active ? ` 9rem` : "",
                  transition: "margin-left ease-in-out 0.2s",
                }}
                onClick={() => setActive(!active)}
              />
            </button>

            <div className="flex flex-col items-center w-full cursor-pointer border-t-2 ">
              <ul>
                {/* dashboard */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      {/* path === "home"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
 */}

                      <Link to={"./home"}>
                        <div
                          className={`w-[12rem] flex flex-row ml-0 hover:bg-slate-300 active:border-r-2 border-slate-800  ${
                            path === "home"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900  border-r-4 border-[#581845]"
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
                        <button className="p-1">
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
                {/* Lead */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to={"./lead"}>
                        <div
                          className={`w-[12rem] flex flex-row ml-0 hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "lead"
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
                          <button className="">Lead</button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link to="./lead">
                      <Tooltip title="Lead" arrow placement="right">
                        <button className="p-1">
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

                {/* Tasks  */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to={"./task"}>
                        <div
                          className={`w-[12rem] flex flex-row ml-0 hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "task"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845] "
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <AddTaskIcon
                              sx={{
                                color: "#581845",
                              }}
                            />
                          </span>
                          <button className="">Task</button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link to={"./task"}>
                      <Tooltip title="Task" arrow placement="right">
                        <button className="p-1">
                          <AddTaskIcon
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
                          className={`w-[12rem] flex flex-row ml-0 hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
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
                    <Tooltip title="Calendar" arrow placement="right">
                      <button className="p-1">
                        <CalendarMonthIcon
                          sx={{
                            color: "#581845",
                          }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </li>

                {/* Approval */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to="./approval">
                        <div
                          className={`w-[12rem] flex flex-row ml-0 hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
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
                        <button className="p-1">
                          <ApprovalIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </button>
                      </Tooltip>
                    </Link>
                  )}
                </li>

                {/* Customers */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <Link to="./customer">
                        <div
                          className={`w-[12rem] flex flex-row ml-0 hover:bg-indigo-100 active:border-r-2 border-slate-800  ${
                            path === "customer"
                              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 border-r-4 border-[#581845] "
                              : "hover:bg-indigo-50 text-gray-600"
                          }`}
                        >
                          <span className="p-2 ">
                            <AccountBoxIcon
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
                    <Link to="./customer">
                      <Tooltip title="Customer" arrow placement="right">
                        <button className="p-1">
                          <AccountBoxIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </button>
                      </Tooltip>
                    </Link>
                  )}
                </li>
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

export default LeadManagement;
