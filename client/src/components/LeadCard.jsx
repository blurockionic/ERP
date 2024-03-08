import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const LeadCard = ({ title, leadcount }) => {
  return (
    <div className="border-2 w-[20rem] solid p-4">
      <div className="flex flex-row justify-between">
        <h1 className=" text-xl  ">{title}</h1>
        <button className="active:bg-slate-300 w-8 h-8 rounded-full">
          <MoreVertIcon />
        </button>
      </div>
      <div >
        <span>filter</span>{" "}
        {/* con */}
        <button className="border px-2 rounded-full border-black ml-2">Date</button>
      </div>
      <div className="py-2">
        <span className="font-semibold text-4xl"> {leadcount}</span>
      </div>
      <div>Lead Count</div>
    </div>
  );
};

export default LeadCard;
