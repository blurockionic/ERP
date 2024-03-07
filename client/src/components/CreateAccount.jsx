import React, { useState } from "react";
// import SignINImg from "../assets/verified/signIn.jpg";
import newpng from "../assets/newpng.png";
import axios from "axios";
import config from "../config/config";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  //usestate for all the field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handle on sign up
  const handleOnSignup = async () => {
    // console.log(firstName, lastName, email, password, confirmPassword);
    setLoader(true);
    //validate password
    if (password !== confirmPassword) {
      alert("Passrod not matched.");
    }

    //rest for sign up
    try {
      const response = await axios.post(
        `${config.apiUrl}/auth/signup`,
        { firstName, lastName, password, email },
        {
          Headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
        setFirstName("");
        setLastName("");
        setConfirmPassword("");
        setEmail("");
        setPassword("");
        setLoader(false);
        alert(message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {/* set LODER  */}
      {loader ? <Loader/> :(
      <div className="flex flex-row justify-center py-8  ">
        <div className="w-[38rem] mt-[8rem]">
          <img className=" w-3/4 " src={newpng} alt=" img" />
        </div>

        <div className="flex flex-col w-[30rem]  shadow-2xl mt-4 rounded-md">
          <h1 className="p-2 font-semibold text-3xl text-center border-b  border-black">
            Create Account
          </h1>
          <div className="flex flex-col p-4 ">
            <div className=" flex flex-col">
              <label className="font-bold p-1" htmlFor="firstName">
                First Name
              </label>
              <input
                className=" border mt-1 p-2 rounded-md "
                placeholder="Enter Firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className=" flex flex-col">
              <label className="font-bold p-1" htmlFor="firstName">
                Last Name
              </label>
              <input
                className=" border mt-1 p-2 rounded-md "
                placeholder="Enter Lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className=" flex flex-col">
              <label className="font-bold p-1" htmlFor="firstName">
                Email
              </label>
              <input
                className=" border mt-1 p-2 rounded-md "
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col relative">
              <label className="font-bold p-1" htmlFor="confirmPassword">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  className="border mt-1 p-2 rounded-md w-full"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </div>
            </div>

            <div className="flex flex-col relative">
              <label className="font-bold p-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  required
                  className="border mt-1 p-2 rounded-md w-full"
                  placeholder="Confirm password"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </div>
            </div>
          </div>
          <div className=" flex justify-center p-4">
            <button
              className=" text-xl py-2 px-8 text-white rounded-sm bg-[#0DABD8] text-center hover:bg-blue-500"
              onClick={() => handleOnSignup()}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>)} 

    
    </>
  );
};

export default CreateAccount;
