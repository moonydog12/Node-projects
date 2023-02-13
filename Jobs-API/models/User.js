// User Schema
const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', UserSchema);
