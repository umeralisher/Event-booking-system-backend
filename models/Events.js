const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Concert", "Conference", "Workshop", "Meetup"],
    required: true,
  },
  image: { type: String },
  status: {
    type: String,
    enum: ["upcoming", "available", "ongoing", "completed", "cancelled"],
    default: "upcoming",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
