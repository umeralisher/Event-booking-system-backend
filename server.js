require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dBConnect = require("./db/dbconfig");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/booking");
const contactRoutes = require("./routes/contact");

const app = express();
const port = process.env.PORT || 8000;

// Connect to Database
dBConnect();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/contact", contactRoutes);

// Default Route
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// Error Handling
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.use((err, req, res) => {
  console.error("Internal Server Error:", err.message);
  res.status(500).json({ msg: "Internal Server Error" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
