const Todo = require('../models/todo');
const _ = require('lodash');

module.exports = {
  createTodo: async (req, res) => {
    try {
      const body = _.pick(req.body, [
        'title',
        'description',
        'priority',
        'status',
        'dueDate',
        'user',
        'category',
      ]);
      const newTodo = new Todo(body);
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Could not create todo.' });
    }
  },
  getAllTodos: async (req, res) => {
    try {
      const { page = 1, limit = 10, sortByPriority, filterByStatus, searchQuery } = req.query;
      const userId = req.body.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Could not fetch todos.' });
      }

      let todosQuery = Todo.find({ user: userId });

      if (sortByPriority) {
        todosQuery = todosQuery.sort({ priority: sortByPriority });
      }

      if (filterByStatus) {
        todosQuery = todosQuery.where({ status: filterByStatus });
      }

      if (searchQuery) {
        todosQuery = todosQuery.find({
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
          ],
        });
      }

      const totalTodos = await Todo.countDocuments(todosQuery);
      const todos = await todosQuery
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.json({
        todos,
        totalTodos,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalTodos / limit),
      });
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch tasks' });
    }
  },
  updateTodo: async (req, res) => {
    const todoId = req.params.id;
    const body = _.pick(req.body, [
      'title',
      'description',
      'priority',
      'status',
      'dueDate',
      'user',
      'category',
    ]);

    if (!body.user) {
      return res.status(401).json({ error: 'Could not update todo.' });
    }

    try {
      const todo = await Todo.findOne({ _id: todoId, user: body.user });

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      const updatedTask = await Todo.findByIdAndUpdate(todoId, body, { new: true });

      return res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not update task' });
    }
  },

  deleteTodo: async (req, res) => {
    const todoId = req.params.id;
    const userId = req.body.userId;
    try {
      if (!userId) {
        return res.status(401).json({ error: 'Could not delete todos.' });
      }

      const deletedTask = await Todo.findByIdAndDelete(todoId);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Could not delete Todo' });
    }
  },
};
