const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    // 在 DB 中確認沒有重複的值(email)
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// 在 userSchema 上建立 Pre middleware 將密碼在儲存(save)前處理
UserSchema.pre('save', async function hashPassword() {
  // console.log(this.modifiedPaths()); // 印出目前被修改的欄位
  // console.log(this.isModified('name')); // 印出參數名稱的欄位是否被修改(Boolean)
  // 如果修改的欄位不是密碼，終止繼續執行(使用者不會因為更改非敏感資訊導致密碼被重新加密)
  if (!this.isModified('password')) return;

  // 加密密碼，不建議直接把密碼以明碼存到資料庫
  const salt = await bcrypt.genSalt(10);

  // this 指向目前正被儲存的使用者 document
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function comparePassword(
  candidatePassword,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
