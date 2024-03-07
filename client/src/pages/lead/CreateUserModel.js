import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

const CreateUserModel = ({ setShowUserModel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [gender, setGender] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [premission, setPremission] = useState("");
  const [email, setEmail] = useState("");

  const handleCloseUserModal = () => {
    setShowUserModel(false);
  };

  const handleUserCreatebtn = () => {
    alert("user Created SuccessFully");
  };
  return (
    <>
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="fixed  h-auto bg-white rounded-sm w-[28rem] p-2">
          <div className="flex justify-between  p-1  border-b-2">
            <h1>Create User</h1>
            <button
              className=" text-back font-bold rounded-sm"
              onClick={handleCloseUserModal}
            >
              <CloseIcon />{" "}
            </button>
          </div>
          <div className="p-8">
            <div className="flex flex-col border-b p-2 ">
              <label htmlFor="firstName"> First Name </label>
              <input
                className="outline-none w-full "
                type="Text"
                required
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-b p-2 ">
              <label htmlFor="lastName"> Last Name</label>
              <input
                className="outline-none w-full "
                type="Text"
                required
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-b p-2 ">
              <label htmlFor="mobileName"> Date of birth</label>
              <input
                className="outline-none w-full "
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-b p-1 ">
              <label htmlFor="email">Email</label>
              <input
                className="outline-none w-full "
                type="Text"
                placeholder="Enter email address "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-b p-1">
              <label htmlFor="gender">Gender</label>
              <select
                className="outline-none"
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option className="font-mono" value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col border-b p-1">
              <label htmlFor="slectPremission">Parmission</label>
              <select
                className="outline-none"
                name="selectpremission"
                id="selectpermission"
                value={premission}
                onChange={(e) => setPremission(e.target.value)}
              >
                <option className="font-mono" value="" selected disabled hidden>
                  select
                </option>
                <option value="Male">Lead Mananger </option>
                <option value="Female"> Cutomer Care Executive</option>
                <option value="Other">Other </option>
              </select>
            </div>

            {/* buttons  */}
            <div className="flex flex-row justify-between gap-8 mt-6 mr-5">
              <div className="mb-2">
                <div>
                  <button
                    className=" border-2 rounded-full   py-1 px-3 "
                    onClick={handleCloseUserModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleUserCreatebtn()}
                  className="border-2 rounded-full py-1 px-3 hover:bg-green-500 hover:font-semibold"
                >
                  Create
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserModel;
