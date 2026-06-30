const taskRepository = require('../data/taskRepository');

class TaskService {
  getAllTasks() {
    return taskRepository.findAll();
  }

  getTaskById(id) {
    const task = taskRepository.findById(Number(id));
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  createTask({ title, description }) {
    if (!title || !title.trim()) {
      throw new Error('Title is required');
    }
    return taskRepository.create({
      title: title.trim(),
      description: description?.trim() || '',
    });
  }

  updateTask(id, updates) {
    const task = taskRepository.update(Number(id), updates);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  deleteTask(id) {
    const deleted = taskRepository.delete(Number(id));
    if (!deleted) {
      throw new Error('Task not found');
    }
    return { success: true };
  }

  toggleComplete(id) {
    const task = this.getTaskById(id);
    return this.updateTask(id, { completed: !task.completed });
  }
}

module.exports = new TaskService();
