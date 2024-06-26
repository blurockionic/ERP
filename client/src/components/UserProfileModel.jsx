import React, { useEffect, useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfileModel = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const { user } = useSelector((state) => state?.signInCredential);

  const userProfile = JSON.parse(user);
  console.log(userProfile);
  //get profile
  useEffect(() => {
    const profile = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/auth/me`, {
          withCredentials: true,
        });

        const { success, user } = response.data;
        if (success) {
          setProfile(user);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //invoke
    profile();
  }, []);

  //handle for loagout
  const handleOnLogout = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/auth/logout`, {
        withCredentials: true,
      });

      const { success, message } = response.data;
      if (success) {
        alert(message);
        navigate("../login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="w-[20rem] absolute right-5 top-10 z-50">
      <div className="bg-white shadow-lg p-4">
        <div className="p-4">
          <div className="flex flex-row justify-center">
            <PermIdentityIcon
              className="text-gray"
              style={{
                fontSize: "80px",
                border: "1px solid gray",
                borderRadius: "50%",
              }}
            />
          </div>

          <div className="border-b-2 text-center pb-6">
            <h3 className="capitalize p-1">{userProfile?.fullName}</h3>
            <h5 className="text-[#561717]">Super Admin</h5>
            <h3 className="lowercase p-1">{userProfile?.email}</h3>
            <button className="bg-[#E65100] mt-2 p-1 rounded-full w-[8rem]">
              View Profile
            </button>
          </div>
        </div>

        <div className="border-b py-2">
          <h5 className="capitalize">{userProfile.companyName}</h5>
          <h5>{userProfile._id}</h5>
        </div>
        <div className="border-b-2 pt-2 pb-2 flex flex-col">
          {/* Change here: Use <link> tag for stylesheets */}
          <Link to="../dashboard/manageusers">Subscription Plan</Link>
          <Link to="../dashboard/manageusers">Payment Method</Link>
          <Link to="../dashboard/manageusers">Payment History</Link>
          <Link to="../dashboard/manageusers">Manage User</Link>
          <Link to="../dashboard/manageusers">Add User</Link>
        </div>

        <div className="flex flex-row justify-between border-b py-2">
          <div>
            Version
            <span> v1.0.0 </span>
          </div>
          <div>
            Build: <span>19/01</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          {/* Change here: Use <a> tag instead of <button> for links */}
          <button onClick={() => handleOnLogout()}>Sign out</button>
          <div>
            <a href="#">
              Privacy policy <span>i</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModel;
