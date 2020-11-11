import express from 'express';
import * as controller from '../controllers/products.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductByID);
router.delete('/:id', protect, admin, controller.deleteProduct);
router.post('/', protect, admin, controller.createProduct);
router.put('/:id', protect, admin, controller.updateProduct);
router.post('/:id/reviews', protect, controller.addReview);

export default router;
