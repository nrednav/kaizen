import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileMain from './ProfileMain';

const UserProfile = () => {
  let sidebarMenuItems = [
    {
      icon: 'ri-pencil-fill',
      label: 'Details',
      id: 'sidebar-menu-details',
    },
    {
      icon: 'ri-bill-fill',
      label: 'Orders',
      id: 'sidebar-menu-orders',
    },
  ];

  const [activeItem, setActiveItem] = useState('');

  return (
    <div className='flex'>
      <Sidebar setActiveItem={setActiveItem} menuItems={sidebarMenuItems} />
      <ProfileMain activeItem={activeItem} />
    </div>
  );
};

export default UserProfile;
