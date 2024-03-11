import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
    },

    eventTitle: {
      type: String,
    },
    eventStartingDate: {
      type: String,
    },
    eventEndingDate: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
export const Calendar = mongoose.model("calendar", calendarEventSchema);
