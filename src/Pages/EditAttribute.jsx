import React, { useState } from 'react';
import { Button, Dialog, Box, Grid, TextField, MenuItem } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../API';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditAttribute = ({ attribute, fetchAllAttribute }) => {
    const [editAttribute, setEditAttribute] = useState(attribute);

    const handleChangeInput = (e) => {
        setEditAttribute({
            ...editAttribute,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateAttribute = async (_id) => {
        try {
            await axios.put(`${API}/updateAttribute/${_id}`, editAttribute);
            toast.success("Attribute updated Successfully");
            fetchAllAttribute();
            toggeleHandleClick();
        } catch (error) {
            console.log(error);
        }
    }

    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Typography onClick={toggeleHandleClick}
                sx={{ '&:hover': { cursor: 'pointer' } }}
            >
                <EditNoteIcon sx={{
                    fontSize: 30, ml: 1, color: '#9e9e9e',
                    '&:hover': { color: '#53a65f' }
                }} />
            </Typography>
            <Dialog fullScreen sx={{ ml: '50%' }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} variant={"h5"} >
                                Update Attribute Value
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} >
                                Updated your attribute values and necessary information from here
                            </Typography>
                        </Box>
                        <IconButton edge="start"
                            sx={{
                                bgcolor: 'white',
                                '&:hover': { backgroundColor: '#f5b5b5', color: 'black' }
                            }}
                            color="error" onClick={toggeleHandleClick} aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ width: '100%', typography: 'body1', my: 4 }}>
                    <Box sx={{ px: 4, mb: 3, mt: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid container>
                                <Grid item lg={4} md={4} sm={6} xs={12}>
                                    <Typography sx={{ mt: 2 }}>Attribute Title</Typography>
                                </Grid>
                                <Grid item lg={8} md={8} sm={6} xs={12}>
                                    <TextField fullWidth name="attName"
                                        value={editAttribute.attName}
                                        variant="outlined" type={"text"}
                                        error={!editAttribute.attName}
                                        required
                                        placeholder={"Color or Size or Dimension or Material or Fabric *"}
                                        onChange={handleChangeInput}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid container>
                                <Grid item lg={4} md={4} sm={6} xs={12}>
                                    <Typography sx={{ mt: 4 }}>Display Name</Typography>
                                </Grid>
                                <Grid item lg={8} md={8} sm={6} xs={12}>
                                    <TextField fullWidth name="displayName" sx={{ mt: 4 }}
                                        value={editAttribute.displayName}
                                        variant="outlined" type={"text"}
                                        error={!editAttribute.displayName}
                                        required
                                        placeholder={"Display Name *"}
                                        onChange={handleChangeInput}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid container>
                                <Grid item lg={4} md={4} sm={6} xs={12}>
                                    <Typography sx={{ mt: 4 }}>Options </Typography>
                                </Grid>
                                <Grid item lg={8} md={8} sm={6} xs={12}>
                                    <TextField type={'text'} variant="outlined" select={'true'} fullWidth
                                        sx={{ mt: 4 }} label='Select Type' name="options"
                                        value={editAttribute.options} onChange={handleChangeInput}
                                    >
                                        <MenuItem value={"Dropdown"}> Dropdown </MenuItem>
                                        <MenuItem value={"Radio"}> Radio </MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>

                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 3 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={toggeleHandleClick} sx={{
                            borderRadius: 3, width: "50%",
                            height: "73%", backgroundColor: "#dbdbd9",
                            color: "red", '&:hover': { backgroundColor: '#fae6e6' }
                        }}
                            variant='contained'>Cancel
                        </Button>

                        <Button onClick={() => handleUpdateAttribute(attribute?._id)} sx={{
                            ml: 2, borderRadius: 3, width: "50%", color: 'black',
                            height: "73%", backgroundColor: '#fffb0a', '&:hover': {
                                backgroundColor: '#f7f554'
                            }
                        }}
                            variant='contained' >Update Product
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
}

export default EditAttribute