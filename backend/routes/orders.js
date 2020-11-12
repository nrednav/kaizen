import express from 'express';
import * as controller from '../controllers/orders.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, controller.createOrder);
router.get('/:id', protect, controller.getOrderByID);
router.put('/:id/pay', protect, controller.updateOrderToPaid);
router.put('/:id/deliver', protect, admin, controller.updateOrderToDelivered);
router.get('/', protect, admin, controller.fetchAllOrders);

export default router;
