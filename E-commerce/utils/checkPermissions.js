const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
  // 管理員(admin)能讀取所有資料
  if (requestUser.role === 'admin') return;

  // 使用者(user)只能讀取自己的資料
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError('No authorized to access this route');
};

module.exports = checkPermissions;
