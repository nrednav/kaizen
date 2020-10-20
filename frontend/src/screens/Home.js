import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

import { fetchProducts } from '../actions/product';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className='mt-4 text-center text-3xl'>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='error' message={error} className='w-1/2'></Alert>
      ) : (
        <div className='flex flex-row flex-wrap justify-evenly mt-8'>
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
          <div className='mx-8 w-64 h-0 m-0 p-0'></div>
          <div className='mx-8 w-64 h-0 m-0 p-0'></div>
          <div className='mx-8 w-64 h-0 m-0 p-0'></div>
        </div>
      )}
    </>
  );
};

export default Home;
