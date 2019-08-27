import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const mainMenuItems = {
    items: [
      {
        id: 0,
        title: 'Find Activity',
        link: '/'
      },
      {
        id: 1,
        title: 'Archive',
        link: '/archive'
      },
      {
        id: 2,
        title: 'About',
        link: '/about'
      }
    ]
};

const getActiveMenuItemLink = () => {
    const url = window.location.href;
    const urlParts = url.split('/');
    const link = '/' + urlParts[ urlParts.length - 1 ];

    return link;
}

//The site header with main menu
const Header = () => {
    let [ forUpdatingFlag, updateComponent ] = useState(false);
    const activeMenuItemLink = getActiveMenuItemLink();

    //If url is the same as link the font is bold
    const styledItems = mainMenuItems.items.map(
    
        (item) => {
            const { id, title, link } = item;
            const isSelectedStyles = (link === activeMenuItemLink) ? {fontWeight: 600, color: '#fff'} : {};
            return (
                <MainMenuItem key={id}>
                    <Link to={link} style={isSelectedStyles} onClick={() => updateComponent(!forUpdatingFlag)} >{title}</Link>
                </MainMenuItem>
            );
        }

    );

    return (
        <HeaderContainer>
            <LogoContainer>
                <Logo>
                    <Link to="/" onClick={() => updateComponent(!forUpdatingFlag)} >WhatToD&#216;?</Link>
                </Logo>
            </LogoContainer>
            <MainMenuContainer>
                <MainMenuList>
                    {styledItems}
                </MainMenuList>
            </MainMenuContainer>
        </HeaderContainer>
    );
}

// Header styles
const HeaderContainer = styled.header`
    width: 100%;
    border-bottom: 1px solid #fff;
    height: 60px;
`;

const LogoContainer = styled.div`
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
`;

const Logo = styled.div`
    a {
        text-decoration: none;
        font-family: 'Satisfy', cursive;
        color: #fff;
        font-size: 30px;
    }
`;

const MainMenuContainer = styled.nav`
    width: calc(100% - 200px);
    float: right;
`;

const MainMenuList = styled.ul`
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
`;

const MainMenuItem = styled.li`
    a {
        display: inline-block;
        padding-left: 30px;
        text-align: center;
        font-family: 'Nunito Sans', sans-serif;
        cursor: pointer;
        text-decoration: none;
        color: #fff;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default Header;