const taskIdDom = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showTask = async () => {
  try {
    const response = await fetch(`/api/v1/tasks/${id}`);
    const { task } = await response.json();
    const { _id: taskID, completed, name } = task;
    taskIdDom.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...';
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;

    const info = { name: taskName, completed: taskCompleted };
    const response = await fetch(`/api/v1/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });

    const data = await response.json();
    const { task } = data;
    const { _id: taskID, completed, name } = task;

    taskIdDom.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'success, edited task';
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = 'error, please try again';
  }
  editBtnDOM.textContent = 'Edit';
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
