const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.getAll.bind(taskController));
router.get('/:id', taskController.getById.bind(taskController));
router.post('/', taskController.create.bind(taskController));
router.put('/:id', taskController.update.bind(taskController));
router.patch('/:id/toggle', taskController.toggleComplete.bind(taskController));
router.delete('/:id', taskController.delete.bind(taskController));

module.exports = router;
