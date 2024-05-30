import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import Select from "react-select";
import axios from "axios";
import config from "../../../config/config";
// import { colourOptions } from "../data";

const CreateLeadModule = ({ setShowModel,
  updateLead,
  handleOnIsLeadUpdated, }) => {
  //usestate  for input field

  const [mobileNumber, setMobileNumber] = useState("")
  const [stage, setStage] = useState("")
  const [source, setSource] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")

  //get item fro local storage
  const isSelectLead = localStorage.getItem("updateLead");

  useEffect(() => {
    if (isSelectLead) {
      setMobileNumber(updateLead.mobileNumber);
      setStage(updateLead.stage);
      setSource(updateLead.source);
      setFirstName(updateLead.firstName);
      setLastName(updateLead.lastName);
      setDateOfBirth(updateLead.dateOfBirth);
      setEmail(updateLead.email);
      setGender(updateLead.gender);
    }
  }, [updateLead.mobileNumber, updateLead.stage, updateLead.source, updateLead.firstName, updateLead.lastName, updateLead.dateOfBirth, updateLead.email, updateLead.gender, isSelectLead]);




  const handleCloseModal = () => {
    setShowModel(false);
  };

  //handle on create lead
  const handleLeadCreatebtn = async() => {
    setShowModel(false);

    try {
       const response = await axios.post(`${config.apiUrl}/lead/new`, {mobileNumber, stage, source, firstName, lastName, dateOfBirth, email, gender}, {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
       })

       const {success, message} = response.data
       if(success){
        alert(message)
        handleOnIsLeadUpdated(true)
       }

    } catch (error) {
      console.log(error.response.data.message)
    }
  };

  //   custom css for select tag
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "lightblue" : "white",
      color: state.isFocused ? "black" : "inherit",
      border: "none",
      boxShadow: "none",
    }),
  };


  const options = [
    { value: "Fresh Call ", label: "Fresh Call" },
    { value: "Missed Call", label: "Missed Call" },
    { value: "Remainder", label: "Remainder" },
    { value: "Closed Won ", label: "Closed Won" },
    { value: "Closed lost ", label: "Closed lost" },
  ];


  const sourceOptions = [
    // { value: "", label: ""},
    { value: "FaceBook", label: "Facebook" },
    { value: "YouTube", label: "YouTube" },
    { value: "Whatsapp", label: "Whatsapp" },
    { value: "Phone", label: "Phone" },
    { value: "Email", label: "Email" },
    { value: "Other", label: "Other" },
  ];

  //handle on source 
  const handleOnSource =(source)=>{
      setSource(source.value)
  }

  //handle on stage
  const handleOnStage = (stage)=>{
    setStage(stage.value)
  }

  // handle on update
  const handleOnUpdate = async (id) => {
    const updateFields = {
      mobileNumber,
      firstName,
      lastName,
      stage,
      source,
      gender,
      dateOfBirth,
      email,
    };
    try {
      const response = await axios.put(
        `${config.apiUrl}/lead/${id}`,
        { updateFields },
        {
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
        alert(message);
        setMobileNumber("");
        setStage("");
        setSource("");
        setFirstName("");
        setLastName("");
        setDateOfBirth("");
        setEmail("");
        setGender("");
        setShowModel(false);
        handleOnIsLeadUpdated(true);
        //remove item from local storag
        localStorage.removeItem("updateLead");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="fixed right-0 top-0 h-full bg-white rounded-sm w-[28rem] p-2">
          <div className="flex justify-between  p-1  border-b-2">
            <h1>Create Lead</h1>
            <button
              className=" text-back font-bold rounded-sm"
              onClick={handleCloseModal}
            >
              <CloseIcon />{" "}
            </button>
          </div>
          {/* data fields  */}
          <div>
            <div className="flex flex-col border-b p-2 ">
              <label htmlFor="mobileNumber">
                {" "}
                Mobile Number <sup>*</sup>
              </label>
              <input
              required
                className="outline-none w-full "
                type="Text"
                placeholder="enter the mobile number"
                value={mobileNumber}
                onChange={(e)=>setMobileNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col border-b p-1 ">
              <label htmlFor="stage"> Stage </label>

              <Select
                className="outline-none border-none"
                // value={stage}
                onChange={handleOnStage}
                options={options}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null, // Remove the indicator separator
                  //  DropdownIndicator: () => null, // Remove the dropdown indicator
                }}
              />
            </div>
            {/* <div className="flex flex-col border-b p-1 ">
              <label htmlFor="owner"> Owner </label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                // defaultValue={[colourOptions[4], colourOptions[5]]}
                // isMulti
                // options={colourOptions}
              />
            </div> */}
            <div className="flex flex-col border-b p-1 ">
              <label htmlFor="source"> Source </label>
              <Select
                className="outline-none border-none"
                // value={source}
                onChange={handleOnSource}
                options={sourceOptions}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null, // Remove the indicator separator
                  //  DropdownIndicator: () => null, // Remove the dropdown indicator
                }}
              />
            </div>
            <div className="flex flex-col border-b p-2 ">
              <label htmlFor="firstName"> First Name </label>
              <input
                className="outline-none w-full "
                type="Text"
                required
                placeholder="Enter first name"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
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
                onChange={(e)=>setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-b p-2 ">
              <label htmlFor="mobileName"> Date of birth</label>
              <input
                className="outline-none w-full "
                type="date"
                value={dateOfBirth}
                onChange={(e)=>setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-b p-1 ">
              <label htmlFor="email">Email</label>
              <input
                className="outline-none w-full "
                type="Text"
                placeholder="Enter email address "
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col border-b p-1">
              <label htmlFor="gender">Gender</label>
              <select className="outline-none" name="gender" id="gender" value={gender}
                onChange={(e)=>setGender(e.target.value)}>
                <option className="font-mono" value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* buttons  */}
            <div className="flex flex-row justify-end gap-8 mt-4 mr-5">
              <div>
                <button className="border-2 rounded-full py-1 px-3">
                  Cancel
                </button>
              </div>
              <div>
              {isSelectLead ? (
                  <button
                    onClick={() => handleOnUpdate(updateLead._id)}
                    className="border-2 rounded-full py-1 px-3 hover:bg-green-500 hover:font-semibold"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleLeadCreatebtn()}
                    className="border-2 rounded-full py-1 px-3 hover:bg-green-500 hover:font-semibold"
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Additional content of your modal */}
        </div>
      </div>
    </>
  );
};

export default CreateLeadModule;
