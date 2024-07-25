import React, { useState } from "react";
import axios from "axios";
import config from "../../../config/config";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import loginImg from "../../../assets/login-bg.jpg";
import Footer from "../../../components/Footer";
import { HelpCircle } from "lucide-react";
import { TbLoader } from "react-icons/tb";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await axios.post(
        `${config.apiUrl}/auth/forgot-password`,
        { email }
      );
      toast.success(response.data);
      setMessage(response.data);
      // Delay to allow the user to see the success message
      setTimeout(() => {
        window.close();
      }, 2000); 
    } catch (error) {
      setMessage("Error: " + error.response.data);
      toast.error("Error: " + error.response.data);
    } finally {
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
        <div className="flex text-center justify-between items-center w-full px-8 py-6 absolute z-20 bg-transparent">
          <Link to={"/"}>
            <span className="text-xl font-semibold cursor-pointer">
              Order Management System
            </span>
          </Link>
          <ul className="flex gap-6 cursor-pointer">
            <li className="flex gap-4">
              <HelpCircle />
              Need help: +91 9876543210
            </li>
          </ul>
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-row justify-center items-center w-full h-[100vh] ">
            <form className="bg-white border w-[350px] rounded-md px-8 shadow-md">
              <p className="text-3xl font-bold flex justify-center xl:text-2xl xl:pt-6 xl:mb-6 xl:mt-0">
                Forgot Password
              </p>
              <div className="flex flex-col gap-2 my-4">
                <label className="font-semibold text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="border mt-1 p-2 rounded-md"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row xl:flex justify-center xl:mt-6">
                <button
                  disabled={loader ? true : false}
                  className="flex items-center bg-blue-500 hover:bg-blue-700 px-8 py-2 text-lg rounded-md text-white xl:w-auto xl:mt-4 xl:mb-6"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  {loader && <TbLoader className="mx-2 animate-spin" />}
                  Reset Password
                </button>
              </div>
              {message && (
                <p className="text-center text-red-500 mt-4">{message}</p>
              )}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
