import React from "react";
import { Link } from "react-router-dom";

const StepFinal = () => {
  return (
    <div className="h-screen">
      <div className=" flex flex-row justify-center mt-12 ">
        <span className="ml-3 text-2xl bg-gradient-to-r from-purple-100 to-pink-200 text-black font-bold rounded-md shadow-lg p-6 text-center">
          Order placed successfully!
        </span>
      </div>
      <Link to={"../order"}>
        <div className="h-full mt-8 text-center">
          <button className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
           Go to Order details
          </button>
        </div>
      </Link>
    </div>
  );
};

export default StepFinal;
