import React from "react";

const SummaryCard = ({ title, icon, orderCount, percentageChange }) => {
    const isPositive = percentageChange >= 0;
  return (
    <div className="w-[310px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        {/* Title and Icon */}
        <div className="flex items-center justify-between space-x-10">
          <div className="text-lg">{title}</div>
          <div className="text-2xl">{icon}</div>
        </div>
        {/* Order Count */}
        <div className="mt-2 text-gray-700 text-xl font-bold">+{orderCount}</div>
        {/* Percentage Change */}
        <div
          className={`mt-2 text-lg ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(percentageChange)}% <span className="text-black text-sm">from last month.</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
