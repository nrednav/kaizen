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
        <Alert variant='error' message={error}></Alert>
      ) : (
        <div className='mt-8 px-4 grid grid-rows-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-5 justify-items-center'>
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
