const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  expertId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Expert',
  },
  day: String,
  startTime: Number,
  endTime: Number,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
