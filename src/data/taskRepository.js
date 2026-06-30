const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

function readTasks() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

class TaskRepository {
  findAll() {
    return readTasks();
  }

  findById(id) {
    return readTasks().find((task) => task.id === id) || null;
  }

  create({ title, description }) {
    const tasks = readTasks();
    const task = {
      id: Date.now(),
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    writeTasks(tasks);
    return task;
  }

  update(id, updates) {
    const tasks = readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...updates, id };
    writeTasks(tasks);
    return tasks[index];
  }

  delete(id) {
    const tasks = readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    writeTasks(tasks);
    return true;
  }
}

module.exports = new TaskRepository();
