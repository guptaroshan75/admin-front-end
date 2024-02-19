import React, { useEffect, useState } from 'react';
import { Box, Divider, FormControlLabel, Pagination, } from '@mui/material';
import { Table, TableBody, TableHead, TableRow, Link } from '@mui/material';
import { TableCell, TableContainer, Switch, Typography, Paper } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EditProduct from './EditProduct';
import DeleteProduct from './DeletProduct';
import axios from 'axios';
import { API } from '../API';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';

const ProductList = ({ products, fetchAllProduct, searchProducts, categories }) => {
    const updateCategory = async (categoryId, category) => {
        try {
            await axios.put(`${API}/updateProductWithCat/${categoryId}`, { category: category });
            fetchAllProduct()
            // toast.success("Product Visibility In DataBase");
        } catch (error) {
            console.error(error.message);
        }
    };

    // const ShowUpdate = (categoryId) => {
    //     const updatedProducts = products.map((product) => {
    //         const updatedProductCat = categories.map(category => {
    //             if (category._id === product.categoryId) {
    //                 const updatedProduct = {
    //                     ...product,
    //                     category: product.category,
    //                 };
    //                 updateCategory( updatedProduct.category);
    //                 return updatedProduct;
    //             }
    //             return category;
    //         })
    //         fetchAllProduct(updateCategory);
    //         return updatedProductCat;
    //     });
    //     fetchAllProduct(updateCategory);
    //     return updatedProducts;
    // }
    // const updatedProducts = ShowUpdate();

    const ShowUpdate = (categoryId) => {
        const updatedProducts = products.map((product) => {
            const categoryMatch =
                categories.find((category) => category._id === product.categoryId);
            if (categoryMatch) {
                return {
                    ...product,
                    category: categoryMatch.catName,
                };
            }
            updateCategory(categoryId, categoryMatch);
            return product;
        });
        return updatedProducts;
    }
    const updatedProducts = ShowUpdate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleProducts = updatedProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleBadgeVisibility = async (productId) => {
        const updatedProducts = products.map(product => {
            if (product._id === productId) {
                const updatedProduct = {
                    ...product,
                    published: product.published,
                };
                updateVisibility(productId, updatedProduct.published);
                return updatedProduct;
            }
            return product;
        });
        fetchAllProduct(updateVisibility);
        return updatedProducts;
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const updateVisibility = async (productId, checked) => {
        try {
            await axios.put(`${API}/updateProductVisble/${productId}`, { published: checked });
            fetchAllProduct()
            toast.success("Product Visibility In DataBase");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <Box style={{ height: 400, width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell scope="row"> PRODUCT NAME </TableCell>
                                <TableCell align="right"> CATEGORY </TableCell>
                                <TableCell align="right"> PRICE </TableCell>
                                <TableCell align="right"> SALE PRICE </TableCell>
                                <TableCell align="right"> STOCK </TableCell>
                                <TableCell align="right"> STATUS </TableCell>
                                <TableCell align="right"> VIEW </TableCell>
                                <TableCell align="right"> PUBLISHED </TableCell>
                                <TableCell align="right"> ACTIONS </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchProducts.length > 0 ? (
                                searchProducts.map((product) => (
                                    <TableRow key={product?._id}>
                                        <TableCell scope="row">
                                            {product.productName}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 800 }}>
                                            {product.category}
                                        </TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right">{product.salePrice}</TableCell>
                                        <TableCell align="right">{product.productQuantity}</TableCell>
                                        <TableCell align="right">{product.status}</TableCell>
                                        <TableCell align="right">
                                            <Link underline='none' component={RouterLink}
                                                to={`/singleProduct/${product?._id}`}
                                            >
                                                <ZoomInIcon sx={{ fontSize: 30, color: '#9e9e9e' }} />
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <FormControlLabel
                                                sx={{ color: 'text.primary' }}
                                                control={
                                                    <Switch
                                                        checked={product.published}
                                                        onChange={() => handleBadgeVisibility(product._id)}
                                                    />
                                                }
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box display={'flex'} format="" alignItems={'center'}>
                                                <Typography>
                                                    <EditProduct product={product}
                                                        fetchAllProduct={fetchAllProduct}
                                                    />
                                                </Typography>
                                                <Typography>
                                                    <DeleteProduct product={product}
                                                        fetchAllProduct={fetchAllProduct}
                                                    />
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                visibleProducts.map((product) => (
                                    <TableRow key={product?._id}>
                                        <TableCell scope="row">
                                            {product.productName}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 800 }}>
                                            {product.category}
                                        </TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right">{product.salePrice}</TableCell>
                                        <TableCell align="right">{product.productQuantity}</TableCell>
                                        <TableCell align="right">{product.status}</TableCell>
                                        <TableCell align="right">
                                            <Link underline='none' component={RouterLink}
                                                to={`/singleProduct/${product?._id}`}
                                            >
                                                <ZoomInIcon sx={{ fontSize: 30, color: '#9e9e9e' }} />
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <FormControlLabel
                                                sx={{ color: 'text.primary' }}
                                                control={
                                                    <Switch
                                                        checked={product.published}
                                                        onChange={() => handleBadgeVisibility(product._id)}
                                                    />
                                                }
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box display={'flex'} format="" alignItems={'center'}>
                                                <Typography>
                                                    <EditProduct product={product}
                                                        fetchAllProduct={fetchAllProduct}
                                                    />
                                                </Typography>
                                                <Typography>
                                                    <DeleteProduct product={product}
                                                        fetchAllProduct={fetchAllProduct}
                                                    />
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )))
                            }
                        </TableBody>
                    </Table>
                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} my={2}>
                        <Pagination count={Math.ceil(products.length / itemsPerPage)}
                            page={currentPage} onChange={handlePageChange} color="primary"
                        />
                    </Box>
                </TableContainer>
            </Box>
        </>
    );
}

export default ProductList;
