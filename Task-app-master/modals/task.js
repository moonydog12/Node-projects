const mongoose = require('mongoose');

// 設定資料庫 Schema(資料的結構)
const TaskSchema = new mongoose.Schema({
  // 新增簡易驗證
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 chars'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
