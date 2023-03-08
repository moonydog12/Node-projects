// 環境變數
require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');

const app = express();

// packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

// middleware(會依據順序執行，因此須根據程式邏輯進行排列)
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json()); // automatically parse incoming json into object
app.use(cookieParser(process.env.JWT_SECRET));

// 上傳圖片
app.use(express.static('./public'));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('e-commerce API');
});

app.get('/api/v1', (req, res) => {
  res.send('e-commerce API');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFoundMiddleware); // 處理無效路由
app.use(errorHandlerMiddleware); // 處理路由擲出的錯誤

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();
