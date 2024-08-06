import { Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../config/config";

const AddItems = ({
  onAddItem,
  itemToEdit,
  itemToDelete,
  isAddItemClicked,
  flag,
}) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inventoryItem, setInventoryItems] = useState([]);
  const [optionsBistar, setOptionsBistar] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/inventory/all`, {
          withCredentials: true,
        });
        const { status, data } = response;
        if (status === 200) {
          // filter data by company
          const filterDataByCompany = data.filter(
            (item) => item.companyId === currentUser.companyId
          );
          setInventoryItems(filterDataByCompany);
        }
      } catch (error) {
        console.log(error);
      }
    };

    //invoke functions
    fetchInventoryItem();
  }, [currentUser?.companyId]);

  useEffect(() => {
    // if flag === beding
    if (flag === "beding") {
      const options = inventoryItem
        .filter((item) => item.itemCategoryType === "beding")
        .map((item) => ({
          value: item.itemName,
          label: item.itemName,
          quantity: item.itemCurrentAvailability,
        }));

      setOptionsBistar(options);
    }
  }, [flag, inventoryItem]);

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit?.itemNameBistar);
      setQuantity(itemToEdit?.itemCountForOrderBistar);
    } else {
      setItemName("");
      setQuantity("");
    }
  }, [itemToEdit]);

  const handleSelectChange = (event) => {
    const selectedItem = optionsBistar.find(
      (option) => option.value === event.target.value
    );
    if (selectedItem) {
      setItemName(selectedItem.value);
      setQuantity(selectedItem.quantity);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName && quantity) {
      onAddItem({ itemName, quantity });
      setItemName("");
      setQuantity("");
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center flex justify-center">
      <div className="py-2 px-4">
        {isAddItemClicked ? (
          <Select
            value={itemName}
            onChange={handleSelectChange}
            displayEmpty
            className="rounded-sm outline-blue-500 w-60 h-9 border border-blue-500 focus:outline-none"
          >
            <MenuItem value="" disabled>
              Select an item
            </MenuItem>
            {optionsBistar.map((option, index) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            value={itemName}
            onChange={handleSelectChange}
            displayEmpty
            className="rounded-sm outline-blue-500 w-60 h-9 border border-blue-500 focus:outline-none"
          >
            <MenuItem value="" disabled>
              Select an item
            </MenuItem>
            {optionsBistar.map((option, index) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>
      <div className="py-2 px-4">
        <input
          type="text"
          className="rounded-sm p-1 border border-blue-500 outline-blue-500"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="py-2 px-4">
        <button
          type="submit"
          className="px-4 py-1 rounded-sm bg-blue-500 text-white"
        >
          {itemToEdit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddItems;
