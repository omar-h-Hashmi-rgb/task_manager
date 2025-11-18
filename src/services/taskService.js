const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class TaskService {
  // Get all tasks with optional status filter
  async getAllTasks(status = null) {
    const where = status ? { status } : {};
    
    return await prisma.task.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  // Get task by ID
  async getTaskById(id) {
    return await prisma.task.findUnique({
      where: { id }
    });
  }

  // Create new task
  async createTask(taskData) {
    const { title, description, status = 'PENDING' } = taskData;
    
    return await prisma.task.create({
      data: {
        title,
        description,
        status
      }
    });
  }

  // Update task
  async updateTask(id, updateData) {
    try {
      return await prisma.task.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return null; // Record not found
      }
      throw error;
    }
  }

  // Delete task
  async deleteTask(id) {
    try {
      await prisma.task.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false; // Record not found
      }
      throw error;
    }
  }

  // Disconnect Prisma client
  async disconnect() {
    await prisma.$disconnect();
  }
}

module.exports = new TaskService();