import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { savePaymentMethod } from '../../actions/checkout';

import CheckoutSteps from '../../components/CheckoutSteps';

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const { shippingAddress, paymentMethod } = useSelector(
    (state) => state.checkout
  );

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const onFormSubmit = (data) => {
    dispatch(savePaymentMethod(data['Payment Method']));
    history.push('/order');
  };

  return (
    <div className='max-w-md mx-auto'>
      <CheckoutSteps activeSteps={[0, 1, 2]} />
      <h1 className='text-4xl px-8 py-4'>Payment Method</h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className='px-8'>
        <div className='flex flex-row items-center'>
          <input
            type='radio'
            name='Payment Method'
            value={paymentMethod ? paymentMethod : 'PayPal'}
            ref={register({
              required: 'Please select a payment method',
            })}
          />
          <label className='px-2'>
            {paymentMethod ? paymentMethod : 'PayPal'}
          </label>
        </div>
        <div className='flex justify-start py-8'>
          <button
            type='submit'
            className='text-base uppercase border h-12 px-4 text-white bg-gray-800 hover:opacity-75'
          >
            Continue
          </button>
        </div>
        {errors['Payment Method'] && (
          <p className='text-red-600 text-left py-2'>
            {errors['Payment Method'].message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Payment;
