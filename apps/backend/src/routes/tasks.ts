import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignee: true
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST create new task
router.post('/', async (req, res) => {
  const { title, status, priority, projectId, assigneeId } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        status,
        priority,
        projectId,
        assigneeId
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// PATCH update task
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, priority } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status, priority }
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

export default router;
