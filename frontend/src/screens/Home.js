import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/product';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Pagination from '../components/Pagination';
import ProductCarousel from '../components/ProductCarousel';

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1 className='mt-4 mx-20 text-4xl text-start'>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='error' message={error} className='w-1/2'></Alert>
      ) : (
        <>
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
          <div className='flex flex-row flex-wrap justify-evenly mb-8'>
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
            <div className='mx-8 w-64 h-0 m-0 p-0'></div>
            <div className='mx-8 w-64 h-0 m-0 p-0'></div>
            <div className='mx-8 w-64 h-0 m-0 p-0'></div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
