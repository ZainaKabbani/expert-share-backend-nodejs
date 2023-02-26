const jwt = require('jsonwebtoken');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const User = require('./../models/userModel');
const Expert = require('./../models/expertModel');
const ExpertFreeTime = require('./../models/expertFreeTimeModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

/* ____________ PROTECT ____________ */
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, please login to get access', 401)
    );
  }

  // VARIFICATION TOKEN
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // GET THE CURRENT USER WITH THAT TOKEN
  const currentUser = await User.findById(decoded.id);

  req.user = currentUser;

  next();
});

/* ____________ SIGN UP AS USER ____________ */
exports.signupAsUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    wallet: 30000,
    role: 'user',
  });
  res.status(201).json({
    status: 'success',
    user: newUser,
  });
});

/* ____________ SIGN UP AS EXPERT ____________ */
exports.signupAsExpert = catchAsync(async (req, res, next) => {
  const newUserData = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    wallet: 30000,
    role: 'expert',
  });

  const newExpertData = await Expert.create({
    userId: newUserData._id,
    image: req.body.image,
    experience: req.body.experience,
    phone: req.body.phone,
    adress: req.body.adress,
    field: req.body.field,
    price: req.body.price,
  });

  const newExpertFreeTimeData = await ExpertFreeTime.create({
    expertId: newExpertData._id,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  res.status(201).json({
    status: 'success',
    expert: {
      newUserData,
      newExpertData,
      newExpertFreeTimeData,
    },
  });
});

/* ____________ LOGIN USER ____________ */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // CHECK IF THE EMAIL AND THE PASSWORD EXIST
  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }

  // CHECK IF THE USER EXIST AND THE PASSWORD IS CORRECT
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incoorrect email or password', 401));
  }

  // CREATE TOKEN
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
