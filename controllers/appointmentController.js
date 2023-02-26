const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Appointment = require('./../models/appointmentModel');
const Expert = require('./../models/expertModel');

/* ____________ MAKE APPOINTMENT ____________ */
exports.makeAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.find({
    userId: req.user.id,
    expertId: req.params.expertId,
  });

  if (appointment.length > 0) {
    return next(new AppError('you already booked this appointment', 404));
  }

  const newAppointment = await Appointment.create({
    userId: req.user.id,
    expertId: req.params.expertId,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  res.status(201).json({
    status: 'success',
    appointment: newAppointment,
  });
});

/* ____________ EXPERT SCHEDUAL ____________ */
exports.expertSchedual = catchAsync(async (req, res, next) => {
  if (req.user.role === 'user') {
    return next(new AppError('Your not allowed to access', 404));
  }

  const expert = await Expert.find({ userId: req.user.id });
  const expertSchedual = await Appointment.find({
    expertId: expert[0]._id,
  }).populate({
    path: 'userId',
    select: '-__v',
  });

  res.status(200).json({
    status: 'success',
    data: expertSchedual,
  });
});

/* ____________ USER APPOINTMENT ____________ */
exports.userAppointment = catchAsync(async (req, res, next) => {
  const result = await Appointment.find({
    userId: req.user.id,
  }).populate({
    path: 'expertId',
    select: '-__v',
  });

  res.status(200).json({
    status: 'success',
    data: result
  });
});
