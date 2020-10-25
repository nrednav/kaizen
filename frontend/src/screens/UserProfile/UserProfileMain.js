import React from 'react';
import UserProfileDetails from './UserProfileDetails';
import UserProfileOrders from './UserProfileOrders';

const UserProfileMain = ({ activeItem }) => {
  return (
    <div className='flex flex-col py-4 px-8 w-full'>
      <h1 className='text-4xl w-full'>{activeItem.label}</h1>
      <div className='mt-4 h-full'>{getMainContent(activeItem.label)}</div>
    </div>
  );
};

const getMainContent = (label) => {
  switch (label) {
    case 'Details':
      return <UserProfileDetails></UserProfileDetails>;
    case 'Orders':
      return <UserProfileOrders></UserProfileOrders>;
    default:
      return <div></div>;
  }
};

export default UserProfileMain;
