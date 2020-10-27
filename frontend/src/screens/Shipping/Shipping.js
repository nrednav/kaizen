import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { generateFormField } from '../../utils/formUtils';

import { saveShippingAddress } from '../../actions/checkout';
import CheckoutSteps from '../../components/CheckoutSteps';

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const checkout = useSelector((state) => state.checkout);
  const { address, city, postalCode, country } = checkout.shippingAddress;

  const formFields = [
    {
      label: 'Address',
      type: 'text',
      value: address ? address : '',
      validation: { required: 'Field required' },
    },
    {
      label: 'City',
      type: 'text',
      value: city ? city : '',
      validation: { required: 'Field required' },
    },
    {
      label: 'Postal Code',
      type: 'text',
      value: postalCode ? postalCode : '',
      validation: { required: 'Field required' },
    },
    {
      label: 'Country',
      type: 'text',
      value: country ? country : '',
      validation: { required: 'Field required' },
    },
  ];

  const onFormSubmit = (data) => {
    dispatch(
      saveShippingAddress({
        address: data['Address'],
        city: data['City'],
        postalCode: data['Postal Code'],
        country: data['Country'],
      })
    );
    history.push('/payment');
  };

  return (
    <div className='max-w-md mx-auto'>
      <CheckoutSteps activeSteps={[0, 1]}></CheckoutSteps>
      <h1 className='text-4xl px-8 py-4'>Shipping Details</h1>
      <form className='px-8' onSubmit={handleSubmit(onFormSubmit)}>
        {formFields.map((field) => generateFormField(field, register, errors))}
        <div className='flex justify-start py-8'>
          <button
            type='submit'
            className='text-base uppercase border h-12 px-4 text-white bg-gray-800 hover:opacity-75'
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
