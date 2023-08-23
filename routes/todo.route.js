const express = require('express');
const TodoController = require('../controllers/todo.controller');
const verifyAuth = require('../middlewares/verifyAuth');

const router = express.Router();

router.post('/', verifyAuth, TodoController.createTodo);
router.get('/', verifyAuth, TodoController.getAllTodos);
router.put('/:id', verifyAuth, TodoController.updateTodo);
router.delete('/:id', verifyAuth, TodoController.deleteTodo);
module.exports = router;
