import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TentFormPage from "../pages/orderManagement/page/TentFormPage";
import BisterOrder from "../pages/orderManagement/page/BisterOrder";
import tentimg from "../../src/assets/tent.jpg";
import decorimg from "../../src/assets/decoration.jpg";
import cateringimg from '../../src/assets/catering.jpg'
import bisterimg from '../../src/assets/bister.jpg'

import lightimg from '../../src/assets/light.jpg'


const TabButtons = () => {
  const [tentFromActive, setTentFormActive] = useState("");
  const [showModel, setShowModel] = useState(false);
  // form active
  const openTentClickHandler = () => {
    alert("button clicked ");
    setTentFormActive("tent");
  };

  const openBistarClickHandler = () => {
    alert("button clicked ");
    setShowModel(true);
    setTentFormActive("bistar");
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-3 ">
      <div
          className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain "
          style={{ backgroundImage: `url(${tentimg}) `, }}
        >
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0]  ">
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100 ">Tent Service </h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>


        <div
          className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain "
          style={{ backgroundImage: `url(${decorimg}) `, }}
        >
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0]  ">
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100 ">Decoration</h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>
        <div
          className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain "
          style={{ backgroundImage: `url(${cateringimg}) `, }}
        >
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0]  ">
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100 ">Catering</h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>
        {/* bisters  */}
       <div
          className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain "
          style={{ backgroundImage: `url(${bisterimg}) `, }}
        >
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center  text-black bg-[#fffffff0] hover:bg-[#D7DFFE] cursor-pointer   " onClick={openBistarClickHandler}>
            <div className="">
              {" "}
              <h3 className="text-lg  uppercase opacity-100   ">Bister Service </h3>

              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>

        <div
          className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain "
          style={{ backgroundImage: `url(${lightimg}) `, }}
        >
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0]  ">
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100 ">Light Decor </h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>
      </div>

      {tentFromActive === "tent" && <TentFormPage />}
      {tentFromActive === "bistar" && showModel && (
        <BisterOrder setShowModel={setShowModel} />
      )}
    </>
  );
};

export default TabButtons;
