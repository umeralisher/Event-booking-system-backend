const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // Event reference
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
