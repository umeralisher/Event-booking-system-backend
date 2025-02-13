const Event = require("../models/Events");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      capacity,
      price,
      category,
      status,
      image,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !capacity ||
      !price ||
      !category ||
      !image
    ) {
      return res
        .status(400)
        .json({ msg: "All required fields must be filled!" });
    }

    const imageRegex = /^data:image\/(png|jpg|jpeg);base64,/;
    if (!imageRegex.test(image)) {
      return res.status(400).json({
        msg: "Invalid image format. Please upload a valid PNG, JPG, or JPEG image.",
      });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const base64Data = image.split(",")[1];
    const imageSize = Buffer.from(base64Data, "base64").length;

    if (imageSize > maxSize) {
      return res.status(400).json({ msg: "Image size exceeds the 5MB limit." });
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      price,
      category,
      status,
      image,
    });

    res
      .status(201)
      .json({ msg: "Event created successfully!", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

const getAvailableEvents = async (req, res) => {
  try {
    const availableEvents = await Event.find({ status: "available" });

    if (!availableEvents || availableEvents.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No available events found." });
    }

    res.status(200).json({ success: true, events: availableEvents });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      date,
      location,
      capacity,
      price,
      category,
      image,
      status,
    } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        location,
        capacity,
        price,
        category,
        image,
        status,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ msg: "Event not found!" });
    }

    res.status(200).json({ event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ msg: "Event not found!" });
    }

    res.status(200).json({ msg: "Event deleted successfully!" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  deleteEvent,
  getAvailableEvents,
};
