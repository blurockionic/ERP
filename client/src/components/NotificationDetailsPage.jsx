import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationDetailsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notification data from the database
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications"); // Replace '/api/notifications' with your actual API endpoint
        setNotifications(response.data); // Update state with fetched notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications(); // Call the fetchNotifications function when the component mounts
  }, []);
  const markNotificationAsSeen = (id) => {
    // You can implement the logic to mark the notification as seen here
    // For example, you can make a PATCH request to your backend to update the notification status
    console.log(`Mark notification with ID ${id} as seen`);
  };

  return (
    <>
      <div className="w-[20rem] absolute right-5 top-10 z-50">
        <div className="bg-white shadow-lg p-4">
          <div className="p-4">
            {/* {notifications.map((notification) => ( */}
              <div
                // key={notification.id}
                className={`bg-white shadow-lg p-4 ${
                //   notification.seen
                    // ? "text-gray-600"
                    // : "text-green-700 font-bold"
                    "bg-green-100"
                }`}
              >
                <div className="flex flex-row justify-center">
                  <h1 className="text-xl font-bold text-gray-800 mb-6">
                    Notification Details
                  </h1>
                </div>
                <div className="flex justify-between">
                  {/* <p className="text-gray-600 mb-4">{notification.message}</p> */}
                  <button
                    // onClick={() => markNotificationAsSeen(notification.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-2 rounded-lg"
                  >
                    View
                  </button>
                </div>
              </div>
            {/* ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDetailsPage;
