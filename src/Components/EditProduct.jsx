import React, { useState, useEffect } from 'react';
import { Button, Dialog, Box } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
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
    const [categories, setCategories] = useState([]);
    const [attribute, setAttribute] = useState([]);

    const fetchAllCategory = async () => {
        try {
            const response = await axios.get(`${API}/getAllCategories`);
            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllAttribute = async () => {
        try {
            const response = await axios.get(`${API}/getAttribute`);
            setAttribute(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCategory();
        fetchAllAttribute();
    }, [])

    const handleChangeInput = (e) => {
        setEditProduct({
            ...editProduct,
            [e.target.name]: e.target.value
        });
    }

    const handleFileUpload = (e) => {
        setEditProduct({
            ...editProduct,
            myImage: e.target.files[0]
        });
    };

    const handleUpdateProduct = async (_id) => {
        const formData = new FormData();
        formData.append('myImage', editProduct.myImage);
        formData.append('productName', editProduct.productName);
        formData.append('description', editProduct.description);
        formData.append('productSKU', editProduct.productSKU);
        formData.append('productBarcode', editProduct.productBarcode);
        formData.append('category', editProduct.category);
        formData.append('attributes', editProduct.attributes);
        formData.append('attributesValue', editProduct.attributesValue);
        formData.append('price', editProduct.price);
        formData.append('salePrice', editProduct.salePrice);
        formData.append('productQuantity', editProduct.productQuantity);
        formData.append('productSlug', editProduct.productSlug);
        formData.append('productTags', editProduct.productTags);
        try {
            const productData = {
                ...editProduct,
                published: product.published,
            };
            await axios.put(`${API}/updateProduct/${_id}`, formData, productData);
            toast.success("Product updated Successfully");
            fetchAllProduct();
            toggeleHandleClick();
        } catch (error) {
            console.log(error);
        }
    }

    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
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
                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 2, mb: 3 }}>
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

                <Box sx={{ width: '100%', typography: 'body1', my: 3 }}>
                    <EditInputField handleChangeInput={handleChangeInput}
                        editProduct={editProduct} handleFileUpload={handleFileUpload}
                        categories={categories} attribute={attribute}
                    />
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