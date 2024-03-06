import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApprovalIcon from "@mui/icons-material/Approval";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Dashboard from "../dashaboard/Dashboard";
import Lead from "../lead/Lead";
import Tasks from "../task/Tasks";
import EventCalendar from "../calendar/EventCalendar";

const LeadManagement = () => {
  const [active, setActive] = useState(true);
  const [activePage, setActivePage] = useState("Lead");

  const leadTabHandler = () => {
    setActivePage("Lead")
    
  }

  const taskTabHandler = () => {
    setActivePage("Task");
  }
  return (
    <>
      <div className="flex flex-row  ">
        <div
          className={`${
            active
              ? `   w-[12rem] h-[41.1rem]  flex transition-all ease-in-out duration-200 border-r-2  `
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
                      <div className="w-[12rem] flex flex-row ml-0 hover:bg-slate-300 active:border-r-2 border-slate-800 ">
                        <span className="p-2 ">
                          <DashboardIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </span>
                        <button
                          className=""
                          onClick={() => setActivePage("MainDashboard")}
                        >
                          Dashboard
                        </button>
                      </div>
                    </>
                  ) : (
                    <Tooltip title="Dashboard " arrow placement="right">
                      <button className="p-1" >
                        <DashboardIcon
                          sx={{
                            color: "#581845",
                          }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </li>
                {/* Lead */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <div className="w-[12rem] flex flex-row ml-0 hover:bg-slate-300 active:border-r-2 border-slate-800 ">
                        <span className="p-2 ">
                          <ContactPhoneIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </span>
                        <button
                          className=""
                          onClick={() =>leadTabHandler()}
                        >
                          Lead
                        </button>
                      </div>
                    </>
                  ) : (
                    <Tooltip title="Lead" arrow placement="right">
                      <button className="p-1">
                        <ContactPhoneIcon
                          sx={{
                            color: "#581845",
                          }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </li>

                {/* Tasks  */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <div className="w-[12rem] flex flex-row ml-0 hover:bg-slate-300 active:border-r-2 border-slate-800 ">
                        <span className="p-2 ">
                          <AddTaskIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </span>
                        <button
                          className=""
                          onClick={() =>taskTabHandler()}
                        >
                          Task
                        </button>
                      </div>
                    </>
                  ) : (
                    <Tooltip title="Task" arrow placement="right">
                      <button className="p-1">
                        <AddTaskIcon
                          sx={{
                            color: "#581845",
                          }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </li>
                {/* calendar */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <div className="w-[12rem] flex flex-row ml-0 hover:bg-slate-300 active:border-r-2 border-slate-800 ">
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
                      <div className="w-[12rem] flex flex-row ml-0 hover:bg-slate-300 active:border-r-2 border-slate-800 ">
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
                    </>
                  ) : (
                    <Tooltip title="Approval " arrow placement="right">
                      <button className="p-1">
                        <ApprovalIcon
                          sx={{
                            color: "#581845",
                          }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </li>

                {/* Customers */}
                <li className=" flex flex-row justify-between text-lg">
                  {" "}
                  {active ? (
                    <>
                      <div className="w-[12rem] flex flex-row ml-0 hover:bg-slate-300 active:border-r-2 border-slate-800 ">
                        <span className="p-2 ">
                          <AccountBoxIcon
                            sx={{
                              color: "#581845",
                            }}
                          />
                        </span>
                        <button
                          className=""
                          // onClick={() => alert("Customer clicked ")}
                        >
                          Customer
                        </button>
                      </div>
                    </>
                  ) : (
                    <Tooltip title="Customer" arrow placement="right">
                      <button className="p-1">
                        <AccountBoxIcon
                          sx={{
                            color: "#581845",
                          }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* right side div */}

        {activePage === "MainDashboard" && (
          <div className="border-b-2 flex flex-row justify-between w-full">
            <Dashboard />
          </div>
        )}

        {activePage === "Lead" && (
          <div className="border-b-2 flex flex-row justify-between w-full">
            <Lead/>
          
          </div>
        ) }


        {
          activePage === "Task" && (
            <div className="border-b-2 flex flex-row justify-between w-full">
           <Tasks/>
          
          </div>
          )
        }


{
          activePage === "Calendar" && (
            <div className="border-b-2 flex flex-row justify-between w-full">
          <EventCalendar/>
          
          </div>
          )
        }
      </div>
    </>
  );
};

export default LeadManagement;
