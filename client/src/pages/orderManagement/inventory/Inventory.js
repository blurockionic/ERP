import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Inventory = () => {
  const active = true;
  const [addItemActive, setAddItemActive] = useState(false);
  const [tentActive, setTentActive] = useState(false);
  const tabButtonhandler = (value) => {
    console.log(value);
    setTentActive(value === "tent");
  };
  return (
    <div>
      <div className="bg-slate-50 p-5">
        {/* heading items */}
        <div className="flex flex-row justify-between  bg-transparent p-1">
          <div className="flex bg-slate-200 rounded ">
            <span
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                tentActive ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => tabButtonhandler("tent")}
            >
              Tent
            </span>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              {" "}
              Decoration
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              {" "}
              Catering
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              {" "}
              Beding
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              light
            </div>
          </div>
          <div className="flex bg-slate-200 rounded ">
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              Filter{" "}
            </div>
            <div
              className={`px-3 py-1.5 m-1 rounded-md font-semibold ${
                active ? "bg-white" : "bg-transparent"
              }`}
              onClick={tabButtonhandler}
            >
              Export
            </div>
          </div>
        </div>
        {tentActive && (
          <div className="mt-4 p-4 bg-white border-2 rounded-xl">
            <div className="flex justify-between">
              {/* table Heading */}
              <div className="pl-4">
                <span className="text-3xl font-semibold ">Orders</span>
                <p>Recent orders from your store</p>
              </div>
              <div>
                <Tooltip title="Add new item " placement="bottom" arrow>
                  <button
                    onClick={() => setAddItemActive(!addItemActive)}
                    className="rounded  py-2 px-6 text-center align-middle text-xs font-bold bg-white border  shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    ITEM
                  </button>
                </Tooltip>
              </div>
            </div>
            {/* table  */}
            <div className="">
              {addItemActive && (
                <div className=" bg-white border p-3 rounded-md mt-4">
                  <tr className="flex flex-row justify-evenly text-center">
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor=""> Item Name</label>
                      <input type="text" className="border border-gray-500 rounded" />
                    </td>
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">Category Type</label>
                      <input type="text" className="border border-gray-500 rounded" />

                    </td>
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">Quantity</label>
                      <input type="text" className="border border-gray-500 rounded" />

                    </td>
                    <td className="flex flex-col text-left">
                      <label className="mb-1" htmlFor="">Size</label>
                      <input type="text" className="border border-gray-500 rounded" />

                    </td>
                    <td className="flex flex-col text-left mt-5 ">
                      {" "}
                      <button className="rounded  py-2 px-6 text-center align-middle text-xs font-bold bg-white border  shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Add
                      </button>
                    </td>
                  </tr>
                </div>
              )}
              <div className=" bg-white border p-3 rounded-md table-container h-screen mt-4">
                <table className="w-full">
                  <thead className="bg-white border rounded-md mt-8 ">
                    <tr className="flex flex-row justify-evenly text-left">
                      <th className="font-medium align-middle text-slate-600 w-[12rem]">
                        {" "}
                        Items Name{" "}
                      </th>
                      <th className="font-medium align-middle text-slate-600 w-[12rem]">
                        {" "}
                        Category Type{" "}
                      </th>
                      <th className="font-medium align-middle text-slate-600 w-[12rem]">
                        {" "}
                        Quantity{" "}
                      </th>
                      <th className="font-medium align-middle text-slate-600 w-[12rem]">
                        Size
                      </th>
                      <th className="font-medium align-middle text-slate-600">
                        {" "}
                        Action{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className=""></tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
