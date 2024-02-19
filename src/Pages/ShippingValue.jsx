import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import { Box, Paper, Link, Button, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { API } from "../API";
import axios from "axios";
import AttributeValueAdd from '../Components/AttributeValueAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AttributeValueList from '../Components/AttributeValueList';
import AddFreeShipping from '../Components/AddFreeShipping';

const ShippingValue = () => {
    const { id } = useParams();
    const [shipping, setSingleShipping] = useState({});

    const fetchShipping = async () => {
        const responseObj = await axios.get(`${API}/singleShipping/${id}`);
        const response = responseObj.data.data
        setSingleShipping(response);
    }

    const [shippingValues, setShippingValues] = useState([]);

    const fetchAllShippingValues = async () => {
        try {
            const response = await axios.get(`${API}/getSpecificFreeShippingValue/${id}`);
            setShippingValues(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchShipping()
        fetchAllShippingValues();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, px: 3, mt: 10, ml: 30 }} >
            <Navbar />
            <Typography variant="h5" sx={{ my: 2, fontWeight: 800 }}>
                Shipping Values
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
                <Link component={RouterLink} to={"/shipping"} underline='none' fontWeight={800}>
                    Shipping
                </Link>
                <KeyboardArrowRightIcon fontSize='small' />
                <Typography variant='body' textTransform={'capitalize'} fontWeight={600}>
                    {shipping.shippingName}
                </Typography>
            </Box>

            <Paper sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }} >
                <Box my={'15px'}>
                    <Button sx={{ mr: 1 }}>
                        {/* <AddFreeShipping
                            fetchAllShippingValues={fetchAllShippingValues}
                        /> */}
                    </Button>
                    <Button startIcon={<EditIcon />}
                        sx={{
                            mr: 2, backgroundColor: '#bbbfbc', color: '#ffffff',
                            '&:hover': { backgroundColor: '#bbbfbc' }
                        }}> Bulk Action
                    </Button>
                    <Button startIcon={<DeleteIcon />}
                        sx={{
                            backgroundColor: '#ed5342', color: '#ffffff',
                            '&:hover': { backgroundColor: '#ed5342' }
                        }}> Delete
                    </Button>
                </Box>
            </Paper>
            <Box my={2}>
                {/* <AttributeValueList shippingValues={shippingValues} key={shippingValues?._id}
                    fetchAllShippingValues={fetchAllShippingValues}
                /> */}
            </Box>
        </Box>
    )
}

export default ShippingValue;