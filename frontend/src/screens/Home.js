import React from 'react';
import products from '../data/products';

import Product from '../components/Product';

const Home = () => {
  return (
    <>
      <h1 className='pt-4 text-center text-3xl'>Latest Products</h1>
      <div className='mt-8 px-4 grid grid-rows-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-5 justify-items-center'>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
