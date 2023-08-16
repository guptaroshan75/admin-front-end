import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Toolbar, CssBaseline, Typography, IconButton, Avatar, MenuItem, Tooltip, Menu }
    from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComponent from './DrawerComp';
import LogoutIcon from '@mui/icons-material/Logout';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        toast.error('Logout Succesfully', {
            position: toast.POSITION.TOP_CENTER
        })
        navigate("/");
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap component="div" sx={{ px: 2 }}>
                            BST
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <Tooltip title="Profile Settings">
                                        <Avatar sx={{ bgcolor: '#f5310f', mx: 2, p: 3 }}
                                            {...bindTrigger(popupState)}
                                        >
                                            BST
                                        </Avatar>
                                    </Tooltip>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem >
                                            <GridViewIcon sx={{ mr: 2 }} /> Profile
                                        </MenuItem>
                                        <MenuItem >
                                            <SettingsIcon sx={{ mr: 2 }} /> My account
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon sx={{ mr: 2 }} /> Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </PopupState>
                    </Box>
                </Toolbar>
            </AppBar>

            <DrawerComponent open={open} Drawer={Drawer} DrawerHeader={DrawerHeader} />
            {/* <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
                <DrawerHeader />
                <Typography variant="h5"> Dashboard Overview </Typography>
            </Box> */}
        </Box>
    );
}
export default Navbar;
