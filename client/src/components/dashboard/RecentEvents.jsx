import React from 'react';

const events = [
  { date: '2024-07-01', description: 'Order #1234 placed' },
  { date: '2024-07-02', description: 'Order #1235 shipped' },
  { date: '2024-07-03', description: 'Order #1236 delivered' },
];

const RecentEvents = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl  mb-4">Recent Events</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {events.map((event, index) => (
              <tr key={index} className='text-xs'>
                <td className="py-2 px-4 ">{event.date}</td>
                <td className="py-2 px-4">{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEvents;
