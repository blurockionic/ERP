import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModel.js";

const localizer = momentLocalizer(moment);



const OrderCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setSelectedEvent(newEvent); // Set selectedEvent when a slot is selected
    setSelectedDate(slotInfo.start); // Set selectedDate
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
    setSelectedDate(null);
  };

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 600, 
        width: "85%" ,  }}
      
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
      {showModal && (
        <EventModal
          event={selectedEvent}
          date={selectedDate}
          onSave={handleSaveEvent}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default OrderCalendar;
