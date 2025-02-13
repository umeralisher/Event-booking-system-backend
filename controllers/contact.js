const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    res.status(201).json({
      msg: "Message send successfully!",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error creating contact:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ msg: "No contact messages found." });
    }

    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found." });
    }

    res.status(200).json({ contact });
  } catch (error) {
    console.error("Error fetching contact by ID:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found." });
    }

    res.status(200).json({ msg: "Contact message deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
};
