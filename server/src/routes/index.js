import Router from 'express';
import authRouter from './authRouter.js';
import eventRouter from './eventRouter.js';
import taskRouter from './taskRouter.js';

const router = new Router();

router.use('/tasks', taskRouter);
router.use('/auth', authRouter);
router.use('/events', eventRouter);

export default router;
