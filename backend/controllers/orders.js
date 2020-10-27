import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, prices } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items found');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice: prices['tax'],
      shippingPrice: prices['shipping'],
      totalPrice: prices['total'],
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});
