import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { fetchProfile, updateProfile } from '../../actions/userProfile';

import Alert from '../../components/Alert';
import Loader from '../../components/Loader';

const UserProfileDetails = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, success, error, profile } = userProfile;

  const formFields = [
    {
      label: 'Name',
      type: 'text',
      value: profile ? profile.name : '',
      validation: {
        required: 'Field required',
      },
    },
    {
      label: 'Email Address',
      type: 'email',
      value: profile ? profile.email : '',
      validation: {
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Invalid email address format',
        },
      },
    },
    {
      label: 'Password',
      type: 'password',
      validation: {
        minLength: {
          value: 6,
          message: 'Must be 6 or more characters',
        },
        required: 'Field required',
      },
    },
    {
      label: 'Confirm Password',
      type: 'password',
      validation: {
        minLength: {
          value: 6,
          message: 'Must be 6 or more characters',
        },
        required: 'Field required',
      },
    },
  ];

  const [message, setMessage] = useState('');

  const { register, handleSubmit, errors, clearErrors } = useForm();

  useEffect(() => {
    dispatch(fetchProfile('profile'));
  }, [dispatch]);

  const onFormSubmit = (data) => {
    if (data['Confirm Password'] !== data['Password']) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateProfile({
          id: profile._id,
          name: data['Name'],
          email: data['Email Address'],
          password: data['Password'],
        })
      );
      setMessage('');
      clearErrors();
    }
  };

  return (
    <>
      {success && (
        <div className='flex justify-center py-4'>
          <Alert
            variant='success'
            message={'Profile details were updated successfully!'}
            className='w-3/4'
          />
        </div>
      )}
      {message && (
        <div className='flex justify-center py-4'>
          <Alert variant='error' message={message} className='w-3/4' />
        </div>
      )}
      {error && (
        <div className='flex justify-center py-4'>
          <Alert variant='error' message={error} className='w-3/4' />
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        profile && (
          <form className='max-w-md' onSubmit={handleSubmit(onFormSubmit)}>
            {formFields.map((field) => generateField(field, register, errors))}
            <div className='flex justify-start py-8'>
              <button
                type='submit'
                className='text-base uppercase border h-12 px-4 text-white bg-gray-800 hover:opacity-75'
              >
                Update Details
              </button>
            </div>
          </form>
        )
      )}
    </>
  );
};

const generateField = (field, register, errors) => {
  return (
    <div className='flex flex-col mt-4' key={field.label}>
      <label className='block text-lg text-gray-800 font-semibold mb-2'>
        {field.label}:
      </label>
      <input
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

export default UserProfileDetails;
