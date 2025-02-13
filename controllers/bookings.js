const Booking = require("../models/booking");
const Event = require("../models/Events");
const User = require("../models/User");

// Create Booking
createBooking = async (req, res) => {
  try {
    const { eventId, userEmail, totalAmount, paymentStatus } = req.body;

    if (!eventId || !userEmail || !totalAmount) {
      return res
        .status(400)
        .json({ msg: "Please fill in all required fields." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event not found." });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const newBooking = new Booking({
      event: eventId,
      user: user._id, // Use user ID
      totalAmount,
      paymentStatus,
    });

    await newBooking.save();

    event.status = "upcoming";
    await event.save();

    res
      .status(201)
      .json({ msg: "Booking created successfully!", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};
// Update Booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, totalAmount } = req.body;

    // Validate the update fields
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (totalAmount) updateData.totalAmount = totalAmount;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ msg: "No valid fields to update!" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ msg: "Booking not found!" });
    }

    res
      .status(200)
      .json({ booking: updatedBooking, msg: "Booking updated successfully!" });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("user", "email name")
      .populate("event", "title date description");

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.status(200).json({ data: booking });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ msg: "Invalid booking ID" });
    }
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const bookings = await Booking.find()
      .populate("user", "email name")
      .populate("event", "title date")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Booking.countDocuments();

    res.status(200).json({
      bookings,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// Get Booking by User
const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId }).populate(
      "event user"
    );

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found for this user!" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ msg: "Booking not found!" });
    }

    res
      .status(200)
      .json({ booking: deletedBooking, msg: "Booking deleted successfully!" });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getAllBookings,
  getBookingsByUser,
  deleteBooking,
  getBookingById,
};
