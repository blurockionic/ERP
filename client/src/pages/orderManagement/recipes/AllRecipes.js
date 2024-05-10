import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import SearchBar from '../../../components/SearchBar'
import { Link } from 'react-router-dom'

import AddIcon from "@mui/icons-material/Add";

const AllRecipes = () => {

  const [activeButton, setActiveButton] = useState("view")
  const activeButtonHandler =(btn)=> {
    setActiveButton(btn)
    

  }

  return (
      
    <div className=' relative w-full bg-gray-50'>
      <Toaster/>
      <nav className="bg-gray-100 flex flex-row justify-between border-b-2">
        {/* order and create order button */}
        <div className="flex items-center">
          <Link>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer  ${
                activeButton === "view" ? "bg-gray-300" : "bg-white"
              }`}
              onClick={()=>activeButtonHandler ("view")}
            >
              All Recipes
            </button>
          </Link>

          <Link to={"../createNewRecipes"}>
            <button
              className={`px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer hover:bg-gray-100  ${
                activeButton === "create" ? "bg-slate-100" : "bg-white"
              }`}
              onClick={()=>activeButtonHandler ("create")}
            >
              <AddIcon className="px-1" />
              Create Recipe
            </button>
          </Link>
         
        </div>

        <div className="bg-gray-100 flex flex-row justify-between">
          {/* search button tab div */}

          <SearchBar  />
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
                  <th className="font-bold py-2 px-4 text-gray-600">Recipe Code</th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                    Recipe Name
                  </th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                    Recipe Category
                  </th>
                  <th className="font-bold py-2 px-4 text-gray-600">
                   Recipe Type
                  </th>
                
                </tr>
              </thead>
              <tbody className="text-sm font-normal overflow-y-scroll mt-4 bg-white overflow-x-hidden">
                {0 === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center py-4  text-xl p-4 bg-gray-100 m-4 "
                    >
                      Opps, the Recipe was not found.
                    </td>
                  </tr>
                ) : (
                 <div></div>
                )}
              </tbody>
            </table>
          </div>
        </div>


      </div>
  )
}

export default AllRecipes