import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import config from "../../../config/config";

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
    <div>
      <div className=" relative w-full bg-gray-50">
        <Toaster />
        <nav className="bg-gray-100 flex flex-row justify-between border-b-2">
          {/* order and create order button */}
          <div className="flex items-center">
            <Link to={"../allRecipes"}>
              <div
                className={`px-3 py-1.5 my-2 ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}
              >
                <ArrowBackIcon className="text-xs mr-1" />
                Back
              </div>
            </Link>
          </div>
          <div
            className={`px-3 py-1.5 my-2 ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}
          >
            Recipe Details
          </div>
          <div
            className={`px-3 py-1.5 my-2 ml-2 rounded-md font-semibold bg-white cursor-pointer hover:bg-gray-100`}
          ></div>
        </nav>

        <div className=" ">
          <div className="mx-12 border-2 h-[628px] rounded-xl bg-white table-container mt-2 table-container relative overflow-x-hidden overflow-y-scroll">
            {filterRecipe.map((recipe, index) => (
              <div key={index} className="p-4 flex flex-col">
                <div className="mx-16 flex flex-row justify-between">
                  <div className="flex flex-col ">
                    <span>Recipe Name</span>
                    <h1 className="capitalize text-2xl text-slate-700 font-semibold">
                      {recipe.recipeName}
                    </h1>
                  </div>
                  <div className="flex flex-col ">
                    <span>Recipe Category</span>
                    <h1 className="text-2xl text-slate-700 font-semibold capitalize">
                      {recipe.recipeCategory}
                    </h1>
                  </div>
                  <div className="flex flex-col ">
                    <span>Recipe Sub Category</span>
                    <h1 className="text-2xl text-slate-700 font-semibold">
                      {recipe.recipeSubCategory}
                    </h1>
                  </div>
                </div>
                <div className="mt-2 rounded-sm mx-12">
                  <div className="mt-4 pl-4 text-xl text-slate-700 font-semibold bg-slate-200 p-2">
                    Ingredients
                  </div>
                  <div className="mx-auto p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200 grid grid-cols-3 gap-12 text-left px-12">
                          <th className="p-2">S No.</th>
                          <th className="p-2">Ingredient Name</th>
                          <th className="p-2">Ingredient Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipe.recipeRawMaterial.map((ingredient, index) => (
                          <tr
                            key={index}
                            className="capitalize grid grid-cols-3 gap-12 px-12"
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
    </div>
  );
};

export default SeeMoreDetailsOfRecipe;
