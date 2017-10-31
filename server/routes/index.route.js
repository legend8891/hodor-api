import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import todoRoutes from './todos.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount todo routes at /todos
router.use('/todos', todoRoutes);

export default router;
