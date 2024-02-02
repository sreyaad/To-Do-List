const form = document.querySelector('.add-task-form');
const input = document.querySelector('.add-task-input');
const taskList = document.querySelector('.task-list');

let tasks = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value) return;

  const task = {
    id: Date.now(),
    text: input.value,
    completed: false,
  };

  tasks.push(task);
  input.value = '';
  saveTasks();
  renderTasks();
});

taskList.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    const taskId = e.target.parentElement.dataset.id;
    const task = tasks.find((t) => t.id === parseInt(taskId));
    task.completed = e.target.checked;
    saveTasks();
  }

  if (e.target.classList.contains('delete-button')) {
    const taskId = e.target.parentElement.dataset.id;
    tasks = tasks.filter((t) => t.id !== parseInt(taskId));
    saveTasks();
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
    });

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}

loadTasks();