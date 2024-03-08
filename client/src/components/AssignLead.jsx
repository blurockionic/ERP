import React, { useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";

const AssignLead = ({ setAssignModel }) => {
  const handleCloseModal = () => {
    setAssignModel(false);
  };
  return (
    <>
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className=" bg-white rounded-sm w-[31rem] p-5">
          <div className="flex justify-between  p-1  border-b-2">
            <h1>Assign Lead</h1>
            <button
              className=" text-back font-bold rounded-sm"
              onClick={handleCloseModal}
            >
              <CloseIcon />{" "}
            </button>
          </div>
          {/* data fields  */}
          <div className="flex flex-col w-full ">
            <div className="mt-4 ">Assign to the owner</div>

            <div className="flex flex-row w-full mt-2">
              <input
                className="flex w-full outline-none border-b-2"
                type="search"
                placeholder="Search or select an option"
              />
            </div>

            {/* buttons  */}
            <div className="flex flex-row justify-end gap-8 mt-4 mr-5">
              <div>
                <button
                  className="border-2 rounded-full py-1 px-3"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button className="border-2 rounded-full py-1 px-3 hover:bg-green-500 hover:font-semibold">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Additional content of your modal */}
        </div>
      </div>
    </>
  );
};

export default AssignLead;
