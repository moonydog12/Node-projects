// User Schema
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  // Check mongoose doc
  name: {
    type: String,
    required: [true, '請提供姓名'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, '請提供信箱'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '請提供有效的信箱',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, '請提供密碼'],
    minLength: 6,
  },
});

// Mongoose middleware
// 將原本寫在 controller 中的加密功能移到這裡
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);

  // this 指向該筆 document
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  // generate token
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
