// models/Todo.js
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const todoSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4(), unique: true },
    todo: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: null }
  }
)

module.exports = mongoose.model('Todo', todoSchema)
