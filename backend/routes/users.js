import express from 'express';
import * as controller from '../controllers/users.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', controller.authUser);
router.get('/profile', protect, controller.getUserProfile);
router.put('/profile', protect, controller.updateUserProfile);
router.post('/register', controller.registerUser);
router.get('/:id/orders', protect, controller.getUserOrders);
router.get('/', protect, admin, controller.getAllUsers);
router.get('/:id', protect, admin, controller.getUserByID);
router.put('/:id', protect, admin, controller.adminUpdateUser);
router.delete('/:id', protect, admin, controller.deleteUser);

export default router;
