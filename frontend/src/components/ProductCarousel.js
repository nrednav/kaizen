import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchTopProducts } from '../actions/product';

function mod(n, m) {
  return ((n % m) + m) % m;
}

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products } = productTopRated;

  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  const changeActiveProduct = (direction) => {
    if (direction === 'next') {
      setActiveProduct(mod(activeProduct + 1, 3));
    } else if (direction === 'prev') {
      setActiveProduct(mod(activeProduct - 1, 3));
    }
  };

  return (
    <>
      {products && (
        <>
          <div className='flex flex-row w-screen mx-auto text-white bg-gray-800 my-8'>
            <button
              className='w-32 text-4xl focus:outline-none'
              onClick={() => changeActiveProduct('prev')}
            >
              <i className='ri-arrow-left-s-line'></i>
            </button>
            <div className='flex flex-col flex-grow'>
              <div className='flex mx-auto text-2xl text-center my-8'>
                {products[activeProduct].name}
              </div>
              <div className='flex flex-row min-h-half'>
                <div className='w-6/12 flex-grow flex items-center justify-center'>
                  <img
                    src={products[activeProduct].image}
                    alt=''
                    className='w-48 h-48 sm:w-64 sm:h-64 object-cover object-center cursor-pointer hover:opacity-75'
                    onClick={() =>
                      history.push(`/products/${products[activeProduct]._id}`)
                    }
                  />
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                {products.map((x, index) => (
                  <button
                    key={`${x._id}_${index}`}
                    className={`${
                      index === activeProduct
                        ? 'text-blue-400'
                        : 'hover:text-blue-200'
                    } text-4xl focus:outline-none`}
                    onClick={() => setActiveProduct(index)}
                  >
                    <i className='ri-subtract-line'></i>
                  </button>
                ))}
              </div>
            </div>
            <button
              className='w-32 text-4xl focus:outline-none'
              onClick={() => changeActiveProduct('next')}
            >
              <i className='ri-arrow-right-s-line'></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProductCarousel;
