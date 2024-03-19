import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LightOrder = ({ setShowModel }) => {
  //usestate for bistar order
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const [fieldCounts, setFieldCounts] = useState({});

  const handleChange = (field, value) => {
    if (field === "ladiWhiteCount" && value < 0) {
      // If count is negative, set it to 0
      value = 0;
    }
    setFieldCounts({ ...fieldCounts, [field]: value });
  };

  const showCountInput = (select) => {
    const countInput = select.parentElement.querySelector(
      'input[type="number"]'
    );
    if (countInput) {
      // Check if countInput is not null
      if (select.value !== "") {
        countInput.style.display = "block";
      } else {
        countInput.style.display = "none";
      }
    } else {
      console.error("Count input element not found.");
    }
  };

  return (
    <>
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm ">
        <div className="bg-white rounded-sm w-[50%] h-[90%] p-2 overflow-y-scroll ">
          <div className="  border-b-2 flex w-full  justify-between p-2 rounded font-bold text-xl text-black">
            <div className=" ">
              <Tooltip title="Back" placement="bottom" arrow>
                <button className=" text-back font-bold rounded-sm">
                  <ArrowBackIcon />
                </button>
              </Tooltip>
            </div>
            <span> Manage Lights Order </span>
            {/* close button */}
            <div className=" ">
              <Tooltip title="cancel" placement="bottom" arrow>
                <button
                  className=" text-back font-bold rounded-sm"
                  onClick={() => setShowModel(false)}
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          {/* contect Details  */}
          <h2 className="font-bold mt-3 bg-slate-200 ">Add Details</h2>
          <div className="grid grid-cols-2 gap-4 p-4">
            {/* Mobile number  and Alternate mobile number */}
            <div className="mt-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
                <sup>*</sup>
              </label>
              <input
                type="tel"
                required={true}
                id="phoneNumber"
                name="phoneNumber"
                //   value={phoneNumber}
                //   onChange={handleChangePhoneNumber}
                placeholder="Enter mobile number"
                className="w-full px-4 py-2 border rounded-md mb-4"
              />

              <label
                htmlFor="alternateNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Alternate Number
              </label>
              <input
                type="tel"
                id="alternateNumber"
                name="alternateNumber"
                //   value={alternateNumber}
                //   onChange={handleChangeAlternateNumber}
                placeholder="Enter alternate number (optional)"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              {/*Customer  name*/}
              <div className="relative mt-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Customer Name{" "}
                </label>
                <input
                  type="text"
                  name="customer Name"
                  placeholder="Enter name"
                  className="w-full px-4 py-2 pl-4 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Date and time  */}
              <div className="mt-4 ">
                <label
                  htmlFor="dateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date and Time
                </label>
                <dateAndTime
                  inputProps={{
                    id: "dateTime",
                    className: "w-full px-4 py-2 border rounded-md",
                  }}
                  // value={dateAndTime}
                  // onChange={handleDateTimeChange}
                />
              </div>
            </div>
            {/* other Details  */}
            <div className="relative ">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Other Details{" "}
              </label>
              <input
                type="text"
                placeholder="other details....."
                className="w-full px-4 py-2 pl-4 border rounded-md"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
            </div>
            {/* Enter Address */}
            <div className="relative">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor=""
              >
                Enter address{" "}
              </label>
              <input
                type="text"
                name="Address"
                placeholder="Enter your address..."
                className="w-full px-4 py-2 pl-4 border rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <h2>Items Information</h2>

          <div>Type of Ladi</div>
      
        </div>
      </div>
    </>
  );
};

export default LightOrder;
