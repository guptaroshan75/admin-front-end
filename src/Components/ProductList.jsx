import React, { useState } from 'react';
import { Box, Divider, FormControlLabel, Pagination, Switch, Typography, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EditProduct from './EditProduct';
import DeleteProduct from './DeletProduct';
import axios from 'axios';
import { API } from '../API';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';

const ProductList = ({ products, fetchAllProduct, searchProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleBadgeVisibility = async (productId) => {
        const updatedProducts = products.map(product => {
            if (product._id === productId) {
                console.log('inside', product.published);
                const updatedProduct = {
                    ...product,
                    published: product.published,
                };
                console.log('Updating visibility:', updatedProduct.published);
                console.log('Updated Product:', updatedProduct);
                updateVisibility(productId, updatedProduct.published);
                return updatedProduct;
            }
            return product;
        });
        fetchAllProduct(updateVisibility);
        return updatedProducts;
    };

    const updateVisibility = async (productId, checked) => {
        try {
            const response = await
                axios.put(`${API}/updateProductVisble/${productId}`, { published: checked });
            fetchAllProduct()
            toast.success("Product Visibility In DataBase");
            console.log(response.data);
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
                                        {console.log(product?._id)}
                                        <TableCell scope="row">
                                            {product.productName}
                                        </TableCell>
                                        <TableCell align="right">{product.productCategory}</TableCell>
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
                                        <TableCell align="right">{product.productCategory}</TableCell>
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
