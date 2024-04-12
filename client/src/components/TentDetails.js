import React from "react";

const TentDetails = ({ tentDetails }) => {
  return (
   
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            {tentDetails?.orderedItems?.map((item) => (
              <th className="py-auto px-auto">{item}</th>
            ))}
            <th className="py-auto px-auto">Area</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          <tr>
            {tentDetails?.orderedItemsCount?.map((item) => (
              <td className="py-2 px-4 text-center">{item}</td>
            ))}
            <td className="py-2 px-4">{tentDetails?.area}</td>
          </tr>
        </tbody>
      </table>
     
    
  );
};

export default TentDetails;
