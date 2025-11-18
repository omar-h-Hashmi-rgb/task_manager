const request = require('supertest');
const { app, server } = require('../src/server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Task API', () => {
  beforeAll(async () => {
    // Clean up database before tests
    await prisma.task.deleteMany();
  });

  afterAll(async () => {
    // Clean up database after tests
    await prisma.task.deleteMany();
    await prisma.$disconnect();
    server.close();
  });

  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'This is a test task',
        status: 'pending'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(taskData.title);
      expect(response.body.data.description).toBe(taskData.description);
      expect(response.body.data.status).toBe(taskData.status);
      expect(response.body.data.id).toBeDefined();
    });

    it('should fail to create task without title', async () => {
      const taskData = {
        description: 'This task has no title'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('GET /api/tasks/:id', () => {
    let testTask;

    beforeEach(async () => {
      testTask = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task for GET',
          description: 'Test description'
        });
    });

    it('should get task by ID', async () => {
      const response = await request(app)
        .get(`/api/tasks/${testTask.body.data.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testTask.body.data.id);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .get('/api/tasks/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let testTask;

    beforeEach(async () => {
      testTask = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task for PUT',
          description: 'Test description'
        });
    });

    it('should update task', async () => {
      const updateData = {
        title: 'Updated Task Title',
        status: 'completed'
      };

      const response = await request(app)
        .put(`/api/tasks/${testTask.body.data.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.status).toBe(updateData.status);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let testTask;

    beforeEach(async () => {
      testTask = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task for DELETE',
          description: 'Test description'
        });
    });

    it('should delete task', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${testTask.body.data.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Task deleted successfully');
    });
  });
});