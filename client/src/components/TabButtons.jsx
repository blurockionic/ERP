import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TentFormPage from "../pages/orderManagement/page/TentFormPage";
import BisterOrder from "../pages/orderManagement/page/BisterOrder";
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
    setShowModel(true)
    setTentFormActive("bistar");
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-3 ">
        <div className="flex justify-between w-40rem h-4rem bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none text-lg p-3 " onClick={() => openTentClickHandler()} >
          <Link on to="">
            <button >Tent</button>
          </Link>
          <ArrowRightAltIcon />
        </div>
        <div className="flex justify-between w-40rem h-4rem bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none text-lg  p-3">
          <Link to="/decoration">
            <button>Decoration</button>
          </Link>

          <ArrowRightAltIcon />
        </div>
        <div className="flex justify-between w-40rem h-4rem bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none text-lg p-3">
          <Link to="/catering">
            <button>Catering</button>
          </Link>
          <ArrowRightAltIcon />
        </div>

        <div className="flex justify-between w-40rem h-4rem bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none  p-3 text-lg" onClick={() => openBistarClickHandler()}>
          <Link to="">
            <button>Bistar</button>
          </Link>
          <ArrowRightAltIcon />
        </div>
        <div className="flex justify-between w-40rem h-4rem bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none  p-3 text-lg">
          <Link to="/light"
          >
            <button>Lights</button>
          </Link>
          <ArrowRightAltIcon />
        </div>
      </div>

      {tentFromActive === "tent" && <TentFormPage />}
      {tentFromActive === "bistar" && showModel && ( <BisterOrder setShowModel={setShowModel} />

      )}
    </>
  );
};

export default TabButtons;
