import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../../../components/SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config/config";

import AddIcon from "@mui/icons-material/Add";

import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { Tooltip } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../../components/Loader";

const AllRecipes = () => {
  const [allRecipe, setAllRecipe] = useState([]);
  const [allRecipeForSearch, setAllRecipeforSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("view");
  const activeButtonHandler = (btn) => {
    setActiveButton(btn);
  };
  // fuction for getting all the recipes
  const fetchAllRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${config.apiUrl}/recipe/all`, {
        withCredentials: true,
      });

      // console.log(response);
      const { success, recipes } = response.data;

      if (success) {
        setAllRecipe(recipes);
        setIsLoading(false);
        setAllRecipeforSearch(recipes);
      }
    } catch (error) {
      toast.error(error.response.message);
      setIsLoading(false);
    }
  };

  //get all recipe
  useEffect(() => {
    // invoke the details
    fetchAllRecipe();
  }, []);

  // handle delete recipe
  const handleOnDeleteBtn = async (id) => {
    // console.log(id);
    try {
      setIsLoading(true);
      const response = await axios.delete(`${config.apiUrl}/recipe/${id}`, {
        withCredentials: true,
      });

      // console.log(response);
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setIsLoading(false);
        await fetchAllRecipe();
      }
    } catch (error) {
      toast.error(error.response.message);
      setIsLoading(false);
    }
  };
  // search handler
  const handleOnSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setAllRecipe(allRecipe);
    } else {
      // Filter the array based on the search term
      const tempVar = allRecipeForSearch?.filter((item) =>
        item.recipeName?.trim().toLowerCase().includes(searchTerm)
      );
      setAllRecipe(tempVar); // Update the array state with the filtered results
    }
  };

  return (
    <div className=" relative w-full bg-gray-50">
      <Toaster />
      <nav className="bg-white flex  justify-between items-center border-b-1 shadow-sm px-6 md:px-10 py-1">
        {/* order and create order button */}
        <div className="flex items-center ">
          <Link>
            <button
               className={`px-6 py-.5 m-1 rounded-full font-semibold cursor-pointer border border-slate-400 ${
                activeButton === "view" ? "bg-gray-100  " : "bg-white"
              }`}
              onClick={() => activeButtonHandler("view")}
            >
              All
            </button>
          </Link>

          <Link to={"../createNewRecipes"}>
            <button
              className={`flex px-3 py-.5 m-1 rounded-full font-semibold cursor-pointer hover:bg-gray-100 hover:border hover:border-slate-400   ${
                activeButton === "create" ? "bg-slate-100" : "bg-white"
              }`}
              onClick={() => activeButtonHandler("create")}
            >
              <AddIcon className="px-1" />
              New
            </button>
          </Link>
        </div>

        <div className="bg-white flex flex-row justify-between">
          {/* search button tab div */}

          <SearchBar handleOnSearch={handleOnSearch} />
        </div>
        {/* add filter */}
      </nav>

      {isLoading ? (
        <div className="flex justify-center items-center h-[500px] z-30">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="mt-2  table-container h-[590px] overflow-y-auto px-0 md:px-4  ">
          {/*  table and Add item div */}

          <table className="w-full text-center border">
            <thead className="sticky top-0 bg-white text-sm z-10 shadow-md uppercase">
              <tr className="text-gray-800">
                <th className="font-bold  px-4 text-gray-800 hidden md:table-cell">
                  S.No.
                </th>
                <th className="font-bold  px-4 text-gray-800 hidden md:table-cell">
                  Recipe Id
                </th>
                <th className="font-bold  px-4 text-gray-800 ">
                  Recipe Name
                </th>
                <th className="font-bold  px-4 text-gray-800 hidden md:table-cell">
                  Recipe Category
                </th>
                <th className="font-bold  px-4 text-gray-800">
                  Recipe Type
                </th>
                <th className="font-bold  px-4 text-gray-800">Action</th>
                <th className="font-bold  px-4 text-gray-800">More</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal overflow-y-scroll mt-4 bg-white overflow-x-hidden">
              {allRecipe?.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-4  text-xl p-4 bg-gray-100 m-4 "
                  >
                    Oops, the Recipe was not found.
                  </td>
                </tr>
              ) : (
                allRecipe?.map((recipe, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 hidden md:table-cell">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 hidden md:table-cell">
                      {recipe.recipeId}
                    </td>
                    <td className="py-2 px-4 capitalize">
                      {recipe.recipeName}
                    </td>
                    <td className="py-2 px-4 capitalize hidden md:table-cell">
                      {recipe.recipeCategory}
                    </td>
                    <td className="py-2 px-4 capitalize">
                      {recipe.recipeSubCategory}
                    </td>

                    <td className="py-2 px-4">
                      <span className="text-gray-500 hover:text-green-600 p-1 inline-block cursor-pointer  hover:bg-slate-200  hover:rounded-full">
                        <Link
                          to={{
                            pathname: "../createNewRecipes", // Assuming the correct pathname
                            search: `?id=${recipe._id}`, // Pass recipe  id as a query parameter
                          }}
                        >
                          <Tooltip
                            title="Edit recipe "
                            placement="bottom"
                            arrow
                          >
                            <EditIcon />
                          </Tooltip>
                        </Link>
                      </span>{" "}
                      <span
                        className="text-gray-500 hover:text-red-600 p-1 inline-block cursor-pointer  hover:bg-slate-200  hover:rounded-full"
                        onClick={() => handleOnDeleteBtn(recipe._id)}
                      >
                        <Tooltip title="Delete recipe" placement="bottom" arrow>
                          <DeleteOutlineIcon />
                        </Tooltip>
                      </span>{" "}
                    </td>
                    <td className="px-4 py-2 cursor-pointer">
                      <span className=" p-1 inline-block cursor-pointer  hover:bg-slate-200  hover:rounded-full">
                        <Tooltip
                          title="See More Details about Recipe"
                          placement="bottom"
                          arrow
                        >
                          <Link
                            to={{
                              pathname: "seeMoreDetailsOfRecipe",
                              search: `?id=${recipe._id}`, // Pass recipe  id as a query parameter
                            }}
                          >
                            <ContentPasteGoIcon />
                          </Link>
                        </Tooltip>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRecipes;
