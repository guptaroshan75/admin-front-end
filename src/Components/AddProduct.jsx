import React, { useState } from 'react';
import { Button, Dialog, Box, Switch } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import InputField from "../Pages/InputField";
import { toast } from 'react-toastify';
import { API } from '../API';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProduct = ({ handleChangeInput, fetchAllProduct,
    addProduct, setAddProduct, handleFileUpload
}) => {
    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleAddToProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/addProducts`, addProduct);
            toast.success("Product Creataed Successfully");
            setAddProduct({
                myImage: "",
                productName: '',
                description: '',
                productSKU: '',
                productBarcode: '',
                productCategory: '',
                productDefCategory: '',
                price: '',
                salePrice: '',
                productQuantity: '',
                productSlug: '',
                productTags: '',
            });
            fetchAllProduct();
            toggeleHandleClick();
            console.log('Product Added Successfully', response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Box>
            <Button onClick={toggeleHandleClick} variant="contained" startIcon={<AddIcon />}
                sx={{
                    p: '10px', my: '5px', backgroundColor: '#37ab4a', '&:hover': {
                        backgroundColor: '#37ab4a'
                    },
                }}> Add Product
            </Button>
            <Dialog fullScreen sx={{ ml: 20 }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} variant="h5" >
                                Add Product
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} >
                                Add your product and necessary information from here
                            </Typography>
                        </Box>
                        <IconButton edge="start" color="error"
                            sx={{
                                bgcolor: 'white',
                                '&:hover': { backgroundColor: '#f5b5b5', color: 'black' }
                            }}
                            onClick={toggeleHandleClick}
                            aria-label="close"
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
                    <Box sx={{ mt: 2, mb: 3 }}>
                        <Typography variant="h4" px={2}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                        > Basic Details
                        </Typography>
                    </Box>
                    <InputField handleChangeInput={handleChangeInput}
                        handleFileUpload={handleFileUpload}
                        addProduct={addProduct}
                    />
                </Box>

                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 3 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={toggeleHandleClick} sx={{
                            borderRadius: 3, width: "50%",
                            height: "73%", backgroundColor: "#dbdbd9", color: "red", '&:hover': {
                                backgroundColor: '#fae6e6',
                            }
                        }}
                            variant='contained'>Cancel
                        </Button>

                        <Button onClick={handleAddToProduct}
                            sx={{
                                ml: 2, borderRadius: 3, width: "50%",
                                height: "73%", backgroundColor: '#37ab4a', '&:hover': {
                                    backgroundColor: '#37ab4a'
                                }
                            }}
                            variant='contained'>Add Product
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
}

export default AddProduct;