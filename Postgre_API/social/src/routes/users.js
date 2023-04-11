const express = require('express');
const UserRepo = require('../repos/user-repo');

const router = express.Router();

router.get('/users', async (req, res) => {
  // 執行query取得所有使用者的資料
  const users = await UserRepo.find();

  // 傳送資料給client端
  res.send(users);
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserRepo.findById(id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.post('/users', async (req, res) => {});

router.put('/users/:id', async (req, res) => {});

router.delete('/users/:id', async (req, res) => {});

module.exports = router;
