import React, { useState } from "react";
// import "../components/LoginFormCss.css";
import axios from "axios";
import config from "../config/config";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login-bg.jpg";
import Footer from "./Footer";

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

      console.log(response.data);
      const { success, message, token } = response.data;
      if (success) {
        localStorage.setItem("token", token);
        alert(message);
        setEmail("");
        setPassword("");
        setLoader(false);
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createOrder = async (amount) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/payment/createOrder`,
        {
          amount: amount,
          currency: "INR",
          receipt: "receipt#1",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to create order:", error);
      return null;
    }
  };

  const verifyPayment = async (paymentId, orderId, signature) => {
    try {
      const response = await axios.post("/capturePayment", {
        paymentId: paymentId,
        orderId: orderId,
        signature: signature,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to verify payment:", error);
      return null;
    }
  };

  const handleOnPayment = async () => {
    try {
      //   const res = await loadRazorpayScript();

      // if (!res) {
      //   alert('Failed to load Razorpay SDK');
      //   return;
      // }

      const order = await createOrder(500); // Amount in paise

      if (!order) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: "d00934", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency's smallest unit
        currency: order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order.id, // Order ID from server
        handler: async function (response) {
          const paymentData = await verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );

          if (paymentData) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {}
  };

  return (
    <>
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
          <span className="text-xl font-semibold">Blurock Innovations</span>
          <ul className="flex gap-6 cursor-pointer">
            <li onClick={handleOnPayment}>Pay</li>
            <li>
              <Link to={"/signup"}>Sign up</Link>
            </li>
            <li>Need help: +91 9876543210</li>
          </ul>
        </div>
        <div className="flex flex-col ">
          {/* left side div */}
          <div className="flex flex-row justify-center items-center w-full h-[100vh] ">
            <form className="bg-white border w-[350px]  rounded-md px-8  shadow-md">
              <p className=" text-3xl font-bold  flex justify-center xl:text-2xl xl:pt-6 xl:mb-6 xl:mt-0">
                Continue with blurock
              </p>
              <div className="flex flex-col gap-2 my-4">
                <label className="font-semibold text-sm" htmlFor="companyName">
                  Email
                </label>
                <input
                  id="companyName"
                  className="border mt-1 p-2 rounded-md"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="companyName">
                  Password
                </label>
                <input
                  id="companyName"
                  className="border mt-1 p-2 rounded-md"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className=" flex flex-row  xl:flex justify-center xl:mt-6 ">
                <button
                  className="bg-blue-500 hover:bg-blue-700 px-8 py-2  text-lg rounded-md text-white mt-20  xl:w-auto xl:mt-4 xl:mb-6"
                  onClick={(e) => handleOnLogin(e)}
                >
                  Submit
                </button>
              </div>

              <div className="flex justify-end">
                <span className="cursor-pointer text-[12px]">
                  Forgot your password?
                </span>
              </div>

              <div className="flex flex-row  xl:flex justify-center xl:mt-2 xl:mb-6 p-2  text-sm ">
                <Link to={"/signup"}>
                  New User?
                  <span className="cursor-pointer text-blue-800">
                    {" "}
                    Create Account
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
