import React, { useState } from "react";
import newpng from "../assets/newpng.png";
import axios from "axios";
import config from "../config/config";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  // State for all the fields
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle on sign up
  const handleOnSignup = async () => {
    setLoader(true);

    // Validate password
    if (password !== confirmPassword) {
      alert("Password does not match.");
      setLoader(false);
      return;
    }

    // Request for sign up
    try {
      const response = await axios.post(
        `${config.apiUrl}/auth/signup`,
        { companyName, fullName, phoneNumber, email, employeeRange, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
        setCompanyName("");
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setEmployeeRange("");
        setPassword("");
        setConfirmPassword("");
        setLoader(false);
        alert(message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
      setLoader(false);
    }
  };

  return (
    <>
      {/* Set Loader */}
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex text-center justify-between items-center w-full px-8 py-6 shadow-sm absolute z-20 bg-white">
            <span className="text-xl font-semibold">Blurock Innovations</span>
            <ul className="flex gap-6 cursor-pointer">
              <li>
                <Link to="/login"> Login </Link>
              </li>
              <li>Need help: +91 9876543210</li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row justify-between h-screen -z-10 ">
            <div className="md:w-1/2 w-full h-screen flex flex-col justify-center items-center p-4 md:p-10 gap-4 mt-40 md:mt-0 mb-10 md:mb-0">
              {/* <img className="w-3/4" src={newpng} alt="img" /> */}
              <span className="text-lg md:text-xl font-semibold text-violet-800">
                Blurock Innovations
              </span>
              <span className="w-full text-center font-semibold text-4xl md:text-7xl uppercase bg-gradient-to-l from-blue-500 to-pink-500 bg-clip-text text-transparent">
                Get started with your free trial
              </span>

              <span className="md:text-3xl text-xl font-normal text-blue-500 uppercase">
                | "Sales teams from good to great"
              </span>
            </div>

            <div className="flex  w-full md:w-1/2  justify-center items-center p-10 md:p-0">
              <div className="flex flex-col p-4 md:p-6 rounded-md  w-full md:w-1/2 shadow-lg border gap-2 ">
                <div className="flex flex-col">
                  <label
                    className="font-semibold text-sm"
                    htmlFor="companyName"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    className="border mt-1 p-2 rounded-md"
                    placeholder="Enter Company Name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-sm" htmlFor="fullName">
                    Name
                  </label>
                  <input
                    id="fullName"
                    className="border mt-1 p-2 rounded-md"
                    placeholder="Full Name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-semibold text-sm"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    className="border mt-1 p-2 rounded-md"
                    placeholder="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="font-semibold text-sm" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      required
                      className="border mt-1 p-2 rounded-md w-full"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col relative">
                  <label
                    className="font-semibold text-sm"
                    htmlFor="employeeRange"
                  >
                    Employee Range
                  </label>
                  <div className="relative">
                    <input
                      id="employeeRange"
                      required
                      className="border mt-1 p-2 rounded-md w-full"
                      placeholder="Employee Range"
                      type="text"
                      value={employeeRange}
                      onChange={(e) => setEmployeeRange(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col relative mt-3">
                    <label className=" text-sm" htmlFor="terms">
                      <input
                        id="terms"
                        type="checkbox"
                        className="mr-2"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>

                <div className="flex justify-center ">
                  <button
                    className="text-sm py-2 px-3 text-white rounded-md bg-blue-500 text-center hover:bg-blue-700"
                    onClick={() => handleOnSignup()}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateAccount;
