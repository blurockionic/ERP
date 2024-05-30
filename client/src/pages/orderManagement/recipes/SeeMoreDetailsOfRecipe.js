import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import config from "../../../config/config";
import { IoMdArrowRoundBack } from "react-icons/io";

const SeeMoreDetailsOfRecipe = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const recipeId = searchParams.get("id");

  const [allRecipe, setAllRecipe] = useState([]);
  const [filterRecipe, setFilterRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //get all recipe
  useEffect(() => {
    const fetchAllRecipe = async () => {
      const response = await axios.get(`${config.apiUrl}/recipe/all`, {
        withCredentials: true,
      });

      // console.log(response);
      const { success, recipes } = response.data;

      if (success) {
        setAllRecipe(recipes);
        setIsLoading(false);
      }
    };

    // invoke the details
    fetchAllRecipe();
  }, [isLoading]);

  useEffect(() => {
    const filterSingleRecipe = allRecipe.filter(
      (recipe) => recipe._id === recipeId
    );
    setFilterRecipe(filterSingleRecipe);
  }, [allRecipe, recipeId]);

  return (
    <div className="relative w-full bg-gray-50">
      <Toaster />
      <nav className="bg-white flex flex-row justify-between border-b">
        <div className="flex items-center py-2">
          <Link to="../allRecipes">
            {/* <div className="px-3 py-1.5 my-2 ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100">
              <ArrowBackIcon className="text-xs mr-1" />
              Back
            </div> */}
            <IoMdArrowRoundBack  className="text-2xl mx-4"/>
          </Link>
        </div>
        {/* <div className="px-3 py-1.5 my-2 ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100">
          Recipe Details
        </div> */}
        {/* <div className="px-3 py-1.5 my-2 ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100"></div> */}
      </nav>

      <div className="mx-4 md:mx-12 mt-2">
        <div className="border-2 h-[628px] rounded-xl bg-white relative overflow-x-hidden overflow-y-scroll">
          {filterRecipe.map((recipe, index) => (
            <div key={index} className="p-4 flex flex-col">
              <div className="flex justify-center mb-4">
                <div className="flex flex-col">
                  <h1 className="text-2xl text-slate-700 font-semibold uppercase">
                    Recipe detailed information
                  </h1>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-2 lg:mx-10">
                <div className="border rounded-md flex flex-col p-4">
                  <h1 className="uppercase text-center text-gray-700 font-semibold mb-4">
                    Recipe General Information
                  </h1>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                      RECIPE NAME
                    </label>
                    <div className="border p-2 rounded-md capitalize">
                      {recipe.recipeName}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                      RECIPE CATEGORY
                    </label>
                    <div className="capitalize border p-2 rounded-md">
                      {recipe.recipeCategory}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      RECIPE SUB CATEGORY
                    </label>
                    <div className="border p-2 rounded-md">
                      {recipe.recipeSubCategory}
                    </div>
                  </div>
                </div>
                <div className="border rounded-md flex flex-col p-4">
                  <h1 className="uppercase text-center text-gray-700 font-semibold mb-4">
                    Recipe Ingredient Details
                  </h1>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 grid grid-cols-3 gap-4 text-left px-4 text-gray-700 font-semibold">
                        <th className="p-2">S No.</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.recipeRawMaterial.map((ingredient, index) => (
                        <tr
                          key={index}
                          className="bg-white mt-2 grid grid-cols-3 gap-4 px-4 border p-1 rounded-lg"
                        >
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{ingredient.ingredientName}</td>
                          <td className="p-2">
                            {ingredient.ingredientQuantity}{" "}
                            {ingredient.ingredientUnit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeMoreDetailsOfRecipe;
