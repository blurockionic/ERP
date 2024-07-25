import { Edit, Trash } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import AddItems from "./common/AddItems";
import axios from "axios";
import config from "../config/config";

const BedingDetails = ({ bedingDetails, isAddItemClicked, id, flag }) => {
  const [itemToEdit, setItemToEdit] = useState(null);

  // Handle on addItem
  const handleAddItem = async (item) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/order/add-item/${id}`,
        { item, flag }
      );
      console.log("Item added:", response);
      // Optionally update the local state or refresh the data from the backend
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error accordingly
    }
  };

  // Handle the edit button click
  const handleEditClick = (item) => {
    setItemToEdit(item);
  };

  // Handle the delete button click
  const handleDeleteClick = (item) => {
    console.log(item._id);
  };

  return (
    <div className="overflow-x-auto">
      {bedingDetails?.length > 0 ? (
        <>
          {isAddItemClicked && (
            <AddItems onAddItem={handleAddItem} itemToEdit={itemToEdit} isAddItemClicked={isAddItemClicked} flag={flag} />
          )}

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-800">
              <tr className="text-center">
                <th className="py-2 px-4">S.No.</th>
                <th className="py-2 px-4">Item Name</th>
                <th className="py-2 px-4">Item Quantity</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bedingDetails.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 capitalize">
                    {item.itemNameBistar}
                  </td>
                  <td className="py-2 px-4">{item.itemCountForOrderBistar}</td>
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
          There are no bedding details available.
        </div>
      )}
    </div>
  );
};

export default memo(BedingDetails);
