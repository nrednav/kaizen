import React from 'react';
import { useHistory } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  let history = useHistory();

  const viewProduct = () => {
    history.push({
      pathname: `/product/${product._id}`,
      state: {
        product: product,
      },
    });
  };

  return (
    <div
      className='w-full max-w-sm mx-auto rounded-md overflow-hidden shadow-lg bg-gray-800 cursor-pointer'
      onClick={viewProduct}
    >
      <div
        className='flex items-end justify-end h-1/2 w-full bg-cover hover:opacity-75'
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <div className='px-6 py-4'>
        <div className='text-xl mb-2 text-gray-200'>
          {product.name} -{' '}
          <span className='text-green-400'>${product.price}</span>
        </div>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
    </div>
  );
};

export default Product;
