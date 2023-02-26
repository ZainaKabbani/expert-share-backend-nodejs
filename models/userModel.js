const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the user name is required'],
  },
  email: {
    type: String,
    unique: true,
    dropDups: true,
    required: [true, 'Please enter your email'],
    validate: [validator.isEmail, 'this is not a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your Password'],
    select: false,
  },
  wallet: Number,
  role: {
    type: String,
    enum: ['user', 'expert'],
    required: [true, 'Please enter your role'],
  },
  favorite: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Expert',
    },
  ],
});

userSchema.virtual('expert', {
  ref: 'Expert',
  foreignField: 'userId',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (
  condidatePassword,
  userPassword
) {
  return await bcrypt.compare(condidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
