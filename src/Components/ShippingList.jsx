import React, { useEffect, useState } from 'react';
import { Box, Divider, Pagination, Typography, Button, Stack } from '@mui/material';
import { TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import { Table, TableBody, TableCell, } from '@mui/material';
import axios from 'axios';
import { API } from '../API';
import { toast } from 'react-toastify';
// import EditAttribute from './EditAttribute';
// import DeleteAttributes from './DeleteAttributes';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link as RouterLink } from 'react-router-dom';
import AddFreeShipping from './AddFreeShipping';
import AddUPS from './AddUPS';
import EditFreeShipping from './EditFreeShipping';
import EditUPS from './EditUPS';
import DeleteFreeShipping from './DeleteFreeShipping';
import DeleteUPS from './DeletUPS';

const ShippingList = ({ fetchAllShipping, shipping }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleShipping = shipping.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const [freeShipping, setFreeShipping] = useState([]);
    const fetchAllFreeShipping = async () => {
        try {
            const response = await axios.get(`${API}/getAllFreeShipping`);
            setFreeShipping(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [upsShipping, setUpsShipping] = useState([]);
    const fetchAllUpsShipping = async () => {
        try {
            const response = await axios.get(`${API}/getAllUPS`);
            setUpsShipping(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllFreeShipping();
        fetchAllUpsShipping();
    }, []);

    //     // const handleBadgeVisibility = async (attId) => {
    //     //     const updatedAttributes = attribute.map(attributeP => {
    //     //         if (attributeP._id === attId) {
    //     //             const updatedAttribute = {
    //     //                 ...attributeP,
    //     //                 published: attributeP.published,
    //     //             };
    //     //             updateVisibility(attId, updatedAttribute.published);
    //     //             return updatedAttribute;
    //     //         }
    //     //         return attributeP;
    //     //     });
    //     //     fetchAllAttribute(updateVisibility);
    //     //     return updatedAttributes;
    //     // };

    //     // const updateVisibility = async (attId, checked) => {
    //     //     try {
    //     //         const response = await
    //     //             axios.put(`${API}/updateAttributeVisble/${attId}`, { published: checked });
    //     //         fetchAllAttribute()
    //     //         toast.success("Attribute Visibility In DataBase");
    //     //         console.log(response.data);
    //     //     } catch (error) {
    //     //         console.error(error.message);
    //     //     }
    //     // };

    return (
        <Box style={{ height: 400, width: '100%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell scope="row"> ID </TableCell>
                            <TableCell align="right"> SHIPPING METHOD </TableCell>
                            <TableCell align="right"> STATUS </TableCell>
                            <TableCell align="right"> SORT ORDER </TableCell>
                            <TableCell align="right"> ACTIONS </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleShipping.map((shipping) => (
                            <TableRow key={shipping?._id}>
                                <TableCell scope="row" sx={{ fontWeight: 800 }}>
                                    {shipping._id.slice(-4)}
                                </TableCell>
                                <TableCell align="right"> {shipping.shippingName} </TableCell>
                                {shipping.shippingName === 'Free Shipping' && (
                                    <>
                                        {freeShipping.map((freeShipping) => (
                                            <>
                                                <TableCell align="right">
                                                    {freeShipping.status}
                                                </TableCell>
                                                <>
                                                    <TableCell align="right"
                                                        key={freeShipping?._id}
                                                    >
                                                        {freeShipping.sortOrder}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Box display={"flex"} justifyContent={'flex-end'}>
                                                            <AddFreeShipping
                                                                fetchAllFreeShipping={fetchAllFreeShipping}
                                                            />
                                                            <>
                                                                <Typography>
                                                                    <EditFreeShipping
                                                                        fetchAllFreeShipping={fetchAllFreeShipping}
                                                                        freeShipping={freeShipping}
                                                                    />
                                                                </Typography>
                                                                <Typography>
                                                                    {/* <DeleteFreeShipping
                                                                    fetchAllFreeShipping={fetchAllFreeShipping}
                                                                    freeShipping={freeShipping}
                                                                /> */}
                                                                </Typography>
                                                            </>
                                                        </Box>
                                                    </TableCell>
                                                </>
                                            </>
                                        ))}
                                    </>
                                )}
                                {shipping.shippingName === 'UPS' && (
                                    <>
                                        {upsShipping.map((upsShipping) => (
                                            <>
                                                <TableCell align="right">
                                                    {upsShipping.status}
                                                </TableCell>
                                                <TableCell align="right"
                                                    key={upsShipping?._id}
                                                >
                                                    {upsShipping.sortOrder}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box display={"flex"} justifyContent={'flex-end'}>
                                                        <AddUPS
                                                            fetchAllUpsShipping={fetchAllUpsShipping}
                                                        />
                                                        <>
                                                            <Typography>
                                                                <EditUPS
                                                                    fetchAllUpsShipping={fetchAllUpsShipping}
                                                                    upsShipping={upsShipping}
                                                                />
                                                            </Typography>
                                                            <Typography>
                                                                {/* <DeleteUPS
                                                                    fetchAllUpsShipping={fetchAllUpsShipping}
                                                                    upsShipping={upsShipping}
                                                                /> */}
                                                            </Typography>
                                                        </>
                                                    </Box>
                                                </TableCell>
                                            </>
                                        ))
                                        }
                                        {/* <AddFreeShipping
                                                fetchAllFreeShipping={fetchAllFreeShipping}
                                            />
                                            <Box display={"flex"} justifyContent={'flex-end'}>
                                                <Typography>
                                                    <EditFreeShipping
                                                        freeShipping={freeShipping}
                                                    />
                                                </Typography>
                                                <Typography>
                                                    <DeleteAttributes />
                                                </Typography>
                                            </Box> */}
                                    </>
                                )}
                                {/* <TableCell align="right">
                                        <Link underline='none' component={RouterLink}
                                            to={`/shipping-values/${shipping?._id}`}
                                        >
                                            <Box display={'flex'} justifyContent={'flex-end'}>
                                                <Typography>
                                                    <EditNoteIcon sx={{
                                                        fontSize: 35, ml: 1, color: "#9e9e9e",
                                                        "&:hover":
                                                            { color: "#53a65f", cursor: 'pointer' }
                                                    }}
                                                    />
                                                </Typography>
                                            </Box>
                                        </Link>
                                        <AddFreeShipping />
                                    </TableCell> */}

                                {/* <TableCell align="right">
                                    {shipping.shippingName === 'Free Shipping' && (
                                        <>
                                            <AddFreeShipping
                                                fetchAllFreeShipping={fetchAllFreeShipping}
                                            />
                                            <Box display={"flex"} justifyContent={'flex-end'}>
                                                <Typography>
                                                    <EditFreeShipping
                                                        freeShipping={freeShipping}
                                                    />
                                                </Typography>
                                                <Typography>
                                                    <DeleteAttributes />
                                                </Typography>
                                            </Box>
                                        </>
                                    )}
                                    {shipping.shippingName === 'UPS' && (
                                        <AddUPS
                                            fetchAllFreeShipping={fetchAllFreeShipping}
                                        />
                                    )}
                                </TableCell> */}
                                {/* <TableCell align="right">
                                    <Box display={"flex"} justifyContent={'flex-end'} >
                                        <Typography>
                                                <EditAttribute />
                                            </Typography>
                                            <Typography>
                                                <DeleteAttributes />
                                            </Typography>
                                    </Box>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} my={2}>                        <Pagination count={Math.ceil(shipping.length / itemsPerPage)}
                    page={currentPage} onChange={handlePageChange} color="primary"
                />
                </Box>
            </TableContainer>
        </Box>
    );
}

export default ShippingList;