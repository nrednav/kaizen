import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ViewProduct = () => {
  var product = useLocation().state.product;

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
      <div className='flex mb-4 '>
        <div className='w-1/4 overflow-hidden shadow-lg rounded-md ml-8'>
          <img
            className='object-cover object-center w-full'
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className='flex flex-col w-1/4 ml-8'>
          <h3 className='text-3xl font-semibold px-4'>{product.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
