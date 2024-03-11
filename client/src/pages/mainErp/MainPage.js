import React from "react";




import NavigationBar from "../../components/NavigationBar";

import { Outlet, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate =  useNavigate()
  const handleOnOpen = () => {
    //navigate to lead management system
    navigate('/leadmanagement-dashboard')
  };

  return (
    <div>
      <NavigationBar />

    
      <div className="w-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default MainPage;
