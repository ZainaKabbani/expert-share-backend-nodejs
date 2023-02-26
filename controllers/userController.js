const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Expert = require('../models/expertModel');
const User = require('../models/userModel');

/*________________ CHECK ROLE ________________*/
exports.checkRole = (req, res, next) => {
  const userRole = req.user.role;

  res.status(200).json({
    status: 'success',
    userRole,
  });
};

/*________________ PAY ________________*/
exports.pay = catchAsync(async (req, res, next) => {
  const userWallet = req.user.wallet; // THE WALLET OF THE USER

  const expert = await Expert.findById(req.params.expertId); // THE EXPERT
  const expertWallet = expert.userId.wallet; // THE WALLET OF THE EXPERT

  const expertPrice = expert.price; // THE PRICE OF THE EXPERT

  if (req.user.id === expert.userId.id) {
    return next(new AppError('You are trying to pay for yourself', 404));
  }

  await User.findByIdAndUpdate(req.user.id, {
    wallet: userWallet - expertPrice,
  });
  await User.findByIdAndUpdate(expert.userId.id, {
    wallet: expertWallet + expertPrice,
  });

  res.status(200).json({
    status: 'success',
  });
});

/*________________ ADD TO FAVORITE  ________________*/
exports.addToFavorite = catchAsync(async (req, res, next) => {
  const isExist = await User.find({
    _id: req.user.id,
    favorite: req.body.expertId,
  });

  if (isExist.length > 0) {
    return next(new AppError('This expert is already exist', 404));
  }

  const user = await User.findByIdAndUpdate(
    { _id: req.user.id },
    { $push: { favorite: req.body.expertId } }
  );

  res.status(200).json({
    status: 'success',
  });
});

/*________________ REMOVE FROM FAVORITE  ________________*/
exports.removeFromFavorite = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      favorite: req.params.expertId,
    },
  });

  res.status(200).json({
    status: 'success',
  });
});

/*________________ GET FAVORITE  ________________*/
exports.getFavorite = catchAsync(async (req, res, next) => {
  const userFavorite = await User.findById(req.user.id)
    .select('favorite')
    .populate({ path: 'favorite' });

  res.status(200).json({
    status: 'success',
    data: userFavorite,
  });
});

/*________________ GET WALLET  ________________*/
exports.getWallet = (req, res, next) => {
  const walletValue = req.user.wallet;

  res.status(200).json({
    status: 'success',
    data: walletValue,
  });
};
