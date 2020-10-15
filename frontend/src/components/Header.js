import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { logout } from '../actions/user';

const Header = () => {
  const [showMenuOptions, toggleMenuOptions] = useState(false);
  const user = useSelector((state) => state.user);
  const { profile } = user;

  const dispatch = useDispatch();
  const history = useHistory();

  const toggleNav = (e) => {
    e.preventDefault();
    document.querySelector('#nav-content').classList.toggle('hidden');
  };

  const logoutHandler = (e) => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <Link to='/'>
            <span className='text-4xl pl-2 cursor-pointer'>Kaizen</span>
          </Link>
        </div>

        <div className='block lg:hidden'>
          <button
            id='nav-toggle'
            onClick={toggleNav}
            className='flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white'
          >
            <svg
              className='fill-current h-3 w-3'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>

        <div
          className='relative w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-6 lg:pt-0'
          id='nav-content'
        >
          <ul className='lg:flex justify-end flex-1 items-center'>
            <li className='mr-3'>
              <Link
                to='/cart'
                className='py-2 px-4 text-xl text-white no-underline flex'
              >
                <i className='ri-shopping-cart-fill px-2 text-blue-400'></i>
                <p>Cart</p>
              </Link>
            </li>
            {profile ? (
              <li className='mr-3'>
                <div
                  className='py-2 px-4 text-xl text-white no-underline flex cursor-pointer'
                  onClick={() => toggleMenuOptions(!showMenuOptions)}
                >
                  <i className='ri-user-fill px-2 text-blue-400'></i>
                  <p>{profile.name}</p>
                </div>
                {showMenuOptions && (
                  <div
                    className='absolute right-0 top-0 mt-16 w-2/12 bg-gray-800 text-white z-10'
                    onClick={() => toggleMenuOptions(false)}
                  >
                    <div className='h-12 px-4 py-2 text-lg border-b-2 border-gray-700 flex items-center cursor-pointer hover:bg-gray-700'>
                      <Link to='/profile' className='w-full'>
                        Profile
                      </Link>
                    </div>
                    <div
                      className='h-12 px-4 py-2 text-lg flex items-center cursor-pointer hover:bg-gray-700'
                      onClick={logoutHandler}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li className='mr-3'>
                <Link
                  to='/login'
                  className='py-2 px-4 text-xl text-white no-underline flex'
                >
                  <i className='ri-user-fill px-2 text-blue-400'></i>
                  <p>Login</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
