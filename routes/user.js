const express = require("express");
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user (accessible to everyone)
router.post("/register", registerUser);

// Login user (accessible to everyone)
router.post("/login", loginUser);

// Get all users (admin only)
router.get("/all-users", authMiddleware(["admin"]), getAllUsers);

// Update user (admin only)
router.put("/update/:id", authMiddleware(["admin"]), updateUser);

// Delete user (admin only)
router.delete("/delete/:id", authMiddleware(["admin"]), deleteUser);

module.exports = router;
