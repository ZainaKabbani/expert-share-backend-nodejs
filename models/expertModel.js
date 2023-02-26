const mongoose = require('mongoose');

const expertSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  image: {
    type: String,
    required: [true, 'the image is required'],
  },
  experience: {
    type: String,
    required: [true, 'the description is required'],
  },
  phone: {
    type: String,
    unique: true,
    dropDups: true,
    required: [true, 'the phone is required'],
  },
  adress: {
    type: String,
    required: [true, 'the adress is required'],
  },
  field: {
    type: String,
    enum: [
      'medical consulting',
      'Professional advice',
      'Psychological counseling',
      'Family counseling',
      'Business consulting',
    ],
    required: [true, 'the adress is required'],
  },
  price: {
    type: Number,
    required: [true, 'the price is required'],
  },
  finalRating: {
    type: Number,
    default: 0.0,
  },
  ratings: {
    type: [Number],
    min: 1,
    max: 5,
  },
});
 
expertSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

expertSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-__v',
  });
  next();
});

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
