import React, { useEffect, useState } from "react";

import { Tooltip } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import CreateLeadModule from "./CreateLeadModule";
import CreateUserModel from "./CreateUserModel";
import axios from "axios";


import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AssignLead from "../../../components/AssignLead";
import MoreOptionModel from "../../../components/MoreOptionModel";
import config from "../../../config/config";
import SearchBar from "../../../components/SearchBar";


const Order = () => {
  const [showModel, setShowModel] = useState(false);

  const [showUserModel, setShowUserModel] = useState(false);
  const [allLeads, setAllLeads] = useState([]);

  const [isLoadLead, setIsLoadLead] = useState(false);
  const [updateLead, setUpdateLead] = useState({});

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [moreOption, setMoreOption] = useState(false);
  const [assignModel, setAssignModel] = useState(false);

  //all lead
  useEffect(() => {
    const allLeads = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/lead/all`, {
          withCredentials: true,
        });

        const { allLeads } = response.data;
        setIsLoadLead(false);
        setAllLeads(allLeads);
      } catch (error) {
        console.log(error.response);
      }
    };

    //invoke
    allLeads();
  }, [isLoadLead]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll
        ? []
        : Array.from({ length: allLeads.length }, (_, index) => index)
    );
  };
  // Function to handle individual row selection
  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        return prevSelectedRows.filter((row) => row !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
  };
  const selectedRowCount = selectedRows.length;

  // cancel btn handler
  const handleClearSelection = () => {
    setSelectedRows([]);
    setMoreOption(false);
    // Additional logic if needed
  };

  //handle on edit
  const handleOnEdit = async (lead) => {
    setShowModel(true);
    setUpdateLead(lead);
    localStorage.setItem("updateLead", true);
  };

  // handle on delete
  const handleOnDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.apiUrl}/lead/${id}`, {
        withCredentials: true,
      });

      const { success, message } = response.data;
      if (success) {
        alert(message);
        setIsLoadLead(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //is updated
  const handleOnIsLeadUpdated = (isUpdatedLead) => {
    setIsLoadLead(isUpdatedLead);
  };

  // console.log(allLeads);
  const createUserHandler = () => {
    setShowUserModel(true);
  };

  const CreateLeadHandler = () => {
    setShowModel(true);
  };

  //handle for handleOnExport
  const handleOnExport = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/export/exportToExcel`,
        {
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
        alert(message);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className=" w-full ">
      <nav className="bg-white flex flex-row justify-between border-b-2">
        {/* company Details  */}
        <div className="flex items-center">
          {" "}
          {/* <div className=" w-[3rem] h-[3rem] border-2 solid border-black bg-white ml-5  rounded-full">
            {" "}
          </div> */}
          <div> company Name</div>
        </div>

        <div className=" flex flex-row items-center gap-4 mr-5 h-[2.7rem]">
          <div className=" bg-[#5545] text-center  rounded-full w-[5rem] p-1  ">
            <button onClick={() => handleOnExport()}>Export </button>
          </div>{" "}
          <div className=" bg-[#5545] text-center rounded-full w-[5rem] p-1  ">
            <button> import </button>
          </div>{" "}
          <div className=" bg-[#f3641855] text-center rounded-full font-semibold hover:bg-red-500 w-[7rem] p-1 ">
            <button onClick={() => CreateLeadHandler()}>Create Lead </button>
          </div>{" "}
        </div>
      </nav>

      <div className="bg-white flex flex-row justify-between border-b-2">
        {/* search button tab div */}
        <div className="">
          <SearchBar />
        </div>
        {/* user detail tab  */}
        <div className=" flex flex-row items-center gap-4 mr-5">
          {/* user menu div  */}
          <div>
            {/* user module button  button */}
            <Tooltip title="User" placement="bottom" arrow>
              <PermIdentityIcon className="rounded-full border border-black " />
            </Tooltip>
            <button onClick={() => createUserHandler()}>
              <AddIcon className="-ml-2 text-white bg-black rounded-full" />
            </button>
          </div>

          {/* <div> grid view </div> */}
          <div>
            {/* three dot button */}
            <Tooltip title="Edit Column " placement="bottom" arrow>
              <MoreVertIcon />
            </Tooltip>
          </div>

          <div>
            <TuneIcon />
          </div>
        </div>
      </div>

      {/* table div*/}
      <div className=" mt-2 border-2 table-container ">
        <table className="w-full text-center">
          <thead className=" border-b-2">
            <tr>
              <th className="border-r-2 p-2 ">
                <input
                  style={{
                    marginLeft: "4px",
                    paddingTop: "2px",
                    width: "16px", // Set the width
                    height: "16px", // Set the height
                    border: "2px solid #4F46E5",
                  }}
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  onClick={() => setMoreOption(true)}
                />
              </th>
              <th className=" border-r-2 ">Order Id</th>
              <th className=" border-r-2 ">Mobile Number</th>
              <th className="border-r-2">Name </th>
              <th className="border-r-2">Address</th>
              <th className="border-r-2">Date </th>
              <th className="border-r-2">Time</th>
              <th className="border-r-2">Type of Order</th>

              <th className="border-r-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allLeads.map((lead, index) => (
              <tr className="border-b" key={index}>
                <td className="py-2  border-r-2 text-center font-bold">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowSelect(index)}
                    // Consider whether you really want to set MoreOption to true on every click
                    onClick={() => setMoreOption(true)}
                  />
                </td>
                <td className="py-2   text-center  ">{"LD-" + (index + 1)}</td>
                <td className="py-2   text-center ">
                  {" "}
                 
                  {lead.mobileNumber === "" ? "-" : lead.mobileNumber}
                </td>
                <td className="py-2  text-center ">
                  {lead.firstName === "" ? "-" : lead.firstName}
                </td>
                <td className="py-2   text-center ">
                  {lead.lastName === "" ? "-" : lead.lastName}
                </td>
                <td className="py-2   text-center ">
                  {lead.stage === "" ? "-" : lead.stage}
                </td>
                <td className="py-2   text-center ">
                  {lead.gender === "" ? "-" : lead.gender}
                </td>
                <td>
                  
                </td>
                <td className="py-2   text-center flex justify-evenly">
                  <span onClick={() => handleOnEdit(lead)}>
                    <EditIcon />
                  </span>{" "}
                  <span onClick={() => handleOnDelete(lead._id)}>
                    <DeleteIcon />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {moreOption && (
        <MoreOptionModel
          setAssignModel={setAssignModel}
          handleClearSelection={handleClearSelection}
          selectedRowCount={selectedRowCount}
        />
      )}
      {/* <div>jai shree ram</div> */}
      {assignModel && <AssignLead setAssignModel={setAssignModel} />}

      {showModel && (
        <CreateLeadModule
          setShowModel={setShowModel}
          updateLead={updateLead}
          handleOnIsLeadUpdated={handleOnIsLeadUpdated}
        />
      )}

      {showUserModel && <CreateUserModel setShowUserModel={setShowUserModel} />}
    </div>
  );
};

export default Order;
