import Router from 'express';
import EventController from '../controllers/eventController.js';
import userExtractor from '../middleware/userExtractor.js';

const router = new Router();

router.get('/all', userExtractor, EventController.getAll);
router.get('/', userExtractor, EventController.getBy);
router.get('/:id', userExtractor, EventController.getOne);
router.post('/', userExtractor, EventController.create);
router.delete('/:id', userExtractor, EventController.delete);
router.put('/:id', EventController.update);

export default router;
