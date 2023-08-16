import React, { useEffect, useState } from 'react'
import { Grid, Stack, Typography, Box } from "@mui/material";
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../API';

const SingleProductPage = () => {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState({});

    const fetchProducts = async () => {
        const responseObj = await axios.get(`${API}/getSpecificProducts/${id}`);
        const response = responseObj.data.data[0]
        setSingleProduct(response);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, px: 3, mt: 10, ml: 30, }} >
            <Navbar />
            <Typography variant="h5" sx={{ mt: 3, fontWeight: 800 }}>
                Product Details
            </Typography>
            <Grid container spacing={5} mt={1}>
                <Grid item xs={12} sm={6} md={4} spacing={2} >
                    <Stack>
                        <img src={`${singleProduct.myImage}`} alt={singleProduct.productName} />
                    </Stack>
                </Grid>

                <Grid item mt={2} xs={12} sm={6} md={8} spacing={2}>
                    <Stack>
                        <Typography variant="h4" fontWeight={600}>
                            {singleProduct?.productName}
                        </Typography>
                    </Stack>

                    <Stack mt={1}>
                        <Typography> {singleProduct?.description} </Typography>
                    </Stack>

                    <Stack mt={1}>
                        <Typography variant="h6" fontWeight={600}>
                            Price : $ {singleProduct?.price}
                        </Typography>
                    </Stack>

                    <Stack mt={1}>
                        <Typography> Price : $ {singleProduct?.salePrice} </Typography>
                    </Stack>

                    <Stack mt={1}>
                        <Typography variant="h6" fontWeight={600}>
                            {singleProduct?.productSlug}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SingleProductPage;