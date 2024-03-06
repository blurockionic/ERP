import React from "react";

import CloseIcon from "@mui/icons-material/Close";

const CreateUserModel = ({ setShowUserModel }) => {
    const handleCloseUserModal = () => {
        setShowUserModel(false)
    }
  return (
    <>
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="fixed  h-full bg-white rounded-sm w-[28rem] p-2">
          <div className="flex justify-between  p-1  border-b-2">
            <h1>Create Lead</h1>
            <button
              className=" text-back font-bold rounded-sm"
              onClick={handleCloseUserModal}
            >
              <CloseIcon />{" "}
            </button>
 


            
          </div>

          <div> body </div>

          <div className="mb-2">
            <div>
                <button className=" border-2 rounded-full   py-1 px-3 ">
                  Cancel
                </button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserModel;
