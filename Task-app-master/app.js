// 建立 express server
const express = require('express');

const app = express();

const cors = require('cors');
// 引入 router
const tasks = require('./routes/tasks');

// 連接資料庫
const connectDB = require('./db/connect');
require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

// 路由設定
app.use(cors({ origin: '*' }));
app.use('/api/v1/tasks', tasks);

// custom middleware
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

// 確認DB連接成功，然後啟動後端功能
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
