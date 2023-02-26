const express = require('express');
const authController = require('./../controllers/authController');
const appointmentController = require('./../controllers/appointmentController');

const router = express.Router();

router.get(
  '/expertSchedual',
  authController.protect,
  appointmentController.expertSchedual
);

router.get(
  '/userAppointments',
  authController.protect,
  appointmentController.userAppointment
);

router
  .route('/:expertId')
  .post(authController.protect, appointmentController.makeAppointment);

module.exports = router;
