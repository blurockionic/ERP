import React from "react";
import toast from "react-hot-toast";
import config from "../config/config";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SubscriptionCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state?.signInCredential);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);
  //   handle on payment
  const handleOnPayment = async (e, rupee) => {
    e.preventDefault(); // Prevent default behavior immediately
    if (!isAuthenticated) {
      localStorage.setItem("subRupee", rupee);
      localStorage.setItem("currentPath", location.pathname);
      navigate("/signup");
      return;
    }

    try {
      const response = await axios.post(
        `${config.apiUrl}/payment/createOrder`,
        {
          amount: rupee,
          currency: "INR",
          receipt: "receipt#1",
          companyId: user._id,
          plan: "Basic",
          startDate: Date.now(),
          status: "Active",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { order, subscriptionDetails } = response?.data;
      console.log(response.data);

      var options = {
        key: "rzp_test_ZmLv5TQfQoKPD0", // Enter the Key ID generated from the Dashboard
        amount: rupee, // Amount is in currency subunits. Default currency is INR. Hence, 500 refers to 500 paise
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
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 p-4">
          <h2 className="text-white text-2xl font-bold">Pro Plan</h2>
          <p className="text-blue-200">Best for professionals</p>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-base mb-4">
            Get access to all premium features with the Pro Plan. Ideal for
            professionals who need more control and flexibility.
          </p>
          <ul className="mb-6">
            <li className="flex items-center mb-2">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-gray-700">Unlimited projects</span>
            </li>
            <li className="flex items-center mb-2">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-gray-700">24/7 support</span>
            </li>
            <li className="flex items-center mb-2">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-gray-700">Custom integrations</span>
            </li>
          </ul>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">3000</span>
              <span className="text-2xl font-bold text-gray-900">/month</span>
            </div>
            <button
              onClick={(e) => handleOnPayment(e, 3000)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCard;
