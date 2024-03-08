
import React from "react";
import ButtonUsage from "./ButtonUsage";
import { useNavigate } from "react-router-dom";





const BasicCard = ({ icon, title, description }) => {
  const navigate = useNavigate();
  const handleOnOpen = () => {
    alert("button clicked ");
    navigate("/leadmanagement-dashboard");
  };
  return (
    <div className="bg-slate-100 p-2 border-2 ">
      <div className="flex gap-6 p-4 align-text-center ">
        {icon}
        <h1 className="text-xl ">{title}</h1>
      </div>
      <div className="px-4"><span> {description} </span></div>
   <div className="flex flex-row justify-end pr-4">
   <ButtonUsage onClickHandler={handleOnOpen} children="Open" />
   </div>
    </div>
  );
};

export default BasicCard;
