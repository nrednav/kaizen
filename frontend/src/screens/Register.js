import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../components/Alert';
import Loader from '../components/Loader';

import { register } from '../actions/user';

const Register = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, registerError, profile } = user;

  useEffect(() => {
    if (profile) {
      history.push(redirect);
    }
  }, [profile, history, redirect]);

  const registerHandler = () => {
    if (validateFormNotEmpty()) {
      if (password.length < 6) {
        setMessage(
          'Please enter a password that is 6 or more characters long.'
        );
      } else if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
      } else if (!validateEmail(email)) {
        setMessage('Please enter a valid email address');
      } else {
        dispatch(register(name, email, password));
        setMessage('');
      }
    }
  };

  const validateFormNotEmpty = () => {
    if (name.length === 0) {
      setMessage('Please enter a name.');
      return false;
    } else if (email.length === 0) {
      setMessage('Please enter an email address.');
      return false;
    } else if (password.length === 0 || confirmPassword.length === 0) {
      setMessage('Please enter both passwords.');
      return false;
    }
    return true;
  };

  const validateEmail = (emailAddress) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailAddress
    );
  };

  return (
    <div className='w-full flex justify-center my-8'>
      <div className='w-8/12 sm:w-6/12 lg:w-4/12'>
        <h1 className='text-center font-semibold text-4xl border-b-2 border-gray-400 pb-4 mx-4'>
          Register
        </h1>
        {message && (
          <div className='flex justify-center py-4'>
            <Alert variant='error' message={message} className='w-3/4' />
          </div>
        )}
        {registerError && (
          <div className='flex justify-center py-4'>
            <Alert variant='error' message={registerError} className='w-3/4' />
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='flex flex-col mt-4'>
              <label
                htmlFor='name'
                className='block text-lg text-gray-800 font-semibold mb-2 mx-4'
              >
                Name:
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                id='name'
                className='mx-4 h-12 shadow appearance-none border py-2 px-4 text-gray-800 leading-tight focus:outline-none'
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label
                htmlFor='email'
                className='block text-lg text-gray-800 font-semibold mb-2 mx-4'
              >
                Email Address:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                id='email'
                className='mx-4 h-12 shadow appearance-none border py-2 px-4 text-gray-800 leading-tight focus:outline-none'
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label
                htmlFor='password'
                className='block text-gray-800 text-lg font-semibold mb-2 mx-4'
              >
                Password:
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                id='password'
                className='mx-4 h-12 shadow appearance-none border py-2 px-4 text-gray-800 leading-tight focus:outline-none '
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label
                htmlFor='confirmPassword'
                className='block text-gray-800 text-lg font-semibold mb-2 mx-4'
              >
                Confirm Password:
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
                id='confirmPassword'
                className='mx-4 h-12 shadow appearance-none border py-2 px-4 text-gray-800 leading-tight focus:outline-none '
              />
            </div>
            <div className='flex w-full justify-center py-8'>
              <button
                onClick={registerHandler}
                className='text-base uppercase border w-1/2 h-12 px-4 text-white bg-gray-800 hover:opacity-75'
              >
                Register
              </button>
            </div>
            <div className='flex justify-center'>
              Have an account?{' '}
              <Link to='/login' className='font-semibold ml-2'>
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
