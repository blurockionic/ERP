import React, { useState } from "react";
import axios from "axios";
import config from "../config/config";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg"; // Adjust the path accordingly
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // handle on login
  const handleOnLogin = async (e) => {
    e.preventDefault();
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
        navigate("/dashboard");
      } else {
        setError(message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  p-6">
      {loader && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-75 z-50">
          <Loader />
        </div>
      )}
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Welcome back!
          </h2>
          <p className="mb-6 text-gray-600">
            Simplify your workflow and boost your productivity with{" "}
            <span className="font-semibold text-gray-800">
              Blurock Innovation
            </span>
            .
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleOnLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="button"
                className="absolute inset-y-0 top-8 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">or continue with</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                <FaGoogle className="w-6 h-6 text-gray-800" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                <FaApple className="w-6 h-6 text-gray-800" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                <FaFacebook className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p>
              Not a member?{" "}
              <Link
                to="/signup"
                className="text-sm text-gray-400 hover:text-gray-800"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center p-8">
          <div className="text-center">
            <img
              src={loginImg}
              alt="Illustration"
              className="w-60 h-60 mx-auto"
            />
            <h3 className="mt-6 text-xl font-bold text-gray-800">
              Make your work easier and organized with Blurock Innovation
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
