import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Sidebar = ({ setActiveItem, menuItems }) => {
  const [lastActiveMenuItem, setLastActiveMenuItem] = useState(menuItems[0]);

  const activeMenuItemHandler = (menuItem) => {
    var lastActiveElement = document.querySelector(`#${lastActiveMenuItem.id}`);
    lastActiveElement.classList.remove('border-blue-400');
    lastActiveElement.classList.add('border-gray-900');

    setLastActiveMenuItem(menuItem);
    setActiveItem(menuItem);
    var element = document.querySelector(`#${menuItem.id}`);
    element.classList.remove('border-gray-900');
    element.classList.add('border-blue-400');
  };

  useEffect(() => {
    activeMenuItemHandler(lastActiveMenuItem);
  }, []);

  return (
    <>
      <SidebarContainer
        id='profile-sidebar'
        className='hidden transform -translate-x-24 sm:translate-x-0 w-24 lg:w-2/12 sm:flex flex-col items-start h-screen bg-gray-900 text-white'
      >
        <SidebarMenu className='flex flex-col items-center w-full list-none'>
          {menuItems.map((menuItem, index) => {
            return (
              <SidebarMenuItem
                className={
                  'cursor-pointer w-full border-l-4 hover:border-blue-400 border-gray-900 hover:bg-opacity-25 hover:bg-gray-800 px-8 py-4 flex flex-row items-center justify-start'
                }
                key={menuItem.label}
                id={menuItem.id}
                onClick={() => activeMenuItemHandler(menuItem)}
              >
                <Icon className='text-xl'>
                  <i className={menuItem.icon}></i>
                </Icon>
                <SidebarMenuLabel className='hidden lg:block leading-normal text-xl text-left py-2 ml-4'>
                  {menuItem.label}
                </SidebarMenuLabel>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.div``;

const SidebarMenu = styled.div``;

const SidebarMenuItem = styled.li`
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.125);
  &:hover {
    border-bottom-color: rgba(255, 255, 255, 0.125);
  }
`;

const Icon = styled.div``;

const SidebarMenuLabel = styled.p``;

export default Sidebar;
