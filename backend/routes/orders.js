import express from 'express';
import * as controller from '../controllers/orders.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, controller.createOrder);
router.get('/:id', protect, controller.getOrderByID);

export default router;
