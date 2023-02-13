// 載入 mongoose Schema
const Task = require('../modals/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  // mongoose api:find()提供空物件作為參數時，回傳所有資料
  const tasks = await Task.find({});

  // 其他 api 回應的格式(style)
  // 當決定使用其中一種格式後，其他 controller api也應該保持一致
  // res.status(200).json({ tasks, amount: tasks.length });

  // res
  //   .status(200)
  //   .json({ status: 'success', data: { tasks, nbHits: tasks.length } });
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}.`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}.`, 404));
  }

  // 回傳資料庫中，被刪除資料的資訊，
  // res.status(200).json({ task });
  // res.status(200).send();

  // 另一常見的做法是回傳資訊，告訴使用者是否刪除成功(不回傳資料庫資料)
  res.status(200).json({ task: null, status: 'success' });
});

const updateTask = asyncWrapper(async (req, res) => {
  // 更新需要提供 id、更新內容
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}.`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
