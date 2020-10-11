import React from 'react';

const Product = ({ product }) => {
  return (
    <div className='w-full max-w-sm mx-auto rounded-md overflow-hidden shadow-lg bg-gray-800 cursor-pointer'>
      <div
        className='flex items-end justify-end h-1/2 w-full bg-cover hover:opacity-75'
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <div className='px-6 py-4'>
        <div className='text-xl mb-2 text-gray-200'>
          {product.name} -{' '}
          <span className='text-green-400'>${product.price}</span>
        </div>
        <div className='text-md mb-2 text-gray-400'>
          <span className='text-orange-400 pr-2'>
            <i className='ri-star-fill pr-2'></i>
            {product.rating}
          </span>{' '}
          from {product.numReviews} reviews
        </div>
      </div>
    </div>
  );
};

export default Product;
