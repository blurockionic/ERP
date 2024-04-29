import React from 'react'

const BedingDetails = ({bedingDetails}) => {
  // console.log("bister data ", bedingDetails);
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 text-gray-800 text-center">
          <th className="py-2 px-1">Bed</th>
          <th className="py-2 px-1">Chadar</th>
          <th className="py-2 px-1">Bedsheet</th>
          <th className="py-2 px-1">Blanket</th>
          <th className="py-2 px-1">Pillow</th>
        </tr>
      </thead>
      <tbody className="">
       
          <tr  className="border-b border-gray-50 text-center">
            <td className="py-2 px-1">{bedingDetails.bed}</td>
            <td className="py-2 px-1">{bedingDetails.chadar}</td>
            <td className="py-2 px-1">{bedingDetails.bedsheeet}</td>
            <td className="py-2 px-1">{bedingDetails.blanket}</td>
            <td className="py-2 px-1">{bedingDetails.pillow}</td>
          </tr>
        
      </tbody>
    </table>
  )
}

export default BedingDetails