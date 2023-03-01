// 環境變數
require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');

const app = express();

// packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');

// middleware(會依據順序執行，因此須根據程式邏輯進行排列)
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json()); // automatically parse incoming json into object
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req, res) => {
  res.send('e-commerce API');
});

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies);
  res.send('e-commerce API');
});

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware); // 處理無效路由
app.use(errorHandlerMiddleware); // 處理路由擲出的錯誤

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
