const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const ExpertFreeTime = require('./../models/expertFreeTimeModel');


/* ____________ GET EXPERT FREE TIME ____________ */
exports.getExpertFreeTime = catchAsync(async (req, res, next) => {
  const expertFreeTime = await ExpertFreeTime.find({
    expertId: req.params.expertId,
  });
  console.log(expertFreeTime);
  if (expertFreeTime.length === 0) {
    return next(new AppError('There is no expert with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      expertFreeTime,
    },
  });
});
