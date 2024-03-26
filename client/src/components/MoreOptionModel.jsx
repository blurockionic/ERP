import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MoreOptionModel = () => {
  return (
    <>
      <div className="flex mx-auto bg-black mb-0 text-white w-[28rem] font-thin  mt-[22rem] p-3 rounded z-10 ">
        <div className=" px-2 flex ">
          <span> selected row count </span> selected{" "}
          <span className="pl-2 pr-2">
            <KeyboardArrowDownIcon />
          </span>{" "}
        </div>
        <div className=" px-2  flex " >
          <span className="pl-2 pr-2">
            <TrendingFlatIcon />
          </span>{" "}
          Assign
        </div>
        <div className=" px-2 flex ">
          <span className="pl-2 pr-2">
            <EditIcon />
          </span>{" "}
          Edit{" "}
        </div>

        <div className=" px-2 flex  ">
          <span className="pl-2 pr-2">
            <DeleteIcon />{" "}
          </span>{" "}
          Delete{" "}
        </div>
        <div className=" px-2 flex ">
          <span >
            <CloseIcon />
          </span>
        </div>
      </div>
    </>
  );
};

export default MoreOptionModel;
