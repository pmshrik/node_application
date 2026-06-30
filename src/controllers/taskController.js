const taskService = require('../services/taskService');

class TaskController {
  getAll(req, res) {
    try {
      const tasks = taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById(req, res) {
    try {
      const task = taskService.getTaskById(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  create(req, res) {
    try {
      const task = taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  update(req, res) {
    try {
      const task = taskService.updateTask(req.params.id, req.body);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  delete(req, res) {
    try {
      const result = taskService.deleteTask(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  toggleComplete(req, res) {
    try {
      const task = taskService.toggleComplete(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();
