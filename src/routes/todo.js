// routes/todo.js
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Todo = require('../models/Todo')
const { v4: uuidv4 } = require('uuid')

// routes
router
  .get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find()
      res.json({ success: true, data: todos })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  .post('/todo', async (req, res) => {
    try {
      const { todo } = req.body
      const newTodo = new Todo({
        id: uuidv4(),
        todo,
        createdAt: Date.now()
      })

      await newTodo.save()

      res.json({ success: true, data: newTodo })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  .put("/todo/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const { todo, isCompleted } = req.body;
    
      const updatedFields = {};
      if (todo) updatedFields.todo = todo;
      if (isCompleted !== undefined) updatedFields.isCompleted = isCompleted;
      updatedFields.updatedAt = Date.now();
    
      const updatedTodo = await Todo.findByIdAndUpdate(
        _id,
        updatedFields,
        { new: true }
      );
    
      res.json({ success: true, data: updatedTodo });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  })
  
  .delete('/todo/:_id', async (req, res) => {
    try {
      const { _id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ success: false, error: 'Invalid todo ID' });
      }
  
      const todo = await Todo.findByIdAndDelete(_id);
  
      if (!todo) {
        return res.status(404).json({ success: false, error: 'Todo not found' });
      }
  
      res.json({ success: true, data: todo });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  })

module.exports = router
