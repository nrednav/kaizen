import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

import { fetchProduct } from '../actions/product';

const ViewProduct = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

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
        <div className='flex justify-center'>
          <Alert variant='error' message={error} className='w-1/2'></Alert>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row mb-4 lg:items-start'>
          <div className='product-image w-6/12 md:w-4/12 lg:w-3/12 lg:ml-8 overflow-hidden shadow-lg rounded-md self-center'>
            <img
              className='object-cover object-center w-full h-full'
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className='product-details flex flex-col flex-grow px-4 items-center lg:items-start lg:ml-8'>
            <h3 className='text-3xl font-semibold mt-4 lg:mt-0'>
              {product.name}
            </h3>
            <div className='flex flex-col lg:flex-row items-center lg:py-2'>
              <Rating
                className='pt-2 lg:pt-0 text-2xl'
                value={product.rating}
              />
              <span className='lg:pl-4 font-semibold'>
                ({product.numReviews} reviews)
              </span>
            </div>
            <div className='text-4xl font-semibold mt-4 lg:mt-0'>
              ${product.price}
            </div>
            <div className='mt-4 text-xl'>
              <p>{product.description}</p>
            </div>
          </div>
          <div className='product-actions border border-gray-800 rounded-lg text-xl font-semibold mt-16 lg:mt-0 w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12 lg:mr-16 mx-auto'>
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

            {product.countInStock > 0 && (
              <div className='w-full flex items-center justify-between px-4 border-b-2 border-gray-400 h-16'>
                <p>Quantity:</p>
                <div>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className='w-full block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  >
                    {[...Array(product.countInStock).keys()].map((val) => (
                      <option key={val + 1} value={val + 1}>
                        {val + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className='flex justify-center'>
              <button
                onClick={() => addToCartHandler()}
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
