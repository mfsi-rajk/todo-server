const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  status: { type: String, enum: ['completed', 'incomplete'], default: 'incomplete' },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['work', 'personal', 'shopping', 'miscellaneous'], default: 'miscellaneous' },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
