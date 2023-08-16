import React from 'react';
import {
    Typography, Box, TextField, MenuItem, FormControl, OutlinedInput, InputAdornment
} from '@mui/material';

const EditInputField = ({ editProduct, handleChangeInput, handleFileUpload }) => {
    return (
        <>
            <Box sx={{ px: 4, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Typography variant='h6' sx={{ mt: 1 }}>
                        Product Title/Name
                    </Typography>
                    <TextField name='productName' value={editProduct.productName}
                        variant="outlined" sx={{ width: '70%' }} type={'text'}
                        error={!editProduct.productName} required
                        placeholder={'Password is required *'}
                        onChange={handleChangeInput} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Product Description
                    </Typography>
                    <TextField
                        id="outlined-multiline-static" multiline required
                        rows={3} name='description' value={editProduct.description}
                        variant="outlined" onChange={handleChangeInput}
                        sx={{ width: '70%', mt: 5 }} type={'text'}
                        error={!editProduct.description}
                        placeholder={'Password is required *'}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Product Images
                    </Typography>
                    <TextField
                        id="image-input" type={"file"} sx={{ width: '70%', mt: 5 }}
                        inputProps={{ accept: '.jpeg, .png, .jpg' }}
                        variant="outlined" name='myImage'
                        onChange={handleFileUpload}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant='h6'>
                        Product SKU
                    </Typography>
                    <TextField id="outlined-basic" name='productSKU' value={editProduct.productSKU}
                        variant="outlined" sx={{ width: '70%', mt: 5, }} type={'text'}
                        error={!editProduct.productSKU} required
                        placeholder={'Product SKU is required *'}
                        onChange={handleChangeInput} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Product Barcode
                    </Typography>
                    <TextField id="outlined-basic" name='productBarcode'
                        value={editProduct.productBarcode} required
                        variant="outlined" sx={{ width: '70%', mt: 5, }} type={'text'}
                        onChange={handleChangeInput} error={!editProduct.productBarcode}
                        placeholder={'Product Barcode is required *'} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Category
                    </Typography>
                    <TextField name='productCategory' type={'text'}
                        variant="outlined" select={'true'}
                        value={editProduct.productCategory}
                        onChange={handleChangeInput}
                        sx={{ width: '70%', mt: 5 }}
                        label="Category" error={!editProduct.productCategory}
                    >
                        <MenuItem value={"Category 1"}> Category 1 </MenuItem>
                        <MenuItem value={"Category 2"}> Category 2 </MenuItem>
                        <MenuItem value={"Category 3"}> Category 3 </MenuItem>
                        <MenuItem value={"Category 4"}> Category 4 </MenuItem>
                    </TextField>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Default Category
                    </Typography>
                    <TextField
                        variant="outlined" error={!editProduct.productDefCategory}
                        select={'true'} name='productDefCategory' type={'text'}
                        value={editProduct.productDefCategory}
                        onChange={handleChangeInput}
                        sx={{ width: '70%', mt: 5 }}
                        label="Default Category"
                    >
                        <MenuItem value={"Category 4"}> Category 4 </MenuItem>
                        <MenuItem value={"Category 5"}> Category 5 </MenuItem>
                        <MenuItem value={"Category 6"}> Category 6 </MenuItem>
                        <MenuItem value={"Category 7"}> Category 7 </MenuItem>
                    </TextField>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Product Price
                    </Typography>
                    <FormControl fullWidth sx={{ width: '70%', mt: 5 }}>
                        <OutlinedInput onChange={handleChangeInput}
                            error={!editProduct.price} required
                            placeholder={'Product Price is required *'}
                            name='price' value={editProduct.price} type={'number'}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Sale Price
                    </Typography>
                    <FormControl fullWidth sx={{ width: '70%', mt: 5 }}>
                        <OutlinedInput onChange={handleChangeInput}
                            error={!editProduct.salePrice} required
                            placeholder={'Sale Price is required *'}
                            name='salePrice' value={editProduct.salePrice} type={'number'}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant='h6'>
                        Product Quantity
                    </Typography>
                    <TextField id="outlined-basic" name='productQuantity'
                        value={editProduct.productQuantity}
                        error={!editProduct.productQuantity} required
                        placeholder={'Product Quantity is required *'}
                        variant="outlined" sx={{ width: '70%', mt: 5, }} type={'number'}
                        onChange={handleChangeInput} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant='h6'>
                        Product Slug
                    </Typography>
                    <TextField id="outlined-basic" name='productSlug'
                        value={editProduct.productSlug} required
                        variant="outlined" sx={{ width: '70%', mt: 5, }} type={'text'}
                        onChange={handleChangeInput} error={!editProduct.productSlug}
                        placeholder={'Product Slug is required *'}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                        Product Tags
                    </Typography>
                    <TextField id="outlined-basic" name='productTags'
                        value={editProduct.productTags} required
                        variant="outlined" sx={{ width: '70%', mt: 5, }} type={'text'}
                        onChange={handleChangeInput} error={!editProduct.productTags}
                        placeholder={'Product Tags is required *'}
                    />
                </Box>

                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                       Published 
                    </Typography>
                    <TextField name='published' type={'text'}
                        variant="outlined"  select={'true'}
                        value={editProduct.published}
                        onChange={handleChangeInput}
                        sx={{ width: '70%', mt: 5 }}
                        label="Published" error={!editProduct.published}
                    >
                        <MenuItem value={"Out Of Stock"}> Out Of Stock </MenuItem>
                        <MenuItem value={"In Stock"}> In Stock </MenuItem>
                    </TextField>
                </Box> */}
            </Box>
        </>
    )
}

export default EditInputField;