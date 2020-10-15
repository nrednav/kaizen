import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../components/Alert';
import Loader from '../components/Loader';

import { login } from '../actions/user';

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, profile } = user;

  useEffect(() => {
    if (profile) {
      history.push(redirect);
    }
  }, [profile, history, redirect]);

  const loginHandler = (e) => {
    dispatch(login(email, password));
  };

  return (
    <div className='w-full flex justify-center mt-8'>
      <div className='w-5/12'>
        <h1 className='text-center font-semibold text-4xl border-b-2 border-gray-400 pb-4 mx-4'>
          Login
        </h1>
        {error && (
          <div className='flex justify-center py-4'>
            <Alert variant='error' message={error} className='w-3/4' />
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          <>
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
            <div className='flex w-full justify-center py-8'>
              <button
                onClick={loginHandler}
                className='text-base uppercase border w-1/2 h-12 px-4 text-white bg-gray-800 hover:opacity-75'
              >
                Login
              </button>
            </div>
            <div className='flex justify-center'>
              New customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className='font-semibold ml-2'
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
