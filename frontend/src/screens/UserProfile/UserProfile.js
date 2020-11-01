import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UserProfileMain from './UserProfileMain';

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

  const [activeItem, setActiveItem] = useState(sidebarMenuItems[0]);

  const showSidebar = () => {};

  return (
    <div className='flex'>
      <Sidebar setActiveItem={setActiveItem} menuItems={sidebarMenuItems} />
      <UserProfileMain activeItem={activeItem} />
    </div>
  );
};

export default UserProfile;
