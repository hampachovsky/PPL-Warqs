import Router from 'express';
import TaskController from '../controllers/taskController.js';

const router = new Router();

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getOne);
router.get('/ev/:id', TaskController.getByEvent);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;
