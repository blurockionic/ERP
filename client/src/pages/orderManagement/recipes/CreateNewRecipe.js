import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import { Tooltip } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import config from "../../../config/config";

const CreateNewRecipe = () => {
  const [ingredientAddItem, setIngrediantAddItem] = useState(false);
  // State to manage the selected recipe category
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeSubCategory, setRecipeSubCategory] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeCode, setRecipeCode] = useState("258792");
  const [recipeRawMaterial, setRecipeRawMaterial] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [maxPaxCount, setMaxPaxCount] = useState(0);

  const navigate = useNavigate();

  //handle on add items
  //add item for tent
  const handleAddRecipeIngredient = () => {
    // Create a new data object with the current ingredient details
    const newData = {
      ingredientName,
      ingredientQuantity,
      ingredientUnit,
    };

    console.log(newData);

    // Update the state by appending the new data to the existing array
    setRecipeRawMaterial((prevData) => [...prevData, newData]);

    // Clear the input fields after adding the ingredient
    setIngredientName("");
    setIngredientQuantity(0);
    setIngredientUnit("");
  };

  // handler for the add button
  const AddIngredientHandler = () => {
    setIngrediantAddItem(true);
  };

  const removeRecipeIngredientHandler = (indexToRemove) => {
    setRecipeRawMaterial((prevIngredients) =>
      prevIngredients.filter((_, index) => index !== indexToRemove)
    );
  };

  // create recipe handler function

  const handleOnCreateRecipe = async () => {
    setMaxPaxCount(100);
    try {
      if (!recipeName || !recipeCategory || !recipeSubCategory) {
        toast.error("all the details are required");
      }

      console.log(recipeRawMaterial);

      const response = await axios.post(
        `${config.apiUrl}/recipe/new`,
        {
          maxPaxCount: 100,
          recipeName,
          recipeCategory,
          recipeSubCategory,
          recipeCode,
          recipeRawMaterial,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIngredientQuantity("");
        setIngredientName("");
        setIngredientUnit("");
        setIngredientUnit("");
        setRecipeCategory("");
        setRecipeCode("");
        setRecipeName("");
        setRecipeSubCategory("");
        setRecipeRawMaterial(null);
        navigate("../allRecipes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[660px]">
      <Toaster />
      <nav className="bg-gray-100 flex flex-row justify-between border-b-2">
        {/* back  to all recipe button button */}
        <div className="flex items-center">
          <Link to={"../allRecipes"}>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer bg-slate-200`}
            >
              back
            </button>
          </Link>
        </div>

        {/* add filter */}
      </nav>

      <div className="bg-white border rounded-md table-container mt-2 table-container h-[90%] relative overflow-x-hidden overflow-y-scroll">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3 grid grid-cols-2 gap-8 m-4">
            {/* Recipe Name */}
            <div className="relative">
              <input
                type="text"
                name="Recipe name"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none   disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Recipe Name(HI)
              </label>
            </div>

            {/* recipe Category */}
            <div className="relative">
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Recipe Category
              </label>
              <select
                className=" w-full outline-none  h-full bg-transparent text-blue-gray-700 font-sans font-normal  disabled:bg-blue-gray-50   placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] focus:border-gray-900"
                value={recipeCategory}
                onChange={(e) => setRecipeCategory(e.target.value)}
              >
                <option value="" disabled></option>
                <option value="northindian">Noth Indian</option>
                <option value="southindian">South Indian</option>
                {/* <option value="chinese">Chinese</option> */}
                <option value="italian">Italian</option>

                {/* Add more options as needed */}
              </select>
            </div>

            {/* recipe Code */}
            <div className="relative ">
              <input
                type="text"
                name=""
                className="peer  w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                value={recipeCode}
                readOnly // Make the input read-only
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Recipe Code
              </label>
            </div>

            {/* recipe type or subtype  */}
            <div className="relative">
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Recipe Sub Category
              </label>
              <select
                className=" w-full outline-none  h-full bg-transparent text-blue-gray-700 font-sans font-normal  disabled:bg-blue-gray-50   placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] focus:border-gray-900"
                value={recipeSubCategory}
                onChange={(e) => setRecipeSubCategory(e.target.value)}
              >
                <option value="" disabled></option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Snacks">Snacks</option>
                <option value="Beverages">Beverages</option>
                <option value="Salads">Salads</option>
                <option value="Soups and Stews">Soups and Stews</option>
                <option value="Bakery Items">Bakery Items</option>

                {/* Add more options as needed */}
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-gray-800 flex flex-row justify-between bg-slate-200 ">
            <div className="font-semibold text-xl px-2  bg-white rounded m-1">
              Ingredients
            </div>

            {!ingredientAddItem && (
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer bg-white mr-4 active`}
                onClick={() => AddIngredientHandler()}
              >
                <Tooltip title="Add Ingredient" placement="bottom" arrow>
                  <AddIcon />
                </Tooltip>
              </div>
            )}
          </div>
          {ingredientAddItem && (
            <div>
              {" "}
              <div className="flex items-center justify-between p-3 px-12">
                {/* <div className="flex flex-col">
                  <label className="text-sm mx-2 py-1 px-2">
                    Ingredient Name
                  </label>
                  <Select className="w-64 py-1 px-2 border-gray-900" />
                </div> */}
                <div className="flex flex-col">
                  <label className="text-sm py-1 px-2">Ingredient Name</label>

                  <input
                    type="text"
                    className=" w-64 border rounded border-slate-300 py-1.5 px-2"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm py-1 px-2">Gross Quantity</label>

                  <input
                    type="text"
                    className=" w-64 border rounded border-slate-300 py-1.5 px-2"
                    value={ingredientQuantity}
                    onChange={(e) => setIngredientQuantity(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm py-1 px-2">
                    UOM (unit of measurement)
                  </label>
                  <select
                    className="w-64 border rounded border-slate-300 py-1.5 px-2"
                    value={ingredientUnit}
                    onChange={(e) => setIngredientUnit(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Uint
                    </option>
                    <option value="Kilogram">kilogram</option>
                    <option value="Gram">Gram</option>
                    <option value="Liter">liter</option>
                    <option value="Pieces">pieces</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleAddRecipeIngredient();
                  }}
                  className="bg-gray-50 font-semibold px-4 py-2 mt-5 shadow rounded uppercase"
                >
                  Add Item
                </button>
              </div>
              {/* list of item  */}
              <div className="w-full mx-auto p-4">
                <h2 className="text-sm font-semibold  mb-2">
                  List of Ingredient{" "}
                </h2>
                <table className="w-full">
                  {/* <thead>
                    <tr className="bg-gray-200 grid grid-cols-4 gap-12 text-left px-12">
                      <th className="p-2 ">Ingredient Name</th>
                      <th className="p-2">Gross Quantity</th>
                      <th className="p-2">UOM</th>
                      <th className="p-2"> Action</th>
                    </tr>
                  </thead> */}
                  <tbody className="">
                    {/* list of items */}
                    {recipeRawMaterial.length > 0
                      ? recipeRawMaterial.map((item, index) => (
                          <tr
                            key={index}
                            className="bg-gray-50 grid grid-cols-5 gap-12 px-12 h-16 p-4 "
                          >
                            <td>{index + 1}</td>
                            <td className="p-2 font-bold capitalize">
                              {item.ingredientName}
                            </td>
                            <td className="p-2">{item.ingredientQuantity}</td>
                            <td className="p-2">{item.ingredientUnit}</td>
                            {/* Render other fields as needed */}
                            <td className="">
                              <Tooltip
                                title="remove Ingredient"
                                placement="bottom"
                                arrow
                              >
                                <button
                                  onClick={() =>
                                    removeRecipeIngredientHandler(index)
                                  }
                                  className="p-1 rounded-full border"
                                >
                                  <DeleteOutlineIcon />
                                </button>
                              </Tooltip>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        {/* create button for creating new order  */}
        <div className="w-full flex items-center justify-center mb-6 mt-6">
          <button
            className="bg-gray-900 text-white px-4 py-2 shadow-lg border rounded-md "
            onClick={handleOnCreateRecipe}
          >
            Create Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewRecipe;
