import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./customCalendarStyles.css";
import EventModal from "./EventModel.js";
import axios from "axios";
import config from "../../../config/config.js";

const localizer = momentLocalizer(moment);

const OrderCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetching all orders for the calendar
  useEffect(() => {
    const fetchAllBistarOrder = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/customer/all`, {
          withCredentials: true,
        });

        // Extract relevant data from the response
        const { customers } = response.data;

        // Define an array of predefined colors
        const predefinedColors = [
          "#FFB6C1", // Light Pink
          "#FFDAB9", // Peach Puff
          "#AFEEEE", // Pale Turquoise
          "#C8B6FF",
          "#FFA07A", // Light Salmon
          "#ADD8E8", // Light Blue
          "#80ed99",
          "#c6ac8f",
          "#c9e4ca",
        ];

        // Map the customer data to events format
        const eventDetails = customers.map((customer, index) => {
          const customerName = customer.customerName || `Customer ${index + 1}`;
          // Parse the dateAndTime string to create Date objects
          const startDate = new Date(customer.dateAndTime);
          const endDate = new Date(customer.dateAndTime);
          endDate.setHours(endDate.getHours() + 3);

          // JSX elements representing ordered items
          const orderedItems = [];
          if (customer.isLightOrdered) {
            orderedItems.push(
              <span key="light" className="bg-yellow-100 p-1 mx-1 rounded-lg">
                Light
              </span>
            );
          }
          if (customer.isTentOrdered) {
            orderedItems.push(
              <span key="tent" className="bg-green-100 p-1  mx-1 rounded-lg">
                Tent
              </span>
            );
          }
          if (customer.isDecorationOrdered) {
            orderedItems.push(
              <span
                key="decoration"
                className="bg-slate-100 p-1   mx-1 rounded-lg"
              >
                Decoration
              </span>
            );
          }
          if (customer.isBistarOrdered) {
            orderedItems.push(
              <span key="bistar" className="bg-blue-100 p-1 mx-1  rounded-lg">
                Bistar
              </span>
            );
          }
          if (customer.isCateringOrdered) {
            orderedItems.push(
              <span key="catering" className="bg-red-100 p-1 mx-1 rounded-lg">
                Catering
              </span>
            );
          }

          return {
            id: customer._id, // Assuming _id is unique
            title: (
              <>
                {customerName}
                {orderedItems} {/* Include ordered items */}
              </>
            ),

            start: startDate,
            end: endDate,
            customerData: customer, // Optionally, you can store the entire customer data for future reference
            color: predefinedColors[index % predefinedColors.length], // Assign colors from the predefined array
            // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color for each event
          };
        });

        setEvents(eventDetails);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Fetch orders when component mounts
    fetchAllBistarOrder();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    // console.log(event.customerData?.customerName);
  };

  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setSelectedEvent(newEvent); // Set selectedEvent when a slot is selected
    setShowModal(true);
  };

  const handleSaveEvent = (newEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...newEvent } : event
        )
      );
    } else {
      // Add new event
      const newEventWithId = { ...newEvent, id: events.length + 1 };
      setEvents((prevEvents) => [...prevEvents, newEventWithId]);
    }

    setShowModal(false);
    setSelectedEvent(null);
  };

  console.log("event sed ho raha h ki nii ", events);
  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 600 }}
        className="custom-calendar" // Apply custom CSS class to the calendar component
        dayLayoutAlgorithm="no-overlap" // Ensure each day is rendered individually without overlapping with others
        eventPropGetter={(event, start, end, isSelected) => ({
          style: {
            backgroundColor: event.color || "#ffd6ff", // Custom background color or default color
            borderRadius: "5px", // Custom border radius
            color: "black", // Custom text color
            fontWeight: "bold", // Bold text
          },
        })}

        dayPropGetter={(date) => {
          // Check if the date is Saturday or Sunday
          const dayOfWeek = date.getDay();
          if (dayOfWeek === 6) {
            return {
              className: 'custom-sat' // Add custom class for Saturday
            };
          }
          if (dayOfWeek === 0) {
            return {
              className: 'custom-sun' // Add custom class for Sunday
            };
          }
        }}


        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => handleSelectEvent(event)} // Pass the event object
      />
      {/* {showModal && (
        <EventModal
          event={selectedEvent}
          date={selectedDate}
          onSave={handleSaveEvent}
          onClose={() => setShowModal(false)}
        />
      )} */}
    </>
  );
};

export default OrderCalendar;
