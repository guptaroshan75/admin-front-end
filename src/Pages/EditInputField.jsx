import React, { useEffect, useState } from 'react';
import {
    Grid, Typography, Box, TextField, MenuItem, FormControl,
    OutlinedInput, InputAdornment, InputLabel, Select, Chip
} from '@mui/material';
import { API } from '../API';
import axios from 'axios';

const EditInputField = ({
    editProduct, handleChangeInput, handleFileUpload, categories, attribute }) => {
    const [selectedAttribute, setSelectedAttribute] = useState("");

    const handleAttributeChange = (e) => {
        setSelectedAttribute(e.target.value);
    };

    const [attributeValues, setAttributeValues] = useState([])
    useEffect(() => {
        if (selectedAttribute) {
            const fetchAttributeValues = async () => {
                try {
                    const response = await
                        axios.get(`${API}/getSpecificAttributeValueName/${selectedAttribute}`);
                    console.log(response.data.data);
                    setAttributeValues(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchAttributeValues();
        }
    }, [selectedAttribute]);
    return (
        <>
            <Box sx={{ px: 4, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 1 }}>
                                Product Title/Name
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField name='productName' value={editProduct.productName}
                                variant="outlined" fullWidth type={'text'}
                                error={!editProduct.productName} required
                                placeholder={'Password is required *'}
                                onChange={handleChangeInput} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Product Description
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField
                                id="outlined-multiline-static" multiline required
                                rows={3} name='description' value={editProduct.description}
                                variant="outlined" onChange={handleChangeInput}
                                sx={{ mt: 5 }} type={'text'} fullWidth
                                error={!editProduct.description}
                                placeholder={'Password is required *'}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant="h6" sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Product Images
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField
                                id="image-input" type="file" sx={{ mt: 5 }}
                                inputProps={{ accept: '.jpeg, .png, .jpg' }}
                                variant="outlined" name='myImage' fullWidth
                                onChange={handleFileUpload}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant='h6'>
                                Product SKU
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField id="outlined-basic" name='productSKU'
                                value={editProduct.productSKU}
                                variant="outlined" sx={{ mt: 5, }} type={'text'}
                                error={!editProduct.productSKU} required fullWidth
                                placeholder={'Product SKU is required *'}
                                onChange={handleChangeInput} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Product Barcode
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField id="outlined-basic" name='productBarcode'
                                value={editProduct.productBarcode} required fullWidth
                                variant="outlined" sx={{ mt: 5, }} type={'text'}
                                onChange={handleChangeInput} error={!editProduct.productBarcode}
                                placeholder={'Product Barcode is required *'} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Category
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <FormControl fullWidth sx={{ mt: 5 }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select name={"category"}
                                    value={editProduct.category} error={!editProduct.category}
                                    label={"category"} type={'text'} onChange={handleChangeInput}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category?._id} value={category?.catName}
                                            data-attribute={category?._id}>
                                            {category.catName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Attributes
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <FormControl fullWidth sx={{ mt: 5 }}>
                                <InputLabel id="demo-simple-select-label">Attributes</InputLabel>
                                <Select name={"attributes"} label={"attributes"} type={'text'}
                                    id="attribute-select"
                                    value={editProduct.attributes} error={!editProduct.attributes}
                                    onChange={(e) => {
                                        handleChangeInput(e);
                                        handleAttributeChange(e);
                                    }}
                                >
                                    {
                                        attribute.map((attribute) => (
                                            <MenuItem key={attribute?._id}
                                                value={attribute.attName}
                                                data-attribute={attribute?._id}>
                                                {attribute.attName}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                
                {editProduct && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}>
                                    Attribute Values
                                </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <FormControl fullWidth sx={{ mt: 5 }}>
                                    <InputLabel id="demo-multiple-chip-label">
                                        Attribute Values
                                    </InputLabel>
                                    <Select labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        value={editProduct.attributesValue}
                                        onChange={(e) => {
                                            handleChangeInput(e);
                                            handleAttributeChange(e)
                                        }}
                                        multiple name={"attributesValue"} type={'text'}
                                        input={<OutlinedInput id="select-multiple-chip"
                                            label="Attribute Values" />}
                                        renderValue={(selected) => (
                                            <Box sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap', gap: 0.5
                                            }}
                                            >
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {attributeValues.map((attributeValue) => (
                                            <MenuItem
                                                key={attributeValue._id}
                                                value={attributeValue.displayName}
                                            >
                                                {attributeValue.displayName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Product Price
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <FormControl fullWidth sx={{ mt: 5 }}>
                                <OutlinedInput onChange={handleChangeInput}
                                    error={!editProduct.price} required type={'number'}
                                    placeholder={'Product Price is required *'}
                                    name='price' value={editProduct.price} startAdornment={
                                        <InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Sale Price
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <FormControl fullWidth sx={{ mt: 5 }} >
                                <OutlinedInput onChange={handleChangeInput} name='salePrice'
                                    error={!editProduct.salePrice} required
                                    placeholder={'Sale Price is required *'} type={'number'}
                                    value={editProduct.salePrice} startAdornment={
                                        <InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant='h6'>
                                Product Quantity
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField id="outlined-basic" name='productQuantity'
                                value={editProduct.productQuantity} fullWidth
                                error={!editProduct.productQuantity} required
                                placeholder={'Product Quantity is required *'}
                                variant="outlined" sx={{ mt: 5, }} type={'number'}
                                onChange={handleChangeInput} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant='h6'>
                                Product Slug
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField id="outlined-basic" name='productSlug'
                                value={editProduct.productSlug} required fullWidth
                                variant="outlined" sx={{ mt: 5, }} type={'text'}
                                onChange={handleChangeInput} error={!editProduct.productSlug}
                                placeholder={'Product Slug is required *'}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Product Tags
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField id="outlined-basic" name='productTags'
                                value={editProduct.productTags} required fullWidth
                                variant="outlined" sx={{ mt: 5, }} type={'text'}
                                onChange={handleChangeInput} error={!editProduct.productTags}
                                placeholder={'Product Tags is required *'}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography variant='h6' sx={{ mt: 5, ml: 5, mx: 0 }}>
                                Published
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField name='published' type={'text'}
                                variant="outlined" select={'true'}
                                value={editProduct.published}
                                onChange={handleChangeInput}
                                sx={{ mt: 5 }} fullWidth
                                label="Published" error={!editProduct.published}
                            >
                                <MenuItem value={"Out Of Stock"}> Out Of Stock </MenuItem>
                                <MenuItem value={"In Stock"}> In Stock </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box> */}
            </Box >
        </>
    )
}

export default EditInputField;