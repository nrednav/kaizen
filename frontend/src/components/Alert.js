import React from 'react';

const Alert = ({ variant, message }) => {
  var colors = {
    info: 'blue',
    error: 'red',
    success: 'green',
    warning: 'yellow',
  };

  return (
    <div className='mt-4 flex justify-center text-center'>
      <div
        className={`w-1/2 bg-${colors[variant]}-100 border border-${colors[variant]}-400 text-${colors[variant]}-700 px-4 py-3 rounded-lg relative`}
      >
        <strong className='font-bold'>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}!
        </strong>
        <span className='inline-block ml-4'>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
