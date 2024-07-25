import { memo } from "react";
import React,  { useEffect, useState } from "react";
import Loader from "./Loader";

const CateringDetails = ({ cateringDetails }) => {
  const [isLoading, setIsLoading] = useState(false);

 
  useEffect(() => {
    if (!cateringDetails) {
      setIsLoading(true);
    }
    setIsLoading(false);
  }, [cateringDetails]);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px] z-30">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          {cateringDetails?.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meal Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meal Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    People Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Selected Beverages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cateringDetails.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex flex-col ">
                        <span className="font-semibold mb-2">
                          Meal {index + 1}
                        </span>
                        <span className="font-bold text-lg capitalize">
                          {order.mealType ?? "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.mealTime ?? "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.peopleCount ?? "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      <ul className="list-disc list-inside">
                        {order.recipe.map((item, recipeIndex) => (
                          <li key={recipeIndex} className="text-sm">
                            {item ?? "N/A"}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      <ul className="list-disc list-inside">
                        {order.selectedBeverages.map((item, beverageIndex) => (
                          <li key={beverageIndex} className="text-sm">
                            {item ?? "N/A"}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-gray-200 border border-gray-300 rounded-md p-4 text-center text-gray-600 font-bold">
              There are no catering details.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default memo(CateringDetails);
