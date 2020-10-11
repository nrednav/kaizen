import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className='pt-4 text-center text-3xl'>Latest Products</h1>
      <div className='mt-8 px-4 grid grid-rows-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-5 justify-items-center'>
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default Home;
