import Router from 'express';
import EventController from '../controllers/eventController.js';
import userExtractor from '../middleware/userExtractor.js';

const router = new Router();

router.get('/all', userExtractor, EventController.getAll);
router.get('/:id', EventController.getBy);
/* router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);*/

export default router;
