const { validationResult } = require('express-validator');
const taskService = require('../services/taskService');

class TaskController {
  // Get all tasks
  async getAllTasks(req, res, next) {
    try {
      const { status } = req.query;
      const tasks = await taskService.getAllTasks(status);
      
      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length
      });
    } catch (error) {
      next(error);
    }
  }

  // Get task by ID
  async getTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);
      
      if (!task) {
        return res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new task
  async createTask(req, res, next) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const taskData = req.body;
      const newTask = await taskService.createTask(taskData);
      
      res.status(201).json({
        success: true,
        data: newTask,
        message: 'Task created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Update task
  async updateTask(req, res, next) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const updateData = req.body;
      
      const updatedTask = await taskService.updateTask(id, updateData);
      
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        data: updatedTask,
        message: 'Task updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete task
  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await taskService.deleteTask(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();