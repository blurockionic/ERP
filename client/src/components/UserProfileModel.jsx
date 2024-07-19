import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";

const UserProfileModel = ({ closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  //handle for loagout
  const handleOnLogout = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/auth/logout`, {
        withCredentials: true,
      });

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        dispatch(logout());
        navigate("../login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-[20rem] absolute right-5 top-16 z-40">
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
              <h3 className="capitalize p-1">{currentUser.fullName}</h3>
              <h5 className="text-[#561717]">{currentUser.role}</h5>
              <h3 className="lowercase p-1">{currentUser.email}</h3>
            </div>
          </div>

          <div className="border-b py-2">
            <h5 className="capitalize">{currentUser?.companyName}</h5>
            <h5>{currentUser?._id}</h5>
          </div>
          <div className="border-b-2 pt-2 pb-2 flex flex-col">
            {/* Change here: Use <link> tag for stylesheets */}
            {currentUser.role === "Admin" && (
              <>
                <Link to="/subscription-plan">Subscription Plan</Link>
                <Link to="/payment-history">Payment History</Link>
                <Link to="/manage-user">Manage User</Link>
              </>
            )}
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
    </>
  );
};

export default UserProfileModel;
