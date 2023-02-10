// 檢查使用者名稱，密碼(post request)
// 使用者通過驗證(存在)，製造一個新的JWT(JSON web Token)
// 傳送 token 到前端
// 設定驗證機制(authentication)，只有擁有JWT的要求能連線到dashboard
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  // 在controller中進行驗證
  if (!username || !password) {
    throw new CustomAPIError('Emil and password are required,you idiot!', 400);
  }

  // 測試功能，通常id會由資料庫端取得
  const id = new Date().getDate();

  // payload內容不該過大，會影響使用者
  // 測試功能用，在撰寫驗證機制時，Signature要使用複雜、不容易被猜到的字串
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({
    msg: 'User created',
    token,
  });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100 + 1);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
};

module.exports = {
  login,
  dashboard,
};
