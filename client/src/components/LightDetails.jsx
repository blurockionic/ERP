import React, { memo, useState } from "react";
import AddItems from "./common/AddItems";
import toast, { Toaster } from "react-hot-toast";
import config from "../config/config";
import axios from "axios";
import { Edit, Trash } from "lucide-react";

const LightDetails = ({ lightDetails, id, flag, isAddItemClicked }) => {
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isUpdateCliked, setIsUpdateCliked] = useState(isAddItemClicked);

  // Handle on addItem
  const handleAddItem = async (item) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/order/add-item/${id}`,
        { item, flag }
      );
      console.log("Item added:", response);
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIsUpdateCliked(false);
        // reload the screen
        window.location.reload();
      }
      // Optionally update the local state or refresh the data from the backend
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error accordingly
    }
  };

  // Handle the edit button click
  const handleEditClick = (item) => {
    setItemToEdit(item);
    setIsUpdateCliked((prev) => !prev);
  };

  // Handle the delete button click
  const handleDeleteClick = async (item) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/order/remove-item/${id}`,
        { item, flag }
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIsUpdateCliked(false);
        // reload the screen
        window.location.reload();
      }
      // Optionally update the local state or refresh the data from the backend
    } catch (error) {
      console.error("Error removing item:", error);
      // Handle error accordingly
    }
  };
  return (
    <div className="overflow-x-auto">
      <Toaster/>
      {lightDetails?.length > 0 ? (
        <>
          {(isAddItemClicked || isUpdateCliked) && (
            <AddItems
              onAddItem={handleAddItem}
              itemToEdit={itemToEdit}
              isAddItemClicked={isUpdateCliked}
              flag={flag}
            />
          )}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-800">
              <tr className="text-center">
                <th className="py-2 px-4">S.No.</th>
                <th className="py-2 px-4">Item Name</th>
                <th className="py-2 px-4">Item Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lightDetails.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 capitalize">{item.itemNameLight}</td>
                 
                  <td className="py-2 px-4">{item.itemCountForOrderLight}</td>
                  <td className="py-2 px-4 flex gap-4 justify-center">
                    <Edit
                      className="cursor-pointer"
                      onClick={() => handleEditClick(item)}
                    />
                    <Trash
                      className="cursor-pointer"
                      onClick={() => handleDeleteClick(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="bg-gray-200 border border-gray-300 rounded-md p-4 text-center text-gray-600 font-bold">
          There are no light details available.
        </div>
      )}
    </div>
  );
};

export default memo(LightDetails);
