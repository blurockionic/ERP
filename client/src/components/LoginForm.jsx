import React, { useState } from "react";
// import "../components/LoginFormCss.css";
import axios from "axios";
import config from "../config/config";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login-bg.jpg";
import Footer from "./Footer";
import { Toaster, toast } from "react-hot-toast";
import { TbLoader } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { signInAction } from "../redux/actions/signInActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle on login
  const handleOnLogin = async (e) => {
    e.preventDefault();
    setLoader(true);

    dispatch(signInAction(email, password));

    navigate("/dashboard/home");

    setEmail("");
    setPassword("");
    setLoader(false);
  };

  const handleOnPayment = async (e) => {
    e.preventDefault(); // Prevent default behavior immediately

    const amount = 500; // Amount in paise (subunits of the currency)
    // const currency = "INR";
    // const receivedId = "2342343dsef";

    try {
      const response = await axios.post(
        `${config.apiUrl}/payment/createOrder`,
        {
          amount: amount,
          currency: "INR",
          receipt: "receipt#1",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { order } = response?.data;
      console.log(response.data);

      var options = {
        key: "rzp_test_ZmLv5TQfQoKPD0", // Enter the Key ID generated from the Dashboard
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 500 refers to 500 paise
        currency: "INR",
        name: "Blurock Innovations",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1

        //validate the payment request
        handler: async function (response) {
          // alert(`Payment ID: ${response.razorpay_payment_id}`);
          // alert(`Order ID: ${response.razorpay_order_id}`);
          // alert(`Signature: ${response.razorpay_signature}`);
          // console.log(response);
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          const validateResponse = await axios.post(
            `${config.apiUrl}/payment/validate-payment`,
            { razorpay_payment_id, razorpay_order_id, razorpay_signature },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { message } = validateResponse.data;
          toast.success(message);
        },
        prefill: {
          name: "B.Biruly",
          email: "biruly2000@example.com",
          contact: "+91-6200932331",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(`Code: ${response.error.code}`);
        alert(`Description: ${response.error.description}`);
        alert(`Source: ${response.error.source}`);
        alert(`Step: ${response.error.step}`);
        alert(`Reason: ${response.error.reason}`);
        toast.error(response.error.reason);
        alert(`Order ID: ${response.error.metadata.order_id}`);
        alert(`Payment ID: ${response.error.metadata.payment_id}`);
      });

      rzp1.open();
    } catch (error) {
      console.error("Failed to create order:", error);
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
                  disabled={loader ? true : false}
                  className=" flex items-center bg-blue-500 hover:bg-blue-700 px-8 py-2  text-lg rounded-md text-white mt-20  xl:w-auto xl:mt-4 xl:mb-6"
                  onClick={(e) => handleOnLogin(e)}
                >
                  {loader && <TbLoader className="mx-2 animate-spin" />}
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
