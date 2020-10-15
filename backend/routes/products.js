import express from 'express';
import * as controller from '../controllers/products.js';

const router = express.Router();

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductByID);

export default router;
