import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import colors from 'colors';
import {
  notFoundErrorHandler,
  errorHandler,
} from './middleware/error_handling.js';

// Routes
import productRoutes from './routes/products.js';

// Initialisation
dotenv.config();
connectToDB();
const app = express();

// Middleware - Routing
app.use('/api/products', productRoutes);

// Middleware - Error Handling
app.use(notFoundErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.green.bold
  )
);
