const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require('../../repos/user-repo');
const pool = require('../../pool');
require('dotenv').config({ path: __dirname + '/./../../../.env' });
console.log(process.env.DBpassword);

// 開始測試前先連上server
beforeAll(() => {
  return pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork-test',
    user: 'postgres',
    password: process.env.DBpassword,
  });
});

// 完成測試後將server斷線
afterAll(() => {
  return pool.close();
});

it('create a user', async () => {
  const startingCount = await UserRepo.count();

  await request(buildApp())
    .post('/users')
    .send({ username: 'testUser', bio: 'test bio' })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
