const express = require('express');
const expertController = require('./../controllers/expertController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(expertController.getAllExperts);

router.route('/:expertId').get(expertController.getExpert);

router.post(
  '/addRating/:expertId',
  authController.protect,
  expertController.addRating
);

module.exports = router;
