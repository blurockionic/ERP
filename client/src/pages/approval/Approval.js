import React from "react";
import ComingSoon from "../../components/ComingSoon";

import SearchBar from "../../components/SearchBar";
import { Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";

const Approval = () => {
  return (
    <>
      {/* <ComingSoon/> */}

      <div className=" w-full">
        <nav className="bg-white flex flex-row justify-between border-b-2">
          {/* company Details  */}
          <div className="flex items-center">
            {" "}
            <div className=" w-[3rem] h-[3rem] border-2 solid border-black bg-white ml-5  rounded-full">
              {" "}
            </div>
            <div> company Name</div>
          </div>

          <div className=" flex flex-row items-center gap-4 mr-5 h-[2.7rem]">
            <div className=" bg-white  border-2 text-center  rounded-full w-[5rem] p-1  ">
              <button>Action</button>
            </div>{" "}
            <div className=" bg-white border-2 text-center rounded-full w-[5rem] p-1  ">
              <button> Export </button>
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
          <table className="w-full text-center  min-h-[32rem]">
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
                    // checked={selectAll}
                    // onChange={handleSelectAll}
                  />
                </th>
                <th className=" border-r-2  font-medium ">Approval ID</th>
                <th className="border-r-2  font-medium">Mobile number</th>
                <th className="border-r-2  font-medium">Lead ID</th>
                <th className="border-r-2  font-medium">Status</th>

                <th className="border-r-2  font-medium">Approved Date </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> </td>
                <td> </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div>jai shree ram</div> */}
      </div>
    </>
  );
};

export default Approval;
