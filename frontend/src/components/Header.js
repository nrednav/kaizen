import React from 'react';

const Header = () => {
  const toggleNav = (e) => {
    e.preventDefault();
    document.querySelector('#nav-content').classList.toggle('hidden');
  };

  return (
    <header>
      <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <span className='text-2xl pl-2'>Kaizen</span>
        </div>

        <div class='block lg:hidden'>
          <button
            id='nav-toggle'
            onClick={toggleNav}
            class='flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white'
          >
            <svg
              class='fill-current h-3 w-3'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>

        <div
          className='w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-6 lg:pt-0'
          id='nav-content'
        >
          <ul className='lg:flex justify-end flex-1 items-center'>
            <li className='mr-3'>
              <a href='#' className='py-2 px-4 text-white no-underline flex'>
                <i className='ri-shopping-cart-line px-2 text-blue-400'></i>
                <p>Cart</p>
              </a>
            </li>
            <li className='mr-3'>
              <a href='#' className='py-2 px-4 text-white no-underline flex'>
                <i className='ri-user-line px-2 text-blue-400'></i>
                <p>Login</p>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
