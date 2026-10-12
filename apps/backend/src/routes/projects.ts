import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST create new project
router.post('/', async (req, res) => {
  const { name, key, description } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        key,
        description
      }
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project' });
  }
});

export default router;
