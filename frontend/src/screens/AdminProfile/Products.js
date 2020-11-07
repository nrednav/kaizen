import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../../actions/product';

import Alert from '../../components/Alert';
import Loader from '../../components/Loader';

const Products = () => {
  const history = useHistory();

  const createProductHandler = () => {
    history.push('/products/create');
  };

  return (
    <div className='flex flex-col'>
      <button
        className='self-start mb-4 py-2 px-4 bg-gray-900 text-white hover:bg-opacity-75'
        onClick={createProductHandler}
      >
        <span className='uppercase flex items-center'>
          <i className='ri-add-line text-xl pr-2'></i> Create Product
        </span>
      </button>
      <div>
        <ProductList />
      </div>
    </div>
  );
};

const HeaderRow = () => {
  return (
    <div className='flex flex-row justify-start h-12 mt-4'>
      {buildCell('ID', 'font-semibold lg:w-3/12')}
      {buildCell('Name', 'font-semibold lg:w-3/12')}
      {buildCell('Price', 'font-semibold hidden lg:flex lg:w-3/12')}
      {buildCell('Actions', 'font-semibold lg:w-3/12')}
    </div>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.admin.productDelete);
  const { loading: deleteLoading, success: deleteSuccess } = productDelete;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, deleteSuccess]);

  const actionHandler = (type, id) => {
    switch (type) {
      case 'edit':
        history.push(`/products/${id}/edit`);
        break;
      case 'remove':
        if (window.confirm(`Are you sure you wish to remove product: ${id}?`)) {
          dispatch(deleteProduct(id));
        }
        break;
      default:
        return;
    }
  };

  return (
    <>
      {error && (
        <div className='flex justify-center py-4'>
          <Alert variant='error' message={error} className='w-3/4' />
        </div>
      )}
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderRow />
          {products && products.length === 0 && (
            <div className='flex justify-start py-4'>
              <h1>No products found...</h1>
            </div>
          )}
          {products && products.length > 0 && (
            <div className='flex flex-col'>
              {products.map((product) => (
                <div
                  key={product._id}
                  className='flex flex-row justify-start h-16 bg-gray-300 hover:bg-gray-100'
                >
                  {buildCell(
                    <p className='truncate'>{product._id}</p>,
                    'lg:w-3/12'
                  )}
                  {buildCell(
                    <p className='truncate'>{product.name}</p>,
                    'lg:w-3/12'
                  )}
                  {buildCell(`$${product.price}`, 'hidden lg:flex lg:w-3/12')}
                  {buildCell(
                    <div className='h-full w-full flex items-center justify-center'>
                      <button
                        className='mx-2'
                        title='Edit'
                        onClick={() => actionHandler('edit', product._id)}
                      >
                        <i className='ri-pencil-fill text-2xl'></i>
                      </button>
                      <button
                        className='mx-2'
                        title='Remove'
                        onClick={() => actionHandler('remove', product._id)}
                      >
                        <i className='ri-delete-bin-fill text-red-700 text-2xl'></i>
                      </button>
                    </div>,
                    'justify-center lg:w-3/12'
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

const buildCell = (value, extraStyles = '') => {
  return (
    <div
      className={`border border-gray-400 w-4/12 px-4 py-2 h-full flex items-center justify-center ${extraStyles}`}
    >
      {value}
    </div>
  );
};

export default Products;
