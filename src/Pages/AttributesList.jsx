import React, { useState } from 'react';
import { Box, Divider, FormControlLabel, Pagination, Switch, Typography } from '@mui/material';
import { TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import { Table, TableBody, TableCell, } from '@mui/material';
import axios from 'axios';
import { API } from '../API';
import { toast } from 'react-toastify';
import EditAttribute from './EditAttribute';
import DeleteAttributes from './DeleteAttributes';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link as RouterLink } from 'react-router-dom';

const AttributesList = ({ fetchAllAttribute, attribute }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleAttributes = attribute.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleBadgeVisibility = async (attId) => {
        const updatedAttributes = attribute.map(attributeP => {
            if (attributeP._id === attId) {
                const updatedAttribute = {
                    ...attributeP,
                    published: attributeP.published,
                };
                updateVisibility(attId, updatedAttribute.published);
                return updatedAttribute;
            }
            return attributeP;
        });
        fetchAllAttribute(updateVisibility);
        return updatedAttributes;
    };

    const updateVisibility = async (attId, checked) => {
        try {
            const response = await
                axios.put(`${API}/updateAttributeVisble/${attId}`, { published: checked });
            fetchAllAttribute()
            toast.success("Attribute Visibility In DataBase");
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
                                <TableCell scope="row"> ID </TableCell>
                                <TableCell align="right"> NAME </TableCell>
                                <TableCell align="right"> DISPLAY NAME </TableCell>
                                <TableCell align="right"> OPTION </TableCell>
                                <TableCell align="right"> PUBLISHED </TableCell>
                                <TableCell align="right"> VALUES </TableCell>
                                <TableCell align="right"> ACTIONS </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleAttributes.map((attribute) => (
                                <TableRow key={attribute?._id}>
                                    <TableCell scope="row" sx={{ fontWeight: 800}}>
                                        {attribute._id.slice(-4)}
                                    </TableCell>
                                    <TableCell align="right"> {attribute.attName} </TableCell>
                                    <TableCell align="right"> {attribute.displayName} </TableCell>
                                    <TableCell align="right"> {attribute.options} </TableCell>
                                    <TableCell align="right">
                                        <FormControlLabel
                                            sx={{ color: 'text.primary' }}
                                            control={
                                                <Switch
                                                    checked={attribute.published}
                                                    onChange={() => handleBadgeVisibility(attribute?._id)}
                                                />
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link underline='none' component={RouterLink}
                                            to={`/attribute-values/${attribute?._id}`}
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
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box display={"flex"} justifyContent={'flex-end'} >
                                            <Typography>
                                                <EditAttribute attribute={attribute}
                                                    fetchAllAttribute={fetchAllAttribute}
                                                />
                                            </Typography>
                                            <Typography>
                                                <DeleteAttributes attribute={attribute}
                                                    fetchAllAttribute={fetchAllAttribute}
                                                />
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} my={2}>
                        <Pagination count={Math.ceil(attribute.length / itemsPerPage)}
                            page={currentPage} onChange={handlePageChange} color="primary"
                        />
                    </Box>
                </TableContainer>
            </Box>
        </>
    );
}

export default AttributesList;
