import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../actions/admin/product';
import { generateFormField } from '../../utils/formUtils';
import { formFields } from './data/createProductFields';

import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { CREATE_PRODUCT_RESET } from '../../constants/admin';

const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const productCreate = useSelector((state) => state.admin.productCreate);
  const { loading, success, error } = productCreate;

  useEffect(() => {
    if (success) {
      history.push('/profile/products');
    }
    dispatch({ type: CREATE_PRODUCT_RESET });
  }, [success, history, dispatch]);

  const onFormSubmit = (data) => {
    let product = {
      countInStock: parseInt(data['Count In Stock']),
      image: data['Image URL'],
      name: data['Name'],
      price: parseFloat(data['Price']),
      description: data['Description'],
      category: data['Category'],
      brand: data['Brand'],
    };

    dispatch(createProduct(product));
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <button
          className='bg-transparent font-semibold uppercase hover:opacity-75  outline-none py-4 px-8 text-4xl'
          onClick={() => history.go(-1)}
        >
          <i className='ri-arrow-left-line'></i>
        </button>
        <h1 className='py-4 text-4xl'>Create Product</h1>
      </div>
      {error && (
        <div className='flex justify-center py-4'>
          <Alert variant='error' message={error} className='w-3/4' />
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='px-8 flex md:flex-row flex-col mb-8 md:justify-center'
        >
          <div className='flex flex-col w-full md:max-w-md'>
            {formFields['left'].map((field) =>
              generateFormField(field, register, errors, '')
            )}
            <button
              type='submit'
              className='hidden md:block md:w-1/2 text-base uppercase border h-12 px-4 my-8 text-white bg-gray-800 hover:opacity-75'
            >
              Create
            </button>
          </div>
          <div className='flex flex-col w-full md:max-w-md md:ml-16'>
            {formFields['right'].map((field) =>
              generateFormField(field, register, errors)
            )}
            <button
              type='submit'
              className='md:hidden w-1/2 mx-auto text-base uppercase border h-12 px-4 my-8 text-white bg-gray-800 hover:opacity-75'
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;
