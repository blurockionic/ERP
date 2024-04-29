import { Tooltip } from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const CustomerProfilePage = () => {
    // const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
  return (
    <div>
      <div className="flex flex-row justify-between bg-slate-200 border">
        <Link to={"../customer"}>
          <div className="flex bg-white rounded font-semibold px-3 py-1 m-1 ">
            <Tooltip title="back to all cutomers" placement="bottom" arrow>
              <span className=" ">back</span>
            </Tooltip>
          </div>
        </Link>
      </div>
      {/* customer detials order  */}
      <div className="bg-slate-400 w-full h-full flex flex-row ">
        {/* customer personal details */}
        <div className="p-4 bg-white border  grid grid-cols-2 gap-4 flex-wrap ">
          <div className="flex flex-col ">
            <span>customer Name </span>
            <span>arun</span>
          </div>
          <div className="flex flex-col  ">
            <span>customer Email</span>
            <span>arunupadhayay@gmail.com</span>
          </div>

          <div className="flex flex-col ">
            <span> Phone Number </span>
            <span>6598223567</span>
          </div>

          <div className="flex flex-col">
            <span>customer Adress</span>
            <span>Lokhand wala maharastra </span>
          </div>
        </div>
        {/* Order Related Details */}
        {/* <div className="flex"> <p>Customer ID: {id}</p></div> */}
      </div>
    </div>
  );
};

export default CustomerProfilePage;
