import Router from 'express';
import AuthController from '../controllers/authController.js';
import { userExtractor } from '../utils/middleware.js';

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', userExtractor, AuthController.getMe);
router.get('/all', AuthController.getAll);

export default router;
