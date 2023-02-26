const mongoose = require('mongoose');

const expertFreeTimeSchema = mongoose.Schema({
  expertId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Expert',
  },
  day: {
    type: [String],
    enum: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    required: [true, 'the day is required'],
  },
  startTime: {
    type: [Number],
    required: [true, 'the start time is required'],
  },
  endTime: {
    type: [Number],
    required: [true, 'the end time is required'],   
  },
});

const ExpertFreeTime = mongoose.model('ExpertFreeTime', expertFreeTimeSchema);

module.exports = ExpertFreeTime;
