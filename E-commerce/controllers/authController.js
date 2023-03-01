const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
  // 檢查 email 是否已經被註冊過
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // 把第一個註冊帳號的使用者設為 admin(管理員)
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // 創造 token
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  // 把使用者 cookie 存入response並回傳
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 檢查是否輸入信箱、密碼
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  // 檢查該使用者是否存在(因為信箱設定成 unique 值，因此可以用來索引)
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  // 使用在 user model 自訂的 method 來比較密碼
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  // 通過驗證後，附上 cookie 並回傳
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.send('logout user');
};

module.exports = {
  register,
  login,
  logout,
};
