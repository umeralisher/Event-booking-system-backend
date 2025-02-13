const express = require("express");
const {
  createBooking,
  updateBooking,
  getAllBookings,
  getBookingsByUser,
  deleteBooking,
  getBookingById,
} = require("../controllers/bookings");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Booking (accessible to everyone)
router.post("/create-booking", createBooking);

// Update Booking (admin only)
router.put("/update-booking/:id", authMiddleware(["admin"]), updateBooking);

// Get All Bookings (admin only)
router.get("/get-all", authMiddleware(["admin"]), getAllBookings);

// Get Booking by ID (admin only)
router.get("/booking/:id", authMiddleware(["admin"]), getBookingById);

// Get Bookings by User (accessible to everyone with valid token)
router.get(
  "/user/:userId",
  authMiddleware(["user", "admin"]),
  getBookingsByUser
);

// Delete Booking (admin only)
router.delete("/delete/:id", authMiddleware(["admin"]), deleteBooking);

module.exports = router;
