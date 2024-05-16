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
                <h1 className="text-3xl text-slate-700 font-bold">
                  {recipe.recipeName}
                </h1>

                <div className="mt-3 text-xl text-slate-700 font-semibold">
                  Ingredient
                </div>
                <ul>
                  {recipe.recipeRawMaterial.map((ingredient, index) => (
                    <li
                      key={index}
                      className="capitalize "
                    >
                      <span>{ingredient.ingredientName} - </span>
                      <span>{ingredient.ingredientQuantity}  </span>
                      <span>{ingredient.ingredientUnit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeMoreDetailsOfRecipe;
