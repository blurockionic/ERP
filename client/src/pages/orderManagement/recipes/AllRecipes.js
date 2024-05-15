import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../../../components/SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config/config";

import AddIcon from "@mui/icons-material/Add";

const AllRecipes = () => {
  const [allRecipe, setAllRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("view");
  const activeButtonHandler = (btn) => {
    setActiveButton(btn);
  };

  //get all recipe
  useEffect(() => {
    const fetchAllRecipe = async () => {
      const response = await axios.get(`${config.apiUrl}/recipe/all`, {
        withCredentials: true,
      });

      console.log(response);
      const { success, recipes } = response.data;

      if (success) {
        setAllRecipe(recipes);
        setIsLoading(false);
      }
    };

    // invoke the details
    fetchAllRecipe();
  }, [isLoading]);

  const handleOndeleteBtn = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${config.apiUrl}/recipe/${id}`, {
        withCredentials: true,
      });

      console.log(response);
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIsLoading(true);
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  return (
    <div className=" relative w-full bg-gray-50">
      <Toaster />
      <nav className="bg-gray-100 flex flex-row justify-between border-b-2">
        {/* order and create order button */}
        <div className="flex items-center">
          <Link>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer  ${
                activeButton === "view" ? "bg-gray-300" : "bg-white"
              }`}
              onClick={() => activeButtonHandler("view")}
            >
              All Recipes
            </button>
          </Link>

          <Link to={"../createNewRecipes"}>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100  ${
                activeButton === "create" ? "bg-slate-100" : "bg-white"
              }`}
              onClick={() => activeButtonHandler("create")}
            >
              <AddIcon className="px-1" />
              Create Recipe
            </button>
          </Link>
        </div>

        <div className="bg-gray-100 flex flex-row justify-between">
          {/* search button tab div */}

          <SearchBar />
        </div>
        {/* add filter */}
      </nav>

      <div className=" border-2 h-[628px] rounded-xl">
        {/*  table and Add item div */}

        <div className="bg-white border rounded-md table-container mt-2 table-container h-[90%] relative overflow-x-hidden overflow-y-scroll">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-white text-sm z-10">
              <tr className="text-gray-700 py-5">
                <th className="font-bold py-2 px-4 text-gray-600">S.No.</th>
                <th className="font-bold py-2 px-4 text-gray-600">
                  Recipe Name
                </th>
                <th className="font-bold py-2 px-4 text-gray-600">
                  Recipe Category
                </th>
                <th className="font-bold py-2 px-4 text-gray-600">
                  Recipe Type
                </th>
                <th className="font-bold py-2 px-4 text-gray-600">Action</th>
                <th className="font-bold py-2 px-4 text-gray-600">More</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal overflow-y-scroll mt-4 bg-white overflow-x-hidden">
              {allRecipe.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-4  text-xl p-4 bg-gray-100 m-4 "
                  >
                    Oops, the Recipe was not found.
                  </td>
                </tr>
              ) : (
                allRecipe.map((recipe, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{recipe.recipeName}</td>
                    <td className="py-2 px-4">{recipe.recipeCategory}</td>
                    <td className="py-2 px-4">{recipe.recipeSubCategory}</td>

                    <td className="py-2 px-4">
                      <span className="text-green-600 cursor-pointer">
                        Edit
                      </span>{" "}
                      <span
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleOndeleteBtn(recipe._id)}
                      >
                        Delete
                      </span>{" "}
                    </td>
                    <td className="py-2 px-4 cursor-pointer">See Details</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
