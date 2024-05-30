import React, { useEffect, useState } from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";
import UserProfileModel from "./UserProfileModel";
import NotificationDetailsPage from "./NotificationDetailsPage";
import { FiAlignLeft } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import OrderManagement from "../pages/orderManagement/OrderManagement";

const NavBarforAllProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  
  return (
    <>
     

      {isModalOpen && <UserProfileModel onRequestClose={setIsModalOpen} />}
      {isNotificationModalOpen && <NotificationDetailsPage />}
      
    </>
  );
};

export default NavBarforAllProjects;
