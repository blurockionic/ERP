import React, { memo } from "react";

const TentDetails = ({ tentDetails }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md ">
      {tentDetails?.itemList?.length > 0 ? (
        <>
          <div className="mb-4">
            <span className="block text-lg font-medium text-gray-700 mx-6">
              Tent Area:
              <span className="font-normal text-gray-600">
                {tentDetails.tentArea || "N/A"}
              </span>
              (SqFeet)
            </span>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-center text-gray-800">
                <th className="py-2 px-4 font-medium">S No.</th>
                <th className="py-2 px-4 font-medium">Item Name</th>
                <th className="py-2 px-4 font-medium">Item Count</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tentDetails.itemList.map((item, index) => (
                <tr key={item._id || index}>
                  <td className="py-2 px-4 text-center text-gray-700">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 text-center text-gray-700">
                    {item.itemNameTent ?? "N/A"}
                  </td>
                  <td className="py-2 px-4 text-center text-gray-700">
                    {item.itemCountForOrderTent ?? "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="bg-gray-200 border border-gray-300 rounded-md p-4 text-center text-gray-600 font-bold">
          There are no tent details available.
        </div>
      )}
    </div>
  );
};

export default memo(TentDetails);
