const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'doctor', 
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'patient', 
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'canceled', 'pending'],
    default: 'scheduled',
  },
  reason: {
    type: String,
    required: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
