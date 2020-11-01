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
  const [mobileSidebar, toggleMobileSidebar] = useState(false);

  const toggleSidebar = () => {
    var sidebar = document.querySelector('#profile-sidebar');
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('-translate-x-24');
    sidebar.classList.toggle('translate-x-0');
    sidebar.classList.toggle('absolute');
    sidebar.classList.toggle('min-h-screen');
    sidebar.classList.toggle('min-h-full');
    toggleMobileSidebar(!mobileSidebar);
  };

  return (
    <div className='flex relative'>
      <Sidebar setActiveItem={setActiveItem} menuItems={sidebarMenuItems} />
      <button
        className='absolute top-0 right-0 sm:hidden text-3xl py-4 px-8'
        onClick={toggleSidebar}
      >
        <i
          className={`${mobileSidebar ? 'ri-close-line' : 'ri-menu-3-line'}`}
        ></i>
      </button>
      <UserProfileMain activeItem={activeItem} />
    </div>
  );
};

export default UserProfile;
