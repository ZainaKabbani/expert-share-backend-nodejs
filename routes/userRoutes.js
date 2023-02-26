const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signupAsUser', authController.signupAsUser);
router.post('/signupAsExpert', authController.signupAsExpert);
router.post('/login', authController.login);

router.get('/checkRole', authController.protect, userController.checkRole);

router.get('/wallet', authController.protect, userController.getWallet);

router.post('/pay/:expertId', authController.protect, userController.pay);

router.get('/favorite', authController.protect, userController.getFavorite);
router.post(
  '/addToFavorite',
  authController.protect,
  userController.addToFavorite
);
router.post(
  '/removeFromFavorite/:expertId',
  authController.protect,
  userController.removeFromFavorite
);

module.exports = router;
