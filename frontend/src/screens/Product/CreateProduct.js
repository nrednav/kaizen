import React from 'react';
import { useForm } from 'react-hook-form';
import { generateFormField } from '../../utils/formUtils';

const formFields = {
  left: ['Name', 'Price', 'Description', 'Category'],
  right: ['Brand', 'Count In Stock', 'Image URL'],
};

const CreateProduct = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  const onFormSubmit = (data) => {
    console.log(data);
    console.log({
      countInStock: data['Count In Stock'],
      image: data['Image URL'],
      ...data,
    });
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
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className='px-8 flex md:flex-row flex-col mb-8'
      >
        <div className='flex flex-col w-full md:max-w-md'>
          {formFields['left'].map((field) =>
            generateFormField(
              {
                label: field,
                type: 'text',
                value: '',
                validation: { required: 'Field Required' },
              },
              register,
              errors,
              ''
            )
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
            generateFormField(
              {
                label: field,
                type: 'text',
                value: '',
                validation: { required: 'Field Required' },
              },
              register,
              errors
            )
          )}
          <button
            type='submit'
            className='md:hidden w-1/2 mx-auto text-base uppercase border h-12 px-4 my-8 text-white bg-gray-800 hover:opacity-75'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
