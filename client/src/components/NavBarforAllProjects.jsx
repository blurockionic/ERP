import React, { useEffect, useState } from "react";

import UserProfileModel from "./UserProfileModel";
import NotificationDetailsPage from "./NotificationDetailsPage";

const NavBarforAllProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>{isModalOpen && <UserProfileModel onRequestClose={setIsModalOpen} />}</>
  );
};

export default NavBarforAllProjects;
