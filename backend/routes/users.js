import express from 'express';
import * as controller from '../controllers/users.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', controller.authUser);
router.get('/profile', protect, controller.getUserProfile);
router.post('/register', controller.registerUser);

export default router;
