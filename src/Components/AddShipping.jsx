import React, { useState } from 'react';
import { Button, Dialog, Box, Grid, TextField, MenuItem } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { API } from '../API';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddShipping = ({ fetchAllShipping, addShipping, handleChangeInput, setAddShipping }) => {
    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleAddToShipping = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/addShipping`, addShipping);
            toast.success("Shipping Creataed Successfully");
            setAddShipping({
                shippingName: '',
                status: '',
            });
            fetchAllShipping();
            toggeleHandleClick();
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Box>
            <Button onClick={toggeleHandleClick} variant="contained" startIcon={<AddIcon />}
                sx={{
                    p: '10px', my: '5px', backgroundColor: '#37ab4a', '&:hover': {
                        backgroundColor: '#37ab4a'
                    },
                }}> Add Shipping
            </Button>
            <Dialog fullScreen sx={{ ml: '50%' }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} variant="h6" >
                                Add Shipping Value
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} >
                                Add your shipping values and necessary information from here
                            </Typography>
                        </Box>
                        <IconButton edge="start" color="error"
                            sx={{
                                bgcolor: 'white',
                                '&:hover': { backgroundColor: '#f5b5b5', color: 'black' }
                            }}
                            onClick={toggeleHandleClick}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ width: '100%', typography: 'body1', my: 3 }}>
                    <Box>
                        <Box sx={{ px: 4, mb: 3, mt: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Grid container>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <Typography sx={{ mt: 2 }}> Shipping Method </Typography>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={6} xs={12}>
                                        <TextField fullWidth name="shippingName"
                                            value={addShipping.shippingName}
                                            variant="outlined" type={"text"}
                                            error={!addShipping.shippingName} required
                                            placeholder={"Shipping Method is required *"}
                                            onChange={handleChangeInput}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Grid container>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <Typography sx={{ mt: 5 }}> Status </Typography>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={6} xs={12}>
                                        <TextField type={'text'} variant="outlined" 
                                        fullWidth sx={{ mt: 4 }} label='Select Type' 
                                        name="status" value={addShipping.status} 
                                        onChange={handleChangeInput} select={'true'} 
                                        >
                                            <MenuItem value={"Disabled"}> Disabled </MenuItem>
                                            <MenuItem value={"Enable"}> Enable </MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 3 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={toggeleHandleClick} sx={{
                            borderRadius: 3, width: "50%",
                            height: "73%", backgroundColor: "#dbdbd9", color: "red", '&:hover': {
                                backgroundColor: '#fae6e6',
                            }
                        }}
                            variant='contained'>Cancel
                        </Button>

                        <Button onClick={handleAddToShipping}
                            sx={{
                                ml: 2, borderRadius: 3, width: "50%",
                                height: "73%", backgroundColor: '#37ab4a', '&:hover': {
                                    backgroundColor: '#37ab4a'
                                }
                            }}
                            variant='contained'> Add Shipping
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
}

export default AddShipping;