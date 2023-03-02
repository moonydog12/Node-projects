const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  // 註冊的 cookie 會被存入 req 中
  const { token } = req.signedCookies; // object 解構語法

  // 若送出要求的用戶端不具備 token,擲出一個錯誤
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }

  try {
    const { name, userId, role } = isTokenValid({ token }); // 解構 payload
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};

module.exports = {
  authenticateUser,
};
