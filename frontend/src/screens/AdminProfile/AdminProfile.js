import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import Main from './Main';

const sidebarMenuItems = {
  details: {
    icon: 'ri-pencil-fill',
    label: 'Details',
    id: 'sidebar-menu-details',
  },
  users: {
    icon: 'ri-user-fill',
    label: 'Users',
    id: 'sidebar-menu-users',
  },
  products: {
    icon: 'ri-archive-fill',
    label: 'Products',
    id: 'sidebar-menu-products',
  },
  orders: {
    icon: 'ri-bill-fill',
    label: 'Orders',
    id: 'sidebar-menu-orders',
  },
};

const AdminProfile = () => {
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(sidebarMenuItems['details']);
  const [mobileSidebar, toggleMobileSidebar] = useState(false);

  useEffect(() => {
    var itemName = location.pathname.split('/')[2];
    if (sidebarMenuItems[itemName]) {
      setActiveItem(sidebarMenuItems[itemName]);
    } else {
      setActiveItem(sidebarMenuItems['details']);
    }
  }, [location]);

  const toggleSidebar = () => {
    var sidebar = document.querySelector('#profile-sidebar');
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('-translate-x-24');
    sidebar.classList.toggle('translate-x-0');
    sidebar.classList.toggle('absolute');
    toggleMobileSidebar(!mobileSidebar);
  };

  return (
    <div className='flex relative h-screen'>
      <Sidebar activeItem={activeItem} menuItems={sidebarMenuItems} />
      <button
        className='absolute top-0 right-0 sm:hidden text-3xl py-4 px-8'
        onClick={toggleSidebar}
      >
        <i
          className={`${mobileSidebar ? 'ri-close-line' : 'ri-menu-3-line'}`}
        ></i>
      </button>
      <Main activeItem={activeItem} />
    </div>
  );
};

export default AdminProfile;
