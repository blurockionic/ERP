import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import config from "../../../config/config";
import Loader from "../../../components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";

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

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [editRecipeDetails] = useState(() => searchParams.get("id") || null);

  const [allRecipe, setAllRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //get user details
  const { currentUser } = useSelector((state) => state.user);

  //get all recipe
  useEffect(() => {
    // invoke the details
    // function for the geting the all recipe
    const fetchAllRecipe = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.apiUrl}/recipe/all`, {
          withCredentials: true,
        });

        const { success, recipes } = response.data;

        const filterRecipeByCompany = recipes.filter(
          (recipe) => recipe.companyId === currentUser.companyId
        );

        if (success) {
          //filter recipe by company
          setAllRecipe(filterRecipeByCompany);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchAllRecipe();
  }, []);

  // edit Recipe details are set in the existing form
  useEffect(() => {
    if (editRecipeDetails) {
      const recipeToEdit = allRecipe.find(
        (recipe) => recipe._id === editRecipeDetails
      );
      if (recipeToEdit) {
        setRecipeName(recipeToEdit.recipeName);
        setRecipeCategory(recipeToEdit.recipeCategory);
        setRecipeCode(recipeToEdit.recipeCode);
        setRecipeSubCategory(recipeToEdit.recipeSubCategory);
        setRecipeRawMaterial(recipeToEdit.recipeRawMaterial);
      }
    }
  }, [editRecipeDetails, allRecipe]);

  // add recipe details handler
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

  // handler for removing the recipe ingredient
  const removeRecipeIngredientHandler = (indexToRemove) => {
    setRecipeRawMaterial((prevIngredients) =>
      prevIngredients.filter((_, index) => index !== indexToRemove)
    );
  };

  // handler for create and update details
  const handleOnSubmitRecipe = () => {
    if (editRecipeDetails === null) {
      handleOnCreateRecipe();
    } else {
      handleUpdateRecipe();
    }
  };

  // create recipe handler function
  const handleOnCreateRecipe = async () => {
    try {
      setIsLoading(true);
      if (!recipeName || !recipeCategory || !recipeSubCategory) {
        toast.error("all the details are required");
      }

      const response = await axios.post(
        `${config.apiUrl}/recipe/new`,
        {
          companyId: currentUser.companyId,
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

        setRecipeCategory("");
        setRecipeCode("");
        setRecipeName("");
        setRecipeSubCategory("");
        setRecipeRawMaterial(null);

        navigate("../allRecipes");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // hanlder for update the recipes details
  const handleUpdateRecipe = async () => {
    try {
      setIsLoading(true);
      if (editRecipeDetails) {
        const id = editRecipeDetails;
        // Update the existing recipe
        // Add the logic to update the recipe in your data source
        console.log("Updating Recipe", {
          recipeName,
          recipeCategory,
          recipeSubCategory,
          recipeRawMaterial,
        });
        setIsLoading(true);
        const response = await axios.put(
          `${config.apiUrl}/recipe/${id}`,
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

        console.log(response);
        const { success, message } = response.data;
        if (success) {
          setIsLoading(false);
          
          toast.success(message);
          setIsLoading(false);
          setIngredientQuantity("");
          setIngredientName("");
          setIngredientUnit("");
          setRecipeCategory("");
          setRecipeCode("");
          setRecipeName("");
          setRecipeSubCategory("");
          setRecipeRawMaterial(null);
          setTimeout(() => {
            navigate("../allRecipes");
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden h-[610px] overflow-y-scroll">
      <Toaster />
      <nav className="bg-white py-3  border sticky top-0 z-50">
        {/* back  to all recipe button button */}
        <div className="flex items-center">
          <Link to={"../allRecipes"}>
            {/* <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer bg-slate-200`}
            >
              back
            </button> */}
            <IoMdArrowRoundBack className="text-xl mx-3" />
          </Link>
        </div>

        <div></div>

        {/* add filter */}
      </nav>
      {isLoading ? (
        <div className=" flex justify-center items-center  h-[500px] z-30">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="bg-white border rounded-md table-container mt-2 relative mx-4 md:mx-12 lg:mx-24 p-4">
          <div className="text-center text-2xl font-semibold text-gray-700">
            {editRecipeDetails === null
              ? "Create New Recipe"
              : "Update Recipe Details"}
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-4">
              {/* Recipe Name */}
              <div className="flex flex-col">
                <label className="text-sm py-1 px-2">Recipe Name</label>
                <input
                  type="text"
                  className="capitalize w-full  px-3 py-2.5 rounded-md border"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
              </div>
              {/* Recipe Category */}
              <div className="flex flex-col">
                <label className="text-sm py-1 px-2">Recipe Category</label>
                <select
                  className="w-full h-full px-3 py-2.5 rounded-[7px] border focus:border-gray-900"
                  value={recipeCategory}
                  onChange={(e) => setRecipeCategory(e.target.value)}
                >
                  <option value="" disabled></option>
                  <option value="North Indian">North Indian</option>
                  <option value="South Indian">South Indian</option>
                  <option value="Italian">Italian</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* Recipe Code */}
              {/* <div className="flex flex-col">
                <label className="text-sm py-1 px-2">Recipe Code</label>
                <input
                  type="text"
                  className="border w-full h-full px-3 py-2.5 rounded-[7px] focus:border-gray-900"
                  value={recipeCode}
                  readOnly // Make the input read-only
                />
              </div> */}
              {/* Recipe Sub Category */}
              <div className="flex flex-col">
                <label className="text-sm py-1 px-2">Recipe Sub Category</label>
                <select
                  className="w-full h-full px-3 py-2.5 rounded-[7px] border focus:border-gray-900"
                  value={recipeSubCategory}
                  onChange={(e) => setRecipeSubCategory(e.target.value)}
                >
                  <option value="" disabled></option>
                  <option value="Main Course">Main Course</option>
                  <option value="Starter">Starter</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Brunch">Brunch</option>
                  <option value="Soups and Salad">Soups and Salad</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="text-gray-900 flex flex-row justify-between bg-slate-100 rounded">
              <div
                className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer  ml-4 active`}
              >
                Ingredients
              </div>
              {!ingredientAddItem && (
                <div
                  className={`px-3 py-1.5 m-1 rounded-full font-semibold cursor-pointer hover:bg-gray-50  active`}
                  onClick={AddIngredientHandler}
                >
                  <Tooltip title="Add Ingredient" placement="bottom" arrow>
                    <AddIcon />
                  </Tooltip>
                </div>
              )}
            </div>
            {ingredientAddItem && (
              <div>
                <div className="flex flex-col md:flex-row items-center justify-between p-3 ">
                  <div className="flex flex-col w-full md:w-auto">
                    <label className="text-sm py-1 px-2">Ingredient Name</label>
                    <input
                      type="text"
                      className="capitalize w-full md:w-64 border rounded border-slate-300 py-1.5 px-2"
                      value={ingredientName}
                      onChange={(e) => setIngredientName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-auto mt-4 md:mt-0">
                    <label className="text-sm py-1 px-2">Gross Quantity</label>
                    <input
                      type="text"
                      className="capitalize w-full md:w-64 border rounded border-slate-300 py-1.5 px-2"
                      value={ingredientQuantity}
                      onChange={(e) => setIngredientQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-auto mt-4 md:mt-0">
                    <label className="text-sm py-1 px-2">
                      UOM (unit of measurement)
                    </label>
                    <select
                      className="w-full md:w-64 border rounded border-slate-300 py-1.5 px-2"
                      value={ingredientUnit}
                      onChange={(e) => setIngredientUnit(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Unit
                      </option>
                      <option value="Kilogram">Kilogram</option>
                      <option value="Gram">Gram</option>
                      <option value="Liter">Liter</option>
                      <option value="Pieces">Pieces</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddRecipeIngredient}
                    className="bg-gray-50 font-semibold px-4 py-2 mt-5 md:mt-0 shadow rounded uppercase"
                  >
                    Add Item
                  </button>
                </div>
                {/* List of ingredients */}
                <h2 className="text-sm font-semibold mb-2 ml-4">
                  List of Ingredients
                </h2>
                <div className="w-full mx-auto p-2 overflow-y-scroll h-32">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 grid grid-cols-5 gap-1 md:gap-12 text-left px-2 md:px-12">
                        <th className="p-2 text-xs md:text-lg lg:text-lg">
                          S No.
                        </th>
                        <th className="p-2 text-xs md:text-lg lg:text-lg">
                          Ingredient Name
                        </th>
                        <th className="p-2 text-xs md:text-lg lg:text-lg">
                          Gross Quantity
                        </th>
                        <th className="p-2 text-xs md:text-lg lg:text-lg">
                          UOM
                        </th>
                        <th className="p-2 text-xs md:text-lg lg:text-lg">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipeRawMaterial?.length > 0
                        ? recipeRawMaterial.map((item, index) => (
                            <tr
                              key={index}
                              className="bg-gray-50 grid grid-cols-5 gap-2 md:gap-12 px-2 md:px-12 h-16 p-4"
                            >
                              <td>{index + 1}</td>
                              <td className="p-2  text-xs md:text-lg lg:text-lg capitalize">
                                {item.ingredientName}
                              </td>
                              <td className="p-2 text-xs md:text-lg lg:text-lg">
                                {item.ingredientQuantity}
                              </td>
                              <td className="p-2 text-xs md:text-lg lg:text-lg">
                                {item.ingredientUnit}
                              </td>
                              <td>
                                <Tooltip
                                  title="Remove Ingredient"
                                  placement="bottom"
                                  arrow
                                >
                                  <button
                                    onClick={() =>
                                      removeRecipeIngredientHandler(index)
                                    }
                                    className="p-1 rounded-full border text-red-700"
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
          {/* Create button for creating new order */}
          <div className="w-full flex items-center justify-center mb-6 mt-6">
            <button
              className="bg-gray-900 text-white px-4 py-2 shadow-lg border rounded-md"
              onClick={handleOnSubmitRecipe}
            >
              {editRecipeDetails === null ? "Create Recipe" : "Update Recipe"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewRecipe;
