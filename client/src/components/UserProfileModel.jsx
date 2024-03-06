import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const UserProfileModel = () => {
  return (
    <div className="w-[20rem] absolute right-5 top-10">
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

          <div className="border-b-2 text-center pb-6 ">
            <h3 className="lowercase p-1"> Arun Upadhayay</h3>
            <h5 className="text-[#561717]  ">Super Admin</h5>
            <h3 className="lowercase p-1"> martinarunarun@gmail.com</h3>
            <button className="bg-[#E65100] mt-2 p-1 rounded-full w-[8rem]">
              View Profile
            </button>
          </div>

          <div className="border-b py-2">
            <h5>company ID </h5>
            <h5>company Name</h5>
          </div>
          <div className="border-b-2 pt-2 pb-2">
            {/* change hare the link tag */}
            <a className="  " rel="stylesheet" href="" /> manage user{" "}
          </div>

          <div className="flex flex-row justify-between border-b py-2 ">
            <div>
              version
              <span> v1.0.0 </span>
            </div>
            <div>
              {" "}
              build :<span> 19/01 </span>
            </div>
          </div>

          <div className="flex flex-row justify-between">
           <button>Sign out</button>
            <div>
                {/* change the button to link tag */}
               <button> Privacy policy <span>i</span> </button>
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModel;
