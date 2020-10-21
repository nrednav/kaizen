import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className='mx-8 my-4 w-64 overflow-hidden shadow-lg cursor-pointer flex justify-center items-center'>
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className='w-64 h-64 object-cover object-center border border-gray-400 hover:opacity-75'
        />
        <div className='bg-gray-800 p-4'>
          <div className='text-xl mb-2 text-gray-200'>
            {product.name} -{' '}
            <span className='text-green-400'>${product.price}</span>
          </div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
      </Link>
    </div>
  );
};

export default Product;
