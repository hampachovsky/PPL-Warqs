import Router from 'express';
import taskRouter from '../routes/taskRouter.js';
import authRouter from '../routes/authRouter.js';

const router = new Router();

router.use('/tasks', taskRouter);
router.use('/auth', authRouter);

export default router;
