import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className='w-10/12 mx-auto rounded-md overflow-hidden shadow-lg bg-gray-800 cursor-pointer'>
      <Link to={`/products/${product._id}`}>
        <div
          className='flex items-end justify-end h-1/2 bg-cover hover:opacity-75'
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className='px-6 py-4'>
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
