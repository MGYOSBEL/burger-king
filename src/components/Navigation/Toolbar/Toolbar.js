import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle toggle={props.menuToggle}/>
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isLoggedIn={props.isLoggedIn}/>
        </nav>
    </header>
);

export default toolbar;