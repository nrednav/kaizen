import React from 'react';

const ProfileMain = ({ activeItem }) => {
  return (
    <div className='flex flex-col py-4 px-8 w-full'>
      <h1 className='text-4xl w-full'>{activeItem.label}</h1>
      <div className='mt-4 h-full border border-black'>
        {getMainContent(activeItem.label)}
      </div>
    </div>
  );
};

const getMainContent = (label) => {
  switch (label) {
    case 'Details':
      return <div>Details content</div>;
    case 'Orders':
      return <div>Orders content</div>;
    default:
      return <div></div>;
  }
};

export default ProfileMain;
