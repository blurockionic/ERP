import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import CreateUserModel from "../Lead_Management/lead/CreateUserModel";
import axios from "axios";
import config from "../../config/config";

const ManageUsers = () => {
  const [showUserModel, setShowUserModel] = useState(false);

  const [grantUsers, setGrantUsers] = useState([]);

  const [activeUsers, setActiveUsers] = useState([]);

  const handleToggle = (index) => {
    const updatedUsers = [...activeUsers];
    updatedUsers[index] = !updatedUsers[index];
    setActiveUsers(updatedUsers);
  };

  //useEffect for all grants user
  useEffect(() => {
    const grantUsers = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/grant/hasgrant`, {
          withCredentials: true,
        });

        const { success, access } = response.data;
        if (success) {
          setGrantUsers(access);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    //grantUsers
    grantUsers();
  }, []);

  console.log();

  return (
    <div className=" w-full">
      <nav className="bg-white flex flex-row justify-between border-b-2">
        <div className="flex items-center">
          {" "}
          <div className=" w-[3rem] h-[3rem] border-2 solid border-black bg-white ml-5  rounded-full">
            {" "}
          </div>
          <div> company Name</div>
        </div>

        <div className=" flex flex-row items-center gap-4 mr-5 h-[2.7rem]">
          <div className=" bg-white  border-2 text-center  rounded-full w-[5rem] p-1  ">
            <button>Action</button>
          </div>{" "}
          <div className=" bg-white border-2 text-center rounded-full w-[5rem] p-1  ">
            <button> Export </button>
          </div>{" "}
        </div>
      </nav>

      <div className="bg-white flex flex-row justify-between border-b-2">
        {/* left side div  for the user count and active user */}
        <div className=" flex flex-row items-center gap-4 ml-5">
          <div>
            {" "}
            Total user: <span> 2 </span>
          </div>
          <div>
            {" "}
            Active user: <span> </span>
          </div>
        </div>

        {/* right side  div for search button and add new user */}
        <div className=" flex flex-row items-center gap-4 mr-5">
          {/* search button tab div */}
          <div className="">
            <SearchBar />
          </div>
          <div>
            <button className="" onClick={() => setShowUserModel(true)}>
              Add user
            </button>
          </div>
        </div>
      </div>

      {/* table div*/}
      <div className=" mt-2 border-2 table-container ">
        <table className="w-full text-center  min-h-[32rem]">
          <thead className=" border-b-2">
            <tr>
              {/* <th className="border-r-2 p-2 ">
                <input
                  style={{
                    marginLeft: "4px",
                    paddingTop: "2px",
                    width: "16px", // Set the width
                    height: "16px", // Set the height
                    border: "2px solid #4F46E5",
                  }}
                  type="checkbox"
                  // checked={selectAll}
                  // onChange={handleSelectAll}
                />
              </th> */}
              <th className=" border-r-2  font-medium ">S.No</th>
              <th className=" border-r-2  font-medium ">Name</th>
              <th className="border-r-2  font-medium">Last Active </th>
              <th className="border-r-2  font-medium">Activate</th>
            </tr>
          </thead>
          <tbody>
            {grantUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={activeUsers[index] } // Use user.isActive to determine the initial state
                      onChange={() => handleToggle(index)}
                    />
                    <div
                      className={`relative w-11 h-6 ${
                        activeUsers[index]  ? "bg-blue-600" : "bg-gray-200"
                      } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
                    ></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {activeUsers[index]  ? "Active" : "Inactive"}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div>jai shree ram</div> */}

      {showUserModel && <CreateUserModel setShowUserModel={setShowUserModel} />}
    </div>
  );
};

export default ManageUsers;
