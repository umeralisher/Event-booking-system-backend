const express = require("express");
const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getAvailableEvents,
} = require("../controllers/event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get available events (accessible to everyone)
router.get("/available", getAvailableEvents);

// Create a new event (admin only)
router.post("/create-event", authMiddleware(["admin"]), createEvent);

// Get all events (admin only)
router.get("/get-all", authMiddleware(["admin"]), getAllEvents);

// Update an event (admin only)
router.put("/update-event/:id", authMiddleware(["admin"]), updateEvent);

// Delete an event (admin only)
router.delete("/delete-event/:id", authMiddleware(["admin"]), deleteEvent);

module.exports = router;
