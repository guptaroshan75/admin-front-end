import React, { useState } from 'react';
import { Button, Dialog, Box, Tab, Switch } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditInputField from "../Pages/EditInputField";
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../API';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditProduct = ({ product, fetchAllProduct }) => {
    const [editProduct, setEditProduct] = useState(product);

    const handleChangeInput = (e) => {
        setEditProduct({
            ...editProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setEditProduct({
            ...editProduct,
            myImage: base64,
        })
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = () => {
                reject(error)
            }
        })
    }

    const handleUpdateProduct = async (_id) => {
        try {
            await axios.put(`${API}/updateProduct/${_id}`, editProduct);
            toast.success("Product updated Successfully");
            fetchAllProduct();
            toggeleHandleClick();
            console.log('Product updated Successfully');
        } catch (error) {
            console.log(error);
        }
    }

    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const [value, setValue] = useState('1');

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Box>
            <Typography onClick={toggeleHandleClick}
                sx={{ '&:hover': { cursor: 'pointer' } }}
            >
                <EditNoteIcon sx={{
                    fontSize: 30, ml: 1, color: '#9e9e9e',
                    '&:hover': { color: '#53a65f' }
                }} />
            </Typography>
            <Dialog fullScreen sx={{ ml: 20 }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} variant={"h5"} >
                                Update Products
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} >
                                Update products info, combinations and extras.
                            </Typography>
                        </Box>
                        <IconButton edge="start"
                            sx={{
                                bgcolor: 'white',
                                '&:hover': { backgroundColor: '#f5b5b5', color: 'black' }
                            }}
                            color="error" onClick={toggeleHandleClick} aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    display: "flex", justifyContent: "flex-end", alignItems: "center",
                    fontSize: "18px", color: "red"
                }} > Does this product have variants?
                    <Switch sx={{ fontSize: "60px", }}
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeValue}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Basic Details" value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <EditInputField handleChangeInput={handleChangeInput}
                                editProduct={editProduct} handleFileUpload={handleFileUpload}
                            />
                        </TabPanel>

                    </TabContext>
                </Box>

                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 3 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={toggeleHandleClick} sx={{
                            borderRadius: 3, width: "50%",
                            height: "73%", backgroundColor: "#dbdbd9",
                            color: "red", '&:hover': { backgroundColor: '#fae6e6' }
                        }}
                            variant='contained'>Cancel
                        </Button>

                        <Button onClick={() => handleUpdateProduct(product?._id)} sx={{
                            ml: 2, borderRadius: 3, width: "50%", color: 'black',
                            height: "73%", backgroundColor: '#fffb0a', '&:hover': {
                                backgroundColor: '#f7f554'
                            }
                        }}
                            variant='contained' >Update Product
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
}

export default EditProduct