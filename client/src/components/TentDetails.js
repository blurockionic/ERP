import React from "react";

const TentDetails = ({ tentDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="py-2 px-4">Item Name</th>
            <th className="py-2 px-4">Item Count</th>
            <th className="py-2 px-4">Area</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tentDetails?.itemList?.map((item, index) => (
            <tr key={item._id || index}>
              <td className="py-2 px-4 text-center">{item.itemNameTent ?? "N/A"}</td>
              <td className="py-2 px-4 text-center">{item.itemCountForOrderTent ?? "N/A"}</td>
              <td className="py-2 px-4 text-center">{tentDetails.tentArea || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TentDetails;
