import React from 'react';

const Alert = ({ variant, message, className, showVariant = true }) => {
  var colors = {
    info: 'blue',
    error: 'red',
    success: 'green',
    warning: 'yellow',
  };

  return (
    <div
      className={`${className} bg-${colors[variant]}-100 border border-${colors[variant]}-400 text-${colors[variant]}-700 px-4 py-3 mt-4 text-center`}
    >
      {showVariant && (
        <strong className='font-bold'>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}!
        </strong>
      )}
      <span className={`inline-block ${showVariant ? 'ml-4' : ''}`}>
        {message}
      </span>
    </div>
  );
};

export default Alert;
