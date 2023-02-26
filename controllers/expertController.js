const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Expert = require('./../models/expertModel');

/*________________ GET ALL EXPERTS________________*/
exports.getAllExperts = catchAsync(async (req, res, next) => {
  const experts = await Expert.find();

  res.status(200).json({
    status: 'success',
    data: {
      experts,
    },
  });
});

/*________________ GET EXPERT________________*/
exports.getExpert = catchAsync(async (req, res, next) => {
  const expert = await Expert.findById(req.params.expertId);

  if (!expert) {
    return next(new AppError("expert with this id doesn't exist"));
  }

  res.status(200).json({
    status: 'success',
    data: { expert },
  });
});

/*________________ ADD RATING________________*/
exports.addRating = catchAsync(async (req, res, next) => {
  await Expert.findByIdAndUpdate(
    { _id: req.params.expertId },
    { $push: { ratings: req.body.rate } }
  );

  const ratedExpertInfo = await Expert.findById(req.params.expertId);

  const ratingList = ratedExpertInfo.ratings;

  let numberOfRatings = 0;
  let sumOfRatings = 0;

  ratingList.forEach((element) => {
    sumOfRatings += element;
    numberOfRatings++;
  });

  result = sumOfRatings / numberOfRatings;

  await Expert.findByIdAndUpdate(req.params.expertId, { finalRating: result });

  res.status(200).json({
    status: 'success',
  });
});
