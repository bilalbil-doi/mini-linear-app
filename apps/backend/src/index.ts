import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  });