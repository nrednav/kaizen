import React from 'react';
import { useHistory } from 'react-router-dom';

const CheckoutSteps = ({ activeSteps }) => {
  const history = useHistory();

  const steps = [
    { label: 'Login', path: '/login?redirect=shipping' },
    { label: 'Shipping', path: '/shipping' },
    { label: 'Payment', path: '/payment' },
    { label: 'Order', path: '/order' },
  ];

  return (
    <div className='flex flex-row justify-evenly max-w-md my-4'>
      {steps.map((step, index) => {
        var disabled = !activeSteps.includes(index);
        return (
          <button
            onClick={() => history.push(step.path)}
            key={step.label}
            disabled={disabled}
            className={`${
              disabled
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-black hover:underline'
            } py-2 text-xl`}
          >
            {step.label}
          </button>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
