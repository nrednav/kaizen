import express from 'express';
import * as controller from '../controllers/users.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', controller.authUser);
router.get('/profile', protect, controller.getUserProfile);
router.put('/profile', protect, controller.updateUserProfile);
router.post('/register', controller.registerUser);
router.get('/:id/orders', protect, controller.getUserOrders);

export default router;
