import React, { useState } from "react";
import tentimg from "../../src/assets/tent.jpg";
import decorimg from "../../src/assets/decoration.jpg";
import cateringimg from "../../src/assets/catering.jpg";
import bisterimg from "../../src/assets/bister.jpg";

import lightimg from "../../src/assets/light.jpg";
const TabButtons = () => {
  const [FromActive, setFormActive] = useState("");
  const [showModel, setShowModel] = useState(false);
  // tent card button handler
  const openTentClickHandler = () => {
    alert("button clicked ");
    setShowModel(true);
    setFormActive("tent");
  };

  // bister card button handler
  const openBistarClickHandler = () => {
    alert("bistar button clicked ");
    setShowModel(true);
    setFormActive("bistar");
  };
  // catering card button handler
  const openCateringHanler = () => {
    alert("catering button clicked");
    setShowModel(true);
    setFormActive("catering");
  };

  // light card button handler
  const openLightHanler = () => {
    alert("light button clicked");
    setShowModel(true);
    setFormActive("light");
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-3 ">
        <div
          className="flex relative max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repeat bg-contain"
          onClick={openTentClickHandler}
        >
          <img
            src={tentimg}
            alt="Tent Service"
            className="w-full h-full object-cover"
            loading="lazy" // Lazy load the image
          />
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0] opacity-100 ">
            <div>
              <h3 className="text-lg font-bold uppercase">Tent Service</h3>
              <p>Add the order of tent</p>
            </div>
          </div>
        </div>

        <div className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain ">
          <img
            src={decorimg}
            alt="Tent Service"
            className="w-full h-full object-cover"
            loading="lazy" // Lazy load the image
          />
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0]  ">
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100 ">
                Decoration
              </h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>

        <div className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain ">
          <img
            src={cateringimg}
            alt="Tent Service"
            className="w-full h-full object-cover"
            loading="lazy" // Lazy load the image
          />
          <div
            className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0]  "
            onClick={openCateringHanler}
          >
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100 ">
                Catering
              </h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>
        {/* bisters  */}
        <div className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain ">
         
        <img
              src={bisterimg}
              alt="Tent Service"
              className="w-full h-full object-cover"
              loading="lazy" // Lazy load the image
            />
          <div
            className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center  text-black bg-[#fffffff0] hover:bg-[#D7DFFE] cursor-pointer   "
            onClick={openBistarClickHandler}
          >
          
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100  ">
                Bister Service{" "}
              </h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>

        <div
          className="flex  relative  max-w-md mx-auto overflow-hidden rounded-lg shadow-lg w-full h-[12rem] sm:bg-no-repea  bg-contain "
          onClick={openLightHanler}
        >
          <img
            src={lightimg}
            alt="Tent Service"
            className="w-full h-full object-cover"
            loading="lazy" // Lazy load the image
          />
          <div className="absolute inset-0 mt-32 w-full h-full items-top justify-center text-center text-black bg-[#fffffff0]  ">
            <div className="">
              {" "}
              <h3 className="text-lg font-bold uppercase opacity-100 ">
                Light Decor{" "}
              </h3>
              <p className=" opacity-100">Add the order of tent</p>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default TabButtons;
