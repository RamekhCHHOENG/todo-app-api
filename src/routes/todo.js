// routes/todo.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { v4: uuidv4 } = require("uuid");

// routes
router
  .get("/todos", async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json({ success: true, data: todos });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  })

  .post("/todo", async (req, res) => {
    try {
      const { todo, isCompleted} = req.body;
      const newTodo = new Todo({
        id: uuidv4(),
        todo,
        isCompleted
      });

      await newTodo.save();
      
      // fetch the newly created todo from the database
      const savedTodo = await Todo.findOne({ id: newTodo.id }).lean();

      // remove the _id field from the response
      delete savedTodo._id;

      res.json({ success: true, data: savedTodo });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  })

  .put("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { todo, isCompleted } = req.body;
  
      const updatedTodo = await Todo.findOneAndUpdate(
        { id },
        { todo, isCompleted, updatedAt: Date.now() },
        { new: true }
      ).lean();
  
      // remove the _id field from the response
      delete updatedTodo._id;
  
      res.json({ success: true, data: updatedTodo });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  })

  .delete("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const todo = await Todo.findByIdAndDelete(id);
  
      if (!todo) {
        return res.status(404).json({ success: false, error: "Todo not found" });
      }
  
      res.json({ success: true, data: todo });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  

module.exports = router;

