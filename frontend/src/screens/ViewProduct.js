import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

import { fetchProduct } from '../actions/product';

const ViewProduct = ({ match }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      <Link to='/'>
        <button className='bg-transparent font-semibold p-8 uppercase hover:opacity-75  outline-none'>
          <div className='flex flex-row justify-evenly items-center'>
            <i className='ri-arrow-left-line'></i>
            <p className='pl-2'>Back</p>
          </div>
        </button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='error' message={error}></Alert>
      ) : (
        <div className='flex mb-4 items-start'>
          <div className='product-image h-1/2 w-1/4 overflow-hidden shadow-lg rounded-md ml-8'>
            <img
              className='object-cover object-center w-full h-full'
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className='product-details flex flex-col flex-grow ml-8 px-4'>
            <h3 className='text-3xl font-semibold'>{product.name}</h3>
            <div className='flex flex-row items-center'>
              <Rating className='py-2 text-2xl' value={product.rating} />
              <span className='pl-4 font-semibold'>
                ({product.numReviews} reviews)
              </span>
            </div>
            <div className='text-4xl font-semibold'>${product.price}</div>
            <div className='mt-4'>
              <p>{product.description}</p>
            </div>
          </div>
          <div className='product-actions w-1/4 ml-8 border border-gray-800 rounded-lg text-xl font-semibold mr-16'>
            <div className='flex items-center justify-between px-4 border-b-2 border-gray-400 h-12'>
              <p>Price:</p>
              <p className='font-normal'>${product.price}</p>
            </div>
            <div className='flex items-center justify-between px-4 border-b-2 border-gray-400 h-12'>
              <p>Status:</p>
              <p className='font-normal'>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </p>
            </div>
            <div className='flex justify-center'>
              <button
                className={
                  `${product.countInStock === 0 ? 'cursor-not-allowed' : ''}` +
                  ' text-base uppercase border w-1/2 my-4 h-12 text-white bg-gray-800 hover:opacity-75 rounded-lg'
                }
                disabled={product.countInStock === 0}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
