import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { API } from '../API';
import BlogAdd from '../Components/BlogAdd';
import BlogList from '../Components/BlogList';

const Blog = () => {
    const [addBlog, setAddBlog] = useState({
        blogImage: null,
        blogTitle: '',
        description: '',
    });

    const handleChangeInput = (e) => {
        setAddBlog({
            ...addBlog,
            [e.target.name]: e.target.value
        });
    }

    const handleFileUpload = (e) => {
        setAddBlog({
            ...addBlog,
            blogImage: e.target.files[0]
        });
    };

    const [blog, setblog] = useState([]);

    const fetchAllBlog = async () => {
        try {
            const response = await axios.get(`${API}/getAllBlogs`);
            setblog(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllBlog();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, px: 3, mt: 10, ml: 30, mb: 20 }} >
            <Navbar />
            <Typography variant="h5" sx={{ my: 2, fontWeight: 800 }}> Blog </Typography>
            <Paper sx={{
                display: 'flex', justifyContent: 'space-between',
                flexWrap: 'wrap', px: 2, py: 1
            }}
            >
                <Box my={2}>
                    <Button variant="outlined" startIcon={<FileUploadIcon />}
                        sx={{ mr: 2, p: '10px', my: '5px' }}> Export
                    </Button>
                    <Button variant="outlined" startIcon={<SaveAltIcon />}
                        sx={{ p: '10px', my: '5px' }}> Import
                    </Button>
                </Box>

                <Box my={2}>
                    <Button variant="contained" startIcon={<EditIcon />}
                        sx={{
                            mr: 2, p: '10px', my: '5px', backgroundColor: '#bbbfbc',
                            '&:hover': {
                                backgroundColor: '#bbbfbc'
                            },
                        }}> Bulk Action
                    </Button>
                    <Button variant="contained" startIcon={<DeleteIcon />}
                        sx={{
                            mr: 2, p: '10px', my: '5px', backgroundColor: '#ed5342',
                            '&:hover': {
                                backgroundColor: '#ed5342',
                            },
                        }}> Delete
                    </Button>
                    <Button>
                        <BlogAdd handleChangeInput={handleChangeInput} setAddBlog={setAddBlog}
                            addBlog={addBlog} handleFileUpload={handleFileUpload}
                            fetchAllBlog={fetchAllBlog}
                        />
                    </Button>
                </Box>
            </Paper>
            <Paper sx={{
                flexWrap: 'wrap', px: 2, py: 2, mt: 3, alignItems: 'center'
            }}
            >
                <Box sx={{ m: 1 }} >
                    <TextField variant="outlined"
                        placeholder='Search by attribute name' fullWidth
                    />
                </Box>
            </Paper>
            <Box my={2}>
                <BlogList blog={blog} key={blog?._id} />
            </Box>
        </Box>
    )
}

export default Blog;