import React, { useState } from 'react';

import { useSelector } from 'react-redux'
import { NavLink, Link, useLocation } from 'react-router-dom'

import styles from './MainNav.module.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from "@mui/material/Container";

const homePaths = ['/new-session', '/active-session']
const MainNav = props => {
    const user = useSelector((state) => state.user)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const location = useLocation()

    console.log(location.pathname)

    const pages = [
        <NavLink to="/home" className={({ isActive }) => (isActive || homePaths.includes(location.pathname)) ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`}>Home</NavLink>,
        <NavLink to="/sessions" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`}>Sessions</NavLink>
    ]

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        // <header className={styles.header}>
        //     <ul className={styles.nav}>
        //         <li><div className={styles.logo}><img src="/logo.png" alt="navigation logo" /></div></li>
        //         <li><NavLink to="/home">Home</NavLink></li>
        //         {app.isTokenActive && <li><NavLink to="/sessions">Sessions</NavLink></li>}
        //         {!app.isTokenActive && <li><button>Login</button></li>}
        //     </ul>
        // </header>


        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <GolfCourseIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GOLF
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem color="inherit" key={Math.random()} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <GolfCourseIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GOLF
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={Math.random()}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>


                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink to="/home">Home</NavLink>
                    </Typography>
                    {app.isTokenActive && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink to="/sessions">Sessions</NavLink>
                    </Typography>} */}

                    {!user.isLoggedIn && <Button component={NavLink} to="/login" color="inherit">Sign In</Button>}
                    {user.isLoggedIn && <Button component={NavLink} to="/logout" color="inherit">Sign Out</Button>}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default MainNav