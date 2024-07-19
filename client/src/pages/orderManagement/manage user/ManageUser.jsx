import axios from "axios";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import config from "../../../config/config";
import toast, { Toaster } from "react-hot-toast";

const ManageUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState("Active");
  const [softwareName, setSoftwareName] = useState("Order Management System");
  const [isLoding, setIsLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [isClickUpdate, setIsClickUpdate] = useState(false);
  const [userId, setUserId] = useState("");

  // fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/auth/all`);

        const { users } = response.data;
        const filterUserByCompany = users.filter(
          (user) => user.companyId === currentUser?.companyId
        );
        setAllUser(filterUserByCompany);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
        setIsModelOpen(false);
        setIsClickUpdate(false);
        setUserId("");
      }
    };

    fetchAllUsers();
  }, [isLoding, currentUser?.companyId]);

  useEffect(() => {
    const filterUser = allUser.filter((user) => user._id === userId);
    for (let user of filterUser) {
      setFullName(user?.fullName);
      setEmail(user?.email);
      setRole(user?.role);
      setSoftwareName(user?.softwareName);
      setStatus(user?.status);
    }
  }, [isClickUpdate, allUser, userId]);

  //handle for delete user
  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`${config.apiUrl}/auth/${id}`);

      const { success, message } = response.data;
      if (success) {
        setIsLoading(true);
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const openAddUserModel = () => {
    setIsModelOpen((prev) => !prev);
  };

  // handle for add user
  const handleAddUser = async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/auth/signup`, {
        fullName,
        email,
        role,
        companyId: currentUser.companyId,
        status,
        softwareName,
        companyName: currentUser?.companyName,
      });

      const { success, message } = response.data;
      if (success) {
        console.log(message);
        toast.success(message);
        setIsLoading(true);
      }
    } catch (error) {
      console.error("There was an error adding the user!", error);
      toast.error(error.response.data.message);
    } finally {
      // Clear the form
      setFullName("");
      setEmail("");
      setRole("Admin");
      setStatus("Active");
    }
  };

  // handle for ST THE VALUE FOR UPDATE THE USER DETAILS
  const handleSetupdateValue = (userId) => {
    setIsModelOpen(true);
    setIsClickUpdate(true);
    setUserId(userId);
  };

  //handle on edit
  const handleOnEdit = async () => {
    const userData = {
      fullName: fullName,
      email: email,
      status: status,
      softwareName: softwareName,
      role: role,
    };
    try {
      const response = await axios.put(`${config.apiUrl}/auth/${userId}`, {
        userData,
      });
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      }
      setIsLoading(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Toaster />
      <div className="container mx-auto p-4">
        <div className="flex justify-end p-2">
          <button
            onClick={openAddUserModel}
            className="flex bg-blue-700 items-center text-white px-4"
          >
            <Plus /> Add user
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="border text-black">
                <tr>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Email
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Role
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Status
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Access to
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {isModelOpen && (
                  <tr className="hover:bg-gray-100 bg-gray-200">
                    <td className="py-3 px-4  border-gray-200">
                      <label htmlFor="fullname" className="text-xs">
                        Name
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border outline-none rounded-sm bg-gray-50 w-full"
                        required
                      />
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      <label htmlFor="email" className="text-xs">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border outline-none rounded-sm bg-gray-50 w-full"
                        required
                      />
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      <label htmlFor="role" className="text-xs">
                        Role
                      </label>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border outline-none rounded-sm bg-gray-50 w-full"
                        required
                      >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      <label htmlFor="status" className="text-xs">
                        Status
                      </label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border outline-none rounded-sm bg-gray-50 w-full"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      <label htmlFor="software" className="text-xs">
                        Software
                      </label>
                      <select
                        id="software"
                        value={softwareName}
                        onChange={(e) => setSoftwareName(e.target.value)}
                        className="border outline-none rounded-sm bg-gray-50 w-full"
                        required
                      >
                        <option value="Order Management System">
                          Order Management System
                        </option>
                      </select>
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      {isClickUpdate ? (
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          onClick={handleOnEdit}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          onClick={handleAddUser}
                        >
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                )}
                {allUser.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100 text-center">
                    <td className="py-3 px-4  border-gray-200">
                      {user?.fullName}
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      {user?.email}
                    </td>
                    <td className="py-3 px-4  border-gray-200">{user?.role}</td>
                    <td className="py-3 px-4  border-gray-200">
                      {user?.status}
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      {user?.softwareName}
                    </td>
                    <td className="py-3 px-4  border-gray-200">
                      <button
                        onClick={() => handleSetupdateValue(user._id)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
