import React from "react";

const LightDetails = ({lightDetails}) => {
  return (
    <div className="flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
      <div className="bg-white  p-4 w-full">
        <div className="flex justify-between">
        
        </div>
        <div className="grid grid-cols-1">
          <table className="table-auto border-collapse border border-gray-500">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                  Ladi White
                </th>
                <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                  Ladi Blue
                </th>
                <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                  Ladi Yellow
                </th>
                <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                  Ladi Pink
                </th>
                <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                  Ladi Red
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="px-4 py-2 border border-gray-500">
                  {lightDetails?.lights?.ladiWhite}
                </td>
                <td className="px-4 py-2 border border-gray-500">
                  {lightDetails?.lights?.ladiBlue}
                </td>
                <td className="px-4 py-2 border border-gray-500">
                  {lightDetails?.lights?.ladiYellow}
                </td>
                <td className="px-4 py-2 border border-gray-500">
                  {lightDetails?.lights?.ladiPink}
                </td>
                <td className="px-4 py-2 border border-gray-500">
                  {lightDetails?.lights?.ladiRed}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LightDetails;
