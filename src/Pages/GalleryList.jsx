import React, { useState } from 'react';
import { Box, Divider, Pagination, Stack, Avatar } from '@mui/material';
import { TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Table, TableBody, TableCell, } from '@mui/material';
import { API } from '../API';

const GalleryList = ({ gallery }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleBlog = gallery.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell scope="row"> ID </TableCell>
                        <TableCell align="right"> GALLERY TITLE</TableCell>
                        <TableCell align="right"> GALLERY IMAGE </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleBlog.map(gallery => (
                        <TableRow>
                            <TableCell scope="row" sx={{ fontWeight: 800 }}>
                                {gallery._id.slice(-4)}
                            </TableCell>
                            <TableCell align="right"> {gallery.imageTitle} </TableCell>
                            <TableCell align="right">
                                <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                                    <Avatar alt={gallery.imageTitle} src={gallery.galleryImage} />
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} my={2}>
                <Pagination count={Math.ceil(gallery.length / itemsPerPage)}
                    page={currentPage} onChange={handlePageChange} color="primary"
                />
            </Box>
        </TableContainer>
    )
}

export default GalleryList
