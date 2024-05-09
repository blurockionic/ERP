import React from "react";

const LightDetails = ({lightDetails}) => {
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
      {lightDetails?.map((item, index) => (
        <tr key={index} className="border-b border-gray-50 text-center">
          <td className="py-2 px-1">{index + 1}</td>
          <td className="py-2 px-1 capitalize">{item.itemNameLight}</td>
          <td className="py-2 px-1">{item.itemCountForOrderLight}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default LightDetails;
