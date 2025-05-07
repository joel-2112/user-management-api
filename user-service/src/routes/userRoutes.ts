import { Router } from 'express';
import { createUser, login, getAllUsers, getUser, userUpdate, userDelete } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/users/:id', authMiddleware, getUser);
router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, userUpdate);
router.delete('/users/:id', authMiddleware, userDelete);

export default router;