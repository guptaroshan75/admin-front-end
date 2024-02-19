import React, { useEffect, useState } from 'react';
import { Button, Dialog, Box } from '@mui/material';
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
    addProduct, setAddProduct, handleFileUpload, categories
}) => {
    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    // const [categories, setCategories] = useState([]);
    const [attribute, setAttribute] = useState([]);

    // const fetchAllCategory = async () => {
    //     try {
    //         const response = await axios.get(`${API}/getAllCategories`);
    //         setCategories(response.data.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const fetchAllAttribute = async () => {
        try {
            const response = await axios.get(`${API}/getAttribute`);
            setAttribute(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllAttribute();
        // fetchAllCategory();
    }, []);

    const handleAddToProduct = async (e) => {
        const formData = new FormData();
        formData.append('myImage', addProduct.myImage);
        formData.append('productName', addProduct.productName);
        formData.append('description', addProduct.description);
        formData.append('productSKU', addProduct.productSKU);
        formData.append('productBarcode', addProduct.productBarcode);
        formData.append('category', addProduct.category);
        formData.append('attributes', addProduct.attributes);
        formData.append('attributesValue', addProduct.attributesValue);
        formData.append('price', addProduct.price);
        formData.append('salePrice', addProduct.salePrice);
        formData.append('productQuantity', addProduct.productQuantity);
        formData.append('productSlug', addProduct.productSlug);
        formData.append('productTags', addProduct.productTags);
        e.preventDefault();
        try {
            const response = await
                axios.post
                    (`${API}/addAttributeValue/${addProduct.category}/${addProduct.attributes}`
                        , formData);
            toast.success("Product Creataed Successfully");
            setAddProduct({
                myImage: null,
                productName: '',
                description: '',
                productSKU: '',
                productBarcode: '',
                category: '',
                attributes: '',
                attributesValue: [],
                price: '',
                salePrice: '',
                productQuantity: '',
                productSlug: '',
                productTags: '',
            });
            console.log(response);
            fetchAllProduct();
            toggeleHandleClick();
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
                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 2, mb: 3 }}>
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

                <Box sx={{ width: '100%', typography: 'body1', my: 3 }}>
                    <InputField handleChangeInput={handleChangeInput}
                        handleFileUpload={handleFileUpload} attribute={attribute}
                        addProduct={addProduct} categories={categories}
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