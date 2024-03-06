import React, { useState } from "react";
// import "../components/LoginFormCss.css";
import axios from "axios";
import config from "../config/config";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";

const LoginForm = () => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle on login
  const handleOnLogin = async (e) => {
    e.preventDefault();

    console.log(email, password);
    setLoader(true);
    try {
      const response = await axios.post(
        `${config.apiUrl}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        alert(message);
        setEmail("");
        setPassword("");
        setLoader(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        {/* left side div */}
        <div className="xl:flex flex-row justify-between md:flex h-[100vh] gap-8">
          {" "}
          <div className="md:w-[30rem] md:h-[30rem] w-full h-full xl:flex flex-row xl:ml-auto xl:my-auto xl:w-[30rem] xl:h-[30rem]   sm:flex sm:shadow-lg rounded-sm ">
            <img
              src={loginImg}
              alt=""
              className="w-full h-full object-cover  shadow-lg"
            />
          </div>
          <div className="md:w-[30rem] md:h-[30rem] w-full h-full xl:flex flex-row xl:mr-auto xl:my-auto xl:w-[30rem] xl:h-[30rem] sm:flex sm:shadow-lg rounded-sm ">
            {loader ? (
              <Loader />
            ) : (
              <form
                action=""
                className="bg-white shadow-xl w-full h-full md:w-[30rem] md:h-[30rem] xl:w-[30rem] xl:h-[30rem] xl:my-auto xl:mx-auto p-8 sm:w-full sm:h-full  sm:my-auto sm:p-4 rounded-sm"
              >
                <p className=" text-3xl font-bold pt-12 flex justify-center xl:text-2xl xl:pt-6 xl:mb-6 xl:mt-0">
                  Login
                </p>
                <div className="flex  xl:flex justify-center xl:mt-4 xl:mb-6 sm:pt-12 sm:px-16">
                  <input
                    type="text"
                    className={`border-b-2  w-full outline-none text-xl xl:w-auto ${
                      email ? "border-[#00DFC0]" : "border-gray-500"
                    }`}
                    id=""
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex  xl:flex justify-center xl:mt-4 xl:mb-6   sm:pt-12 sm:px-16">
                  <input
                    type="password"
                    className={`border-b-2 p-2 w-full outline-none text-xl xl:w-auto  ${
                      password ? "border-[#00DFC0]" : "border-gray-500"
                    }`}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className=" flex flex-row  xl:flex justify-center xl:mt-6 ">
                  <button
                    className="bg-[#00DFC0] px-8 py-2 font-semibold text-xl rounded-sm text-white mt-20  xl:w-auto xl:mt-4 xl:mb-6"
                    onClick={(e) => handleOnLogin(e)}
                  >
                    Submit
                  </button>
                </div>

                <div className="flex flex-row  xl:flex justify-center xl:mt-2 xl:mb-6 p-2 font-semibold  ">
                  <a href="#" className="font-semibold  underline-none">
                    Forgot your password?
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
