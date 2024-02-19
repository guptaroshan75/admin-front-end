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

const AttributeValues = () => {
    const { id } = useParams();
    const [attribute, setSingleAttribute] = useState({});

    const fetchAttribute = async () => {
        const responseObj = await axios.get(`${API}/singleAttribute/${id}`);
        const response = responseObj.data.data
        setSingleAttribute(response);
    }

    const [attributeValues, setAttributeValues] = useState([]);

    const fetchAllAttributeValues = async () => {
        try {
            const response = await axios.get(`${API}/getSpecificAttributeValue/${id}`);
            setAttributeValues(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAttribute()
        fetchAllAttributeValues();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, px: 3, mt: 10, ml: 30 }} >
            <Navbar />
            <Typography variant="h5" sx={{ my: 2, fontWeight: 800 }}>
                Attribute Values
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
                <Link component={RouterLink} to={"/attributes"} underline='none' fontWeight={800}>
                    Attributes
                </Link>
                <KeyboardArrowRightIcon fontSize='small' />
                <Typography variant='body' textTransform={'capitalize'} fontWeight={600}>
                    {attribute.attName}
                </Typography>
            </Box>

            <Paper sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }} >
                <Box my={'15px'}>
                    <Button sx={{ mr: 1 }}>
                        <AttributeValueAdd 
                            fetchAllAttributeValues={fetchAllAttributeValues}
                        />
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
                <AttributeValueList attributeValues={attributeValues} key={attributeValues?._id}
                    fetchAllAttributeValues={fetchAllAttributeValues}
                />
            </Box>
        </Box>
    )
}

export default AttributeValues