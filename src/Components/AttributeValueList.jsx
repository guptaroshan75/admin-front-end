import React, { useState } from "react";
import { Box, Divider, FormControlLabel, Pagination, Switch } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import { Typography, Paper, TableRow } from "@mui/material";
import { toast } from "react-toastify";
import { API } from "../API";
import axios from "axios";
import EditAttributeValue from "../Pages/EditAttributeValue";
import DeleteAttributeValue from "../Pages/DeleteAttributeValue";

const AttributeValueList = ({ attributeValues, fetchAllAttributeValues }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleAttributeVal = attributeValues.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleBadgeVisibility = async (id) => {
        const updatedAttributeValues = attributeValues.map(attributeVal => {
            if (attributeVal._id === id) {
                const updatedAttri = {
                    ...attributeVal,
                    published: attributeVal.published,
                };
                updateVisibility(id, updatedAttri.published);
                return updatedAttri;
            }
            return attributeVal;
        });
        fetchAllAttributeValues(updateVisibility);
        return updatedAttributeValues;
    };

    const updateVisibility = async (id, checked) => {
        try {
            await axios.put(`${API}/updateAttributeValuesVisble/${id}`, { published: checked });
            fetchAllAttributeValues();
            toast.success("Attribute Values Visibility In DataBase");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <Box style={{ height: 400, width: "100%" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell scope="row"> ID </TableCell>
                                <TableCell align="right"> NAME </TableCell>
                                <TableCell align="right"> TYPE </TableCell>
                                <TableCell align="right"> STATUS </TableCell>
                                <TableCell align="right"> ACTIONS </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleAttributeVal.map(attribute => (
                                <TableRow key={attribute?._id}>
                                    <TableCell scope="row" sx={{ fontWeight: 800}}>
                                        {attribute._id.slice(-4)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {attribute.displayName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {attribute?.attributesId?.options}
                                    </TableCell>
                                    <TableCell align="right" >
                                        <FormControlLabel
                                            sx={{ color: 'text.primary', justifyContent: "center" }}
                                            control={
                                                <Switch
                                                    checked={attribute.published}
                                                    onChange={() => handleBadgeVisibility(attribute?._id)}
                                                />
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box display={"flex"} justifyContent={'flex-end'}>
                                            <Typography>
                                                <EditAttributeValue attribute={attribute}
                                                    fetchAllAttributeValues={fetchAllAttributeValues}
                                                    initialPublished={attribute.published}
                                                />
                                            </Typography>
                                            <Typography>
                                                <DeleteAttributeValue attribute={attribute}
                                                    fetchAllAttributeValues={fetchAllAttributeValues}
                                                />
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Divider />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }} my={2}>
                        <Pagination count={Math.ceil(attributeValues.length / itemsPerPage)}
                            page={currentPage} onChange={handlePageChange} color="primary"
                        />
                    </Box>
                </TableContainer>
            </Box>
        </>
    );
};

export default AttributeValueList;
