// models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);
