const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Middleware
router.use(taskController.isAuthenticated);

// router.get('/user/:id', taskController.getUserData);


// Routes
router.get('/todo', taskController.getTasks);
router.get('/todoadd', taskController.addTask);
router.post('/todoadd', taskController.addTask);
router.get('/task/:id/edit', taskController.editTask);
router.post('/task/:id/update', taskController.updateTask);
router.post('/task/:id/complete', taskController.completeTask);
router.post('/task/:id/delete', taskController.deleteTask);



module.exports = router;
