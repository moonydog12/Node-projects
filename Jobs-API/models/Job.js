const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, '請提供公司名稱'],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, '請提供職位'],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      // 每次新增工作時，把它 assign 給一位 user
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, '請提供使用者'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
