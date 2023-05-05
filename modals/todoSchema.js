const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const todoModel = mongoose.model('todoModel', todoSchema);

module.exports = todoModel;
