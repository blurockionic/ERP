import React from "react";

const BedingDetails = ({ bedingDetails }) => {
  // console.log("bister data ", bedingDetails);
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 text-gray-800 text-center">
          <th className="py-2 px-1">S.No.</th>
          <th className="py-2 px-1">Item Name</th>
          <th className="py-2 px-1">Item Quantity</th>
        </tr>
      </thead>
      <tbody>
        {bedingDetails?.map((item, index) => (
          <tr key={index} className="border-b border-gray-50 text-center">
            <td className="py-2 px-1">{index + 1}</td>
            <td className="py-2 px-1">{item.itemNameBistar}</td>
            <td className="py-2 px-1">{item.itemCountForOrderBistar}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BedingDetails;
