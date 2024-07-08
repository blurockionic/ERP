import React, { useEffect, useState } from "react";


import UserProfileModel from "./UserProfileModel";
import NotificationDetailsPage from "./NotificationDetailsPage";


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
