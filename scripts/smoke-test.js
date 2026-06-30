const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/tasks.json');
const backup = fs.existsSync(DATA_FILE) ? fs.readFileSync(DATA_FILE, 'utf-8') : '[]';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

fs.writeFileSync(DATA_FILE, '[]');

try {
  const taskService = require('../src/services/taskService');

  const created = taskService.createTask({ title: 'CI smoke test', description: 'automated' });
  assert(created.id, 'Task should have an id');
  assert(created.title === 'CI smoke test', 'Task title should match');

  const all = taskService.getAllTasks();
  assert(all.length === 1, 'Should have exactly one task');

  const toggled = taskService.toggleComplete(created.id);
  assert(toggled.completed === true, 'Task should be marked completed');

  taskService.deleteTask(created.id);
  assert(taskService.getAllTasks().length === 0, 'Task list should be empty after delete');

  try {
    taskService.createTask({ title: '   ' });
    throw new Error('Should reject empty title');
  } catch (err) {
    assert(err.message === 'Title is required', 'Should validate empty title');
  }

  console.log('All smoke tests passed.');
} finally {
  fs.writeFileSync(DATA_FILE, backup);
}
