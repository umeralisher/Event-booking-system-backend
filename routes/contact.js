const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contact");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a contact message (accessible to everyone)
router.post("/create-contact", createContact);

// Get all contacts (admin only)
router.get("/get-contacts", authMiddleware(["admin"]), getAllContacts);

// Delete a contact (admin only)
router.delete("/del-contact/:id", authMiddleware(["admin"]), deleteContact);

module.exports = router;
