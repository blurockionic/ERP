import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login-bg.jpg";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
import { TbLoader } from "react-icons/tb";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import config from "../config/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HelpCircle } from "lucide-react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // handle on login
  const handleOnLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      dispatch(signInStart());

      const response = await axios.post(`${config.apiUrl}/auth/login`, {
        email,
        password,
      });

      const { success, message, user } = response.data;
      if (success) {
        toast.success(message);
        dispatch(signInSuccess(user));
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      dispatch(signInFailure());
    } finally {
      setEmail("");
      setPassword("");
      setLoader(false);
    }
  };

  return (
    <>
      <Toaster />
      <div
        style={{
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="flex text-center justify-between items-center w-full px-8 py-6  absolute z-20 bg-trasparent">
          <Link to={"/"}>
            <span className="text-xl font-semibold cursor-pointer">
              Order Management System
            </span>
          </Link>
          <ul className="flex gap-6 cursor-pointer">
            {/* <li>
              <Link to={"/signup"}>Sign up</Link>
            </li> */}
            <li className="flex gap-4"><HelpCircle/> Need help: +91 9876543210</li>
          </ul>
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-row justify-center items-center w-full h-[100vh] ">
            <form className="bg-white border w-[350px]  rounded-md px-8  shadow-md">
              <p className=" text-3xl font-bold  flex justify-center xl:text-2xl xl:pt-6 xl:mb-6 xl:mt-0">
                Continue with OMS
              </p>
              <div className="flex flex-col gap-2 my-4">
                <label className="font-semibold text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="border mt-1 p-2 rounded-md"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col relative">
                <label className="font-semibold text-sm" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="border mt-1 p-2 rounded-md"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-9 cursor-pointer "
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className=" flex flex-row  xl:flex justify-center xl:mt-6 ">
                <button
                  disabled={loader ? true : false}
                  className=" flex items-center bg-blue-500 hover:bg-blue-700 px-8 py-2  text-lg rounded-md text-white mt-20  xl:w-auto xl:mt-4 xl:mb-6"
                  onClick={(e) => handleOnLogin(e)}
                >
                  {loader && <TbLoader className="mx-2 animate-spin" />}
                  Submit
                </button>
              </div>

              <div className="flex justify-end mb-5">
                <Link to={"/forgot-password"}>
                  <span className="cursor-pointer text-[12px]">
                    Forgot your password?
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LoginForm;
