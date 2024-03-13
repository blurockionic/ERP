import React from "react";
import ButtonUsage from "./ButtonUsage";
import { useNavigate } from "react-router-dom";

const BasicCard = ({ icon, title, description }) => {
  const navigate = useNavigate();
  const handleOnOpen = () => {
    alert("button clicked ");
    navigate("/leadmanagement-dashboard");
  };
  const handleOrderOpen = () => {
    alert("order open button clicked")
    navigate("/orderManagement-dashboard")
  }
  return (
    <div
      className={`${
        title === "Order management"
          ? "bg-[#b8e7f1] p-2 border-2 "
          : " bg-slate-200 p-2 border-2"
      }`}
    >
      <div className="flex gap-6 p-4 align-text-center ">
        {icon}
        <h1 className="text-xl ">{title}</h1>
      </div>
      <div className="px-4">
        <span> {description} </span>
      </div>
      <div className="flex flex-row justify-end pr-4">
        <ButtonUsage
          onClickHandler={
            title === "Order management" ? handleOrderOpen : handleOnOpen
          }
          children="Open"
        />{" "}
      </div>
    </div>
  );
};

export default BasicCard;
