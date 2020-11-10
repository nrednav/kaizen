import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Could not find product with ID: ${req.params.id}`);
  }
});

// @desc    Delete single product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed successfully' });
  } else {
    res.status(404);
    throw new Error(`Could not find product with ID: ${req.params.id}`);
  }
});

// @desc    Create a product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const productExists = await Product.findOne({ name: req.body.name });

  if (productExists) {
    res.status(400);
    throw new Error('Product already exists');
  } else {
    const product = await Product.create({
      user: req.user._id,
      name: req.body.name,
      price: parseFloat(req.body.price),
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
      image: req.body.image,
      numReviews: 0,
    });

    if (product) {
      res.status(201);
      res.json(product);
    } else {
      res.status(400);
      throw new Error('Invalid product data');
    }
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    category,
    brand,
    countInStock,
    image,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = parseFloat(price);
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
};
