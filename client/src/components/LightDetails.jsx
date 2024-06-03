import React from "react";

const LightDetails = ({ lightDetails }) => {
  return (
    <div className="overflow-x-auto">
      {lightDetails?.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-800">
            <tr className="text-center">
              <th className="py-2 px-4">S.No.</th>
              <th className="py-2 px-4">Item Name</th>
              <th className="py-2 px-4">Item Quantity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lightDetails.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 capitalize">{item.itemNameLight}</td>
                <td className="py-2 px-4">{item.itemCountForOrderLight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-gray-200 border border-gray-300 rounded-md p-4 text-center text-gray-600 font-bold">
          There are no light details available.
        </div>
      )}
    </div>
  );
};

export default LightDetails;
