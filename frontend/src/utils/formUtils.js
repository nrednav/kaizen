import React from 'react';

export const generateFormField = (field, register, errors, className = '') => {
  return (
    <div className={`flex flex-col mt-4 ${className}`} key={field.label}>
      <label className='block text-lg text-gray-800 font-semibold mb-2'>
        {field.label}
      </label>
      <input
        step={field.step || 1}
        defaultValue={field.value}
        name={field.label}
        type={field.type}
        className='h-12 shadow appearance-none border py-2 px-4 text-gray-800 leading-tight focus:outline-none'
        ref={register(field.validation)}
      />
      {errors[field.label] && (
        <p className='text-red-600 text-right py-2'>
          {errors[field.label].message}
        </p>
      )}
    </div>
  );
};
