import React from "react";

const TentDetails = ({ tentDetails }) => {
  console.log(tentDetails);
  return (
    <div>

<div className="flex flex-row  ">
              {tentDetails?.tentArea ? (
                <h2 className="text-xl font-semibold mb-2">
                  Tent Area:{" "}
                  <span className="text-lg">
                    {tentDetails?.tentArea} (Sq Feet)
                  </span>
                </h2>
              ) : (
                <p className="text-red-500">
                  No tent area information available
                </p>
              )}
            </div>

      <div>
       tent area {tentDetails?.tentArea}
      </div>

    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 text-gray-800 text-center">
          <th className="py-2 px-1">S.No.</th>
          <th className="py-2 px-1">Item Name</th>
          <th className="py-2 px-1">Item Quantity</th>
        </tr>
      </thead>
      <tbody>
        {tentDetails?.itemList?.map((item, index) => (
          <tr key={index} className="border-b border-gray-50 text-center">
            <td className="py-2 px-1">{index + 1}</td>
            <td className="py-2 px-1 capitalize">{item.itemNameTent}</td>
            <td className="py-2 px-1">{item.itemCountForOrderTent}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TentDetails;
