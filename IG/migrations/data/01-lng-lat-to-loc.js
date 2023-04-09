const pg = require('pg');
require('dotenv').config({ path: (__dirname, '../../.env') });

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'postgres',
  password: process.env.DBpassword,
});

pool
  .query(
    `
  UPDATE posts
  SET loc = POINT(lng, lat)
  WHERE loc IS NULL;
`
  )
  .then(() => {
    console.log('Update complete');
    pool.end();
  })
  .catch((err) => {
    console.log(err.message);
  });
