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
      const { todo, isCompleted, createdAt } = req.body;
      const newTodo = new Todo({
        id: uuidv4(),
        todo,
        isCompleted,
        createdAt,
      });

      await newTodo.save();

      res.json({ success: true, todo: newTodo });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  })

  .put("/todo/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const { todo, isCompleted, createdAt } = req.body;
  
      console.log(req.body, 'request body'); // see if the request body is being correctly parsed
      console.log(todo, isCompleted, createdAt); // see if the values are being correctly assigned


      const updatedTodo = await Todo.findOneAndUpdate(
        { _id },
        { todo, isCompleted, createdAt },
        { new: true }
      );
  
      res.json({ success: true, todo: updatedTodo });
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
  
      res.json({ success: true, todo });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  

module.exports = router;

