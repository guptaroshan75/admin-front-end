import React, { useState } from 'react';
import { Typography, Box, Dialog, Button, styled, Divider } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../API';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const DeleteProduct = ({ product, fetchAllProduct }) => {

    const handleDeleteProduct = async (_id) => {
        try {
            await axios.delete(`${API}/deleteProduct/${_id}`);
            toast.error("Product Deleted Successfully");
            fetchAllProduct();
        } catch (error) {
            console.log(error);
        }
    };
    const [open, setOpen] = useState(false);

    const toggelHandleClickOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Typography onClick={toggelHandleClickOpen} sx={{
                '&:hover': {
                    cursor: 'pointer',
                    color: 'red'
                }
            }}
            >
                <DeleteOutlineIcon sx={{
                    fontSize: 25, ml: 1, color: '#9e9e9e',
                    '&:hover': { color: '#f58484' }
                }} />
            </Typography>
            <BootstrapDialog
                onClose={toggelHandleClickOpen}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <Box display={'flex'} justifyContent={'center'} my={3}>
                    <DeleteOutlineIcon sx={{ fontSize: 40, color: '#f58484', }} />
                </Box>
                <Box display={'flex'} justifyContent={'center'} mb={1}>
                    <Typography variant='h6'> Are You Sure! Want to Delete kk ? </Typography>
                </Box>
                <Box textAlign={'center'} mx={4} mb={5}>
                    <Typography variant="body1">
                        Do you really want to delete these records?
                        You can't view this in your list anymore if you delete!
                    </Typography>
                </Box>
                <Divider />
                <Box display={'flex'} justifyContent={'center'}
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}
                >
                    <Button onClick={toggelHandleClickOpen} variant="contained"
                        sx={{
                            ml: 2, my: 3, bgcolor: '#c1c7c3',
                            '&:hover': { bgcolor: 'white', color: 'black' }
                        }} > No, Keep It
                    </Button>
                    <Button sx={{ ml: 2, my: 3, bgcolor: '#3b9c55', '&:hover': { bgcolor: '#357546' } }}
                       onClick={() => handleDeleteProduct(product?._id)} variant="contained"
                    >
                        Yes, Delete It
                    </Button>
                </Box>
            </BootstrapDialog>
        </div>
    );
}

export default DeleteProduct;