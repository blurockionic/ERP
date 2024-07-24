import React from "react";

const RecentEvents = ({ recentEvent }) => {
  return (
    <>
      <div className="p-4">
        <h2 className="text-xl  mb-4">Recent Events</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="py-2 px-1 text-left">S.No.</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {recentEvent.length > 0 ? (
                recentEvent.map((event, index) => (
                  <tr key={index} className="text-xs">
                    <td className="py-2 px-4 capitalize">{index + 1}</td>
                    <td className="py-2 px-4 capitalize">{event.customerName}</td>
                    <td className="py-2 px-4 capitalize">{event.orderStatus}</td>
                  </tr>
                ))
              ) : (
                <tr className="w-full">
                  <td className="py-2 px-4 text-center bg-gray-50 m-2" colSpan={2}>Recent event not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecentEvents;
