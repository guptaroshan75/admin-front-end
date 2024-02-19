import React, { useState } from 'react';
import { Box, Divider, Pagination, Stack, Avatar } from '@mui/material';
import { TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Table, TableBody, TableCell, } from '@mui/material';
import { API } from '../API';
// import { Typography, Paper, Stack, Avatar } from "@mui/material";

const BlogList = ({ blog }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleBlog = blog.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell scope="row"> ID </TableCell>
                        <TableCell align="right"> BLOG TITLE</TableCell>
                        <TableCell align="right"> DESCRIPTION  </TableCell>
                        <TableCell align="right"> IMAGE </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleBlog.map(blog => (
                        <TableRow>
                            <TableCell scope="row" sx={{ fontWeight: 800 }}>
                                {blog._id.slice(-4)}
                            </TableCell>
                            <TableCell align="right"> {blog.blogTitle.slice(0, 7)} </TableCell>
                            <TableCell align="right"> {blog.description.slice(0, 16)} </TableCell>
                            <TableCell align="right">
                                <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                                    <Avatar alt={blog.blogTitle} src={blog.blogImage} />
                                </Stack>
                            </TableCell>
                            {/* <TableCell align="right">
                                <Box display={"flex"} justifyContent={'flex-end'}>
                                    <Typography>
                                        <EditCategory category={category}
                                            fetchAllCategory={fetchAllCategory}
                                        />
                                    </Typography>
                                    <Typography>
                                        <DeleteCategory category={category}
                                            fetchAllCategory={fetchAllCategory}
                                        />
                                    </Typography>
                                </Box>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} my={2}>
                <Pagination count={Math.ceil(blog.length / itemsPerPage)}
                    page={currentPage} onChange={handlePageChange} color="primary"
                />
            </Box>
        </TableContainer>
    )
}

export default BlogList
