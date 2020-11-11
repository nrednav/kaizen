import React from 'react';

export const generateFormField = (field, register, errors, className = '') => {
  return (
    <div className={`flex flex-col mt-4 ${className}`} key={field.label}>
      <label className='block text-lg text-gray-800 font-semibold mb-2'>
        {field.label}
      </label>
      {renderInputField(field, register)}
      {errors[field.label] && (
        <p className='text-red-600 text-right py-2'>
          {errors[field.label].message}
        </p>
      )}
    </div>
  );
};

const renderInputField = (field, register) => {
  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          className='py-2 px-4 shadow appearance-none border text-gray-800 leading-tight focus:outline-none'
          name={field.label}
          defaultValue={field.value}
          ref={register(field.validation)}
          cols='30'
          rows='10'
        ></textarea>
      );
    case 'file':
      return (
        <input
          type='file'
          name={field.label}
          ref={register()}
          onChange={field.callback}
        />
      );
    default:
      return (
        <input
          step={field.step || 1}
          defaultValue={field.value}
          name={field.label}
          type={field.type}
          className='h-12 shadow appearance-none border py-2 px-4 text-gray-800 leading-tight focus:outline-none'
          ref={register(field.validation)}
        />
      );
  }
};
