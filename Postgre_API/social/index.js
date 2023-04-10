const app = require('./src/app');
const pool = require('./src/pool');
require('dotenv').config();

pool
  .connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork',
    user: 'postgres',
    password: process.env.DBpassword,
  })
  .then(() => {
    app().listen(3000, () => {
      console.log('Listening on port 3000');
    });
  })
  .catch((err) => console.log(err));