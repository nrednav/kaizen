import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import { updateProduct } from '../../actions/admin/product';
import { fetchProduct } from '../../actions/product';
import { generateFormField } from '../../utils/formUtils';
import { formFields } from './data/formFields';

import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { UPDATE_PRODUCT_RESET } from '../../constants/admin';
import { FETCH_PRODUCT_RESET } from '../../constants/product';

const EditProduct = ({ history, match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  let {
    loading: productDetailsLoading,
    error: productDetailsError,
    product,
  } = productDetails;

  const productUpdate = useSelector((state) => state.admin.productUpdate);
  const {
    loading: productUpdateLoading,
    error: productUpdateError,
    success: productUpdateSuccess,
    updatedProduct,
  } = productUpdate;

  const { profile } = useSelector((state) => state.user);

  const { register, handleSubmit, errors, reset } = useForm({});

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match]);

  useEffect(() => {
    if (updatedProduct) {
      reset({
        Name: updatedProduct['name'],
        Price: updatedProduct['price'],
        Description: updatedProduct['description'],
        Category: updatedProduct['category'],
        Brand: updatedProduct['brand'],
        'Count In Stock': updatedProduct['countInStock'],
        'Image URL': updatedProduct['image'],
      });
    }
  }, [updatedProduct, reset]);

  const onFormSubmit = (data) => {
    let updatedDetails = {
      countInStock: parseInt(data['Count In Stock']),
      image: data['Image URL'],
      name: data['Name'],
      price: parseFloat(data['Price']),
      description: data['Description'],
      category: data['Category'],
      brand: data['Brand'],
    };

    dispatch(updateProduct(updatedDetails, match.params.id));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${profile.token}`,
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      product['image'] = data;
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <button
          className='bg-transparent font-semibold uppercase hover:opacity-75  outline-none py-4 px-8 text-4xl absolute'
          onClick={() => {
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch({ type: FETCH_PRODUCT_RESET });
            history.go(-1);
          }}
        >
          <i className='ri-arrow-left-line'></i>
        </button>
        <h1 className='py-4 text-4xl text-center mx-auto'>Edit Product</h1>
      </div>
      {productDetailsError ||
        (productUpdateError && (
          <div className='flex justify-center py-4'>
            <Alert
              variant='error'
              message={productDetailsError || productUpdateError}
              className='w-3/4'
            />
          </div>
        ))}
      {productUpdateSuccess && (
        <div className='flex justify-center py-4'>
          <Alert
            variant='success'
            message='Product details were successfully updated'
            className='w-3/4'
          />
        </div>
      )}
      {productDetailsLoading || productUpdateLoading || uploading ? (
        <Loader />
      ) : (
        product && (
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className='px-8 flex md:flex-row flex-col mb-8 md:justify-center'
          >
            <div className='flex flex-col w-full md:max-w-md'>
              {formFields['left'].map((field) =>
                generateFormField(
                  { ...field, value: product[field.label.toLowerCase()] },
                  register,
                  errors,
                  ''
                )
              )}
              <button
                type='submit'
                className='hidden md:block md:w-1/2 text-base uppercase border h-12 px-4 my-8 text-white bg-gray-800 hover:opacity-75'
              >
                Update
              </button>
            </div>
            <div className='flex flex-col w-full md:max-w-md md:ml-16'>
              {formFields['right'].map((field) => {
                field.value = product[field.label.toLowerCase()];
                if (field.label === 'Count In Stock') {
                  field.value = product['countInStock'];
                } else if (field.label === 'Image URL') {
                  field.value = product['image'];
                }

                if (field.label === 'Image Upload') {
                  field.callback = uploadFileHandler;
                }
                return generateFormField(field, register, errors);
              })}
              <button
                type='submit'
                className='md:hidden w-1/2 mx-auto text-base uppercase border h-12 px-4 my-8 text-white bg-gray-800 hover:opacity-75'
              >
                Update
              </button>
            </div>
          </form>
        )
      )}
    </div>
  );
};

export default EditProduct;
