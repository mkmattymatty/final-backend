const Appointment = require("../models/Appointment");

// Book new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { department, date, time } = req.body;
    const userId = req.user.id; // From middleware auth

    const newAppointment = new Appointment({
      user: userId,
      department,
      date,
      time,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

// Get all appointments for a logged-in user
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ user: userId }).populate("department");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};
