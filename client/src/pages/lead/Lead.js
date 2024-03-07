import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { Tooltip } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import CreateLeadModule from "./CreateLeadModule";
import CreateUserModel from "./CreateUserModel";
import axios from "axios";
import config from "../../config/config";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CloseIcon from "@mui/icons-material/Close";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Lead = () => {
  const [showModel, setShowModel] = useState(false);

  const [showUserModel, setShowUserModel] = useState(false);
  const [allLeads, setAllLeads] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [moreOption, setMoreOption] = useState(false);

  //all lead
  useEffect(() => {
    const allLeads = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/lead/all`, {
          withCredentials: true,
        });

        const { success, allLeads } = response.data;
        console.log(allLeads);
        setAllLeads(allLeads);
        if (success) {
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //invoke
    allLeads();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    // If selectAll is true, add all row indices to selectedRows; otherwise, clear selectedRows
    setSelectedRows(
      selectAll
        ? []
        : Array(allLeads.length)
            .fill()
            .map((_, index) => index)
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

  console.log(allLeads);
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
                />
              </th>
              <th className=" border-r-2 ">Mobile Number</th>
              <th className="border-r-2">First Name </th>
              <th className="border-r-2">Last Name</th>
              <th className="border-r-2">Stage</th>
              <th className="border-r-2">Gender</th>
              <th></th>
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
                    onClick={() => setMoreOption(true)}
                  />
                </td>
                <td className="py-2  border-r-2 text-center font-bold">
                  {lead.mobileNumber}
                </td>
                <td className="py-2  border-r-2 text-center font-bold">
                  {lead.firstName}
                </td>
                <td className="py-2  border-r-2 text-center font-bold">
                  {lead.lastName}
                </td>
                <td className="py-2  border-r-2 text-center font-bold">
                  {lead.stage}
                </td>
                <td className="py-2  border-r-2 text-center font-bold">
                  {lead.gender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {moreOption && (
        <div className="flex mx-auto bg-black mb-0 text-white w-[28rem] font-thin  mt-[22rem] p-3 rounded ">
          <div className=" px-2 flex ">
            <span></span> selected{" "}
            <span className="pl-2 pr-2">
              <KeyboardArrowDownIcon />
            </span>{" "}
          </div>
          <div className=" px-2  flex ">
            <span className="pl-2 pr-2">
              <TrendingFlatIcon />
            </span>{" "}
            Assign
          </div>
          <div className=" px-2 flex ">
            <span className="pl-2 pr-2">
              <DriveFileRenameOutlineIcon />
            </span>{" "}
            Edit{" "}
          </div>

          <div className=" px-2 flex  ">
            <span className="pl-2 pr-2">
              <DeleteOutlineIcon />{" "}
            </span>{" "}
            Delete{" "}
          </div>
          <div className=" px-2 flex ">
            <span onClick={() => setMoreOption(false)}>
              <CloseIcon />
            </span>
          </div>
        </div>
      )}
      {/* <div>jai shree ram</div> */}

      {showModel && <CreateLeadModule setShowModel={setShowModel} />}

      {showUserModel && <CreateUserModel setShowUserModel={setShowUserModel} />}
    </div>
  );
};

export default Lead;
