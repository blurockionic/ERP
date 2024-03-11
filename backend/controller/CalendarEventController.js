import { Calendar } from "../model/CalendarEvent.js";

export const CalendarEventController = async (req, res) => {
  try {
    const { title, start, end } = req.body;

    // validation required
    if (!title || !start || !end) {
      return res.status(400).json({
        success: false,
        message: "Please provide Title, start and end Date And time ",
      });
    }

    // create Event on calendar
    const newEvent = new Calendar({
      eventTitle: title,
      eventStartingDate: start,
      eventEndingDate: end,
    });

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Calendar Event created successfully.",
      Calendar: newEvent,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};