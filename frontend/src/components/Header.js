import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../actions/user';

const Header = () => {
  const [showUserMenu, toggleUserMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const { profile } = user;

  const dispatch = useDispatch();
  const history = useHistory();

  const toggleNav = () => {
    document.querySelector('#nav-content').classList.toggle('hidden');
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
    execPostNav();
  };

  const userMenuNavHandler = () => {
    history.push('/profile');
    execPostNav();
  };

  const navHandler = (route) => {
    history.push(`/${route}`);
    execPostNav();
  };

  const execPostNav = () => {
    toggleUserMenu(false);
    toggleNav();
  };

  return (
    <header>
      <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full'>
        <div
          className='flex items-center flex-shrink-0 text-white mr-6'
          onClick={() => navHandler('')}
        >
          <span className='text-4xl pl-2 cursor-pointer'>Kaizen</span>
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
          className='relative w-full flex-grow lg:flex items-center lg:w-auto hidden pt-6 lg:pt-0'
          id='nav-content'
        >
          <ul className='lg:flex justify-end flex-1 items-center'>
            <li>
              <div
                className='py-2 px-4 text-xl text-white no-underline flex cursor-pointer'
                onClick={() => navHandler('cart')}
              >
                <i className='ri-shopping-cart-fill px-2 text-blue-400'></i>
                <p>Cart</p>
              </div>
            </li>
            {profile ? (
              <li className='mr-3 relative max-w-xs'>
                <div
                  className='py-2 px-4 text-xl text-white no-underline flex cursor-pointer'
                  onClick={() => toggleUserMenu(!showUserMenu)}
                >
                  <i className='ri-user-fill px-2 text-blue-400'></i>
                  <p>{profile.name}</p>
                </div>
                {showUserMenu && (
                  <div className='absolute right-0 min-w-48 w-full mt-2 text-sm origin-top-right bg-gray-800 text-white z-10 border border-gray-700'>
                    <div
                      className='h-12 px-4 py-2 text-lg border-b-2 border-gray-700 cursor-pointer hover:bg-gray-700 flex'
                      onClick={userMenuNavHandler}
                    >
                      <i className='ri-arrow-right-s-line px-2 text-blue-400'></i>
                      <p>Profile</p>
                    </div>
                    <div
                      className='h-12 px-4 py-2 text-lg cursor-pointer hover:bg-gray-700 flex'
                      onClick={logoutHandler}
                    >
                      <i className='ri-arrow-right-s-line px-2 text-blue-400'></i>
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li className='mr-3'>
                <div
                  className='py-2 px-4 text-xl text-white no-underline flex cursor-pointer'
                  onClick={() => navHandler('login')}
                >
                  <i className='ri-user-fill px-2 text-blue-400'></i>
                  <p>Login</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
