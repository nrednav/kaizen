import React from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

const Sidebar = ({ activeItem, menuItems }) => {
  const history = useHistory();

  const activateMenuItem = (menuItem) => {
    // Unstyle the last active item
    var lastActiveElement = document.querySelector(
      '.sidebar-menu-item.border-blue-400'
    );
    lastActiveElement.classList.remove('border-blue-400');
    lastActiveElement.classList.add('border-gray-900');

    // Style current active item
    var element = document.querySelector(`#${menuItem.id}`);
    element.classList.remove('border-gray-900');
    element.classList.add('border-blue-400');

    history.push(`/profile/${menuItem.label.toLowerCase()}`);
  };

  return (
    <>
      <SidebarContainer
        id='profile-sidebar'
        className='sm:static hidden transform -translate-x-24 sm:translate-x-0 w-24 lg:w-2/12 sm:flex flex-col items-start min-h-full bg-gray-900 text-white z-10'
      >
        <SidebarMenu className='flex flex-col items-center w-full list-none'>
          {menuItems &&
            Object.keys(menuItems).map((key, index) => {
              return (
                <SidebarMenuItem
                  className={`sidebar-menu-item ${
                    activeItem.label === menuItems[key]['label']
                      ? 'border-blue-400'
                      : 'border-gray-900'
                  } cursor-pointer w-full border-l-4 hover:border-blue-400 hover:bg-opacity-25 hover:bg-gray-800 px-8 py-4 flex flex-row items-center justify-start`}
                  key={menuItems[key]['label']}
                  id={menuItems[key]['id']}
                  onClick={() => activateMenuItem(menuItems[key])}
                >
                  <Icon className='text-xl'>
                    <i className={menuItems[key]['icon']}></i>
                  </Icon>
                  <SidebarMenuLabel className='hidden lg:block leading-normal text-xl text-left py-2 ml-4'>
                    {menuItems[key]['label']}
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
