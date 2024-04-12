import React from 'react'

const BistarDetails = ({bistarDetails}) => {
  // console.log("bister data ", bistarDetails);
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
            <td className="py-2 px-1">{bistarDetails.bed}</td>
            <td className="py-2 px-1">{bistarDetails.chadar}</td>
            <td className="py-2 px-1">{bistarDetails.bedsheeet}</td>
            <td className="py-2 px-1">{bistarDetails.blanket}</td>
            <td className="py-2 px-1">{bistarDetails.pillow}</td>
          </tr>
        
      </tbody>
    </table>
  )
}

export default BistarDetails