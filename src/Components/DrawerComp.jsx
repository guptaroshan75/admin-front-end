import React from 'react';
import {
    Button, Menu, MenuItem, ListItemText, Link,
    List, Divider, ListItem, ListItemButton, ListItemIcon
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import WorkIcon from '@mui/icons-material/Work';
import MouseIcon from '@mui/icons-material/Mouse';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ExploreIcon from '@mui/icons-material/Explore';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DrawerComp = ({ open, Drawer, DrawerHeader }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.error('Logout Succesfully', {
            position: toast.POSITION.TOP_CENTER
        })
        navigate("/");
    };

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <List sx={{ display: 'flex', alignItems: 'center', mx: 'auto' }}>
                    <Link component={RouterLink} to={"/dashboard"}>
                        <Button variant='h1' sx={{ color: 'black', fontSize: '20px' }} >
                            <WorkIcon sx={{ mr: 2, color: '#5bc96b' }} />
                            Bst
                        </Button>
                    </Link>
                </List>
            </DrawerHeader>
            <Divider />
            <List>
                <Link component={RouterLink} to="/dashboard" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <GridViewIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Dashboard
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} to="/products" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <MouseIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Products
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} to="/category" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Categories
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} to="/attributes" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <HorizontalRuleIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Attributes
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} to="/Shipping" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <ShoppingBagIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Shipping
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} to="/blog" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <BookOnlineIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Blog
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} to="/gallery" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <BookOnlineIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Gallery
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} to="/orders" sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <ExploreIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0, color: 'black' }}>
                                Orders
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link sx={{ textDecoration: 'none' }}>
                    <ListItem disablePadding sx={{ ml: open ? 3 : 'auto', }}>
                        <ListItemButton sx={{ px: 2.5 }} onClick={handleLogout}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >  <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                                <ListItemText sx={{ color: 'black' }}>
                                    Log Out
                                </ListItemText>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Drawer >
    );
};


export default DrawerComp;
