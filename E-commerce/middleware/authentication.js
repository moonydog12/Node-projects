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
    // 取得從 cookie 拿到的使用者資訊(payload)
    const { name, userId, role } = isTokenValid({ token }); // 解構 payload
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};

// note: 因為authorizePermission會在 middleware 被調用(invoked)，回傳一個新函式內含express所需參數 req,res,next
// ，所以不會擲出錯誤
const authorizePermissions = (...roles) => (req, res, next) => {
  // 檢查 userToken 的 role 特性是否包含在 roles 陣列
  if (!roles.includes(req.user.role)) {
    throw new CustomError.UnauthorizedError(
      'Unauthorized to access this route',
    );
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
