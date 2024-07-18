import React from "react";

const SignUpSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600">
          Sign Up Successful!
        </h1>
        <p className="mt-4 text-center text-gray-700">
          Thank you for signing up. Your account has been successfully created.
        </p>
        <div className="mt-6 flex justify-center">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2l4-4m0 0a9 9 0 11-9-9"
            ></path>
          </svg>
        </div>
        <div className="mt-6 flex justify-center">
          <a
            href="/login"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
