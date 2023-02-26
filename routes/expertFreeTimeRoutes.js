const express = require('express');
const expertFreeTimeController = require('./../controllers/expertFreeTimeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/:expertId')
  .get(authController.protect, expertFreeTimeController.getExpertFreeTime);

module.exports = router;
