import React from 'react';

import ProfileDetails from '../../components/ProfileDetails';
import Users from './Users';
import Products from './Products';
import Orders from './Orders';

const mainContent = {
  Details: <ProfileDetails></ProfileDetails>,
  Users: <Users></Users>,
  Products: <Products></Products>,
  Orders: <Orders></Orders>,
};

const Main = ({ activeItem }) => {
  return (
    <div className='flex flex-col py-4 px-8 w-full'>
      <h1 className='text-4xl w-full'>{activeItem.label}</h1>
      <div className='mt-4 h-full'>{mainContent[activeItem.label]}</div>
    </div>
  );
};

export default Main;
