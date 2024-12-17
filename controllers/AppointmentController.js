const appointment = require("../models/Appointment")

const CreateAppointment = async (req, res) => {
    try {
      const { doctor, patient, appointmentDate, reason } = req.body;
  
      // Create the appointment
      const newAppointment = new appointment({
        doctor,
        patient,
        appointmentDate,
        reason,
      });
  
      await newAppointment.save();
  
      res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create appointment' });
    }
  };
  
  module.exports = { CreateAppointment };