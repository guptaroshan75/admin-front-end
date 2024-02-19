import React, { useState } from "react";
import { Button, Dialog, Box, TextField, Grid, MenuItem, FormGroup } from "@mui/material";
import { AppBar, Toolbar, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { API } from "../API";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// const IOSSwitch = styled((props) => (
//     <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
//     width: 80, height: 34, padding: 0,
//     '& .MuiSwitch-switchBase': {
//         padding: 0, margin: 2, transitionDuration: '300ms',
//         '&.Mui-checked': {
//             transform: 'translateX(46px)', color: '#fff',
//             '& + .MuiSwitch-track': {
//                 backgroundColor: theme.palette.mode === 'dark' ? '#3b8f51' : '#3b8f51',
//                 opacity: 1,
//             },
//         },
//     },
//     '& .MuiSwitch-thumb': { boxSizing: 'border-box', width: 30, height: 30 },
//     '& .MuiSwitch-track': {
//         borderRadius: 26 / 1, opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#f7252c' : '#f7252c',
//         '&:before, &:after': {
//             content: '""', position: 'absolute',
//             top: '52%', transform: 'translateY(-52%)',
//         },
//         '&:before': { content: '"Yes"', color: 'white', left: 6 },
//         '&:after': { content: '"No"', color: 'white', right: 7 },
//     },
// }));

const AddFreeShipping = ({ fetchAllFreeShipping }) => {
    // const { id } = useParams();
    const [open, setOpen] = useState(false);

    const [addFreeShipping, setAddFreeShipping] = useState({
        total: '',
        geoZone: '',
        status: '',
        sortOrder: '',
    });

    const handleChangeInput = (e) => {
        setAddFreeShipping({
            ...addFreeShipping,
            [e.target.name]: e.target.value,
        });
    };

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleAddToFreeShipping = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/addFreeShippingVal`, addFreeShipping);
            toast.success("Free Shipping Creataed Successfully");
            setAddFreeShipping({
                total: '',
                geoZone: '',
                status: '',
                sortOrder: '',
            });
            toggeleHandleClick();
            fetchAllFreeShipping();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Box>
            <Button onClick={toggeleHandleClick} variant="contained"
                sx={{
                    backgroundColor: "#3b8f51", "&:hover": { backgroundColor: "#307543" },
                }}
            >
                <AddIcon />
            </Button>
            <Dialog fullScreen sx={{ ml: "50%" }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative", bgcolor: "rgba(0, 0, 0, 0.04)", py: 2 }} >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }} variant="h5">
                                Add/Update Free Shipping Values
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }}>
                                Add your Free Shipping and necessary information from here
                            </Typography>
                        </Box>
                        <IconButton edge="start" color="error" sx={{
                            bgcolor: "white",
                            "&:hover": { backgroundColor: "#f5b5b5", color: "black" }
                        }}
                            onClick={toggeleHandleClick} aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ px: 4, my: 5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <Typography sx={{ mt: 2 }}> Total </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <TextField fullWidth name="total" type={"number"}
                                    value={addFreeShipping.total} variant="outlined"
                                    error={!addFreeShipping.total} required
                                    placeholder={"Free Shipping VAlue"}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <Typography sx={{ mt: 5 }}> Geo Zone </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <TextField type={'text'} variant="outlined"
                                    fullWidth sx={{ mt: 4 }} label='Select Type'
                                    name="geoZone" value={addFreeShipping.geoZone}
                                    onChange={handleChangeInput} select={'true'}
                                >
                                    <MenuItem value={"All Zones"}> All Zones </MenuItem>
                                    <MenuItem value={"Alberta GST"}> Alberta GST </MenuItem>
                                    <MenuItem value={"British Columia HST"}>
                                        British Columia HST
                                    </MenuItem>
                                    <MenuItem value={"New Brunswick HST"}>
                                        New Brunswick HST
                                    </MenuItem>
                                </TextField>
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
                                    name="status" value={addFreeShipping.status}
                                    onChange={handleChangeInput} select={'true'}
                                >
                                    <MenuItem value={"Disabled"}> Disabled </MenuItem>
                                    <MenuItem value={"Enable"}> Enable </MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <Typography sx={{ mt: 5 }}> Sort Order </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <TextField fullWidth name="sortOrder" type={"string"}
                                    value={addFreeShipping.sortOrder} variant="outlined"
                                    error={!addFreeShipping.sortOrder} required
                                    placeholder={"Free Shipping Sort Order"}
                                    onChange={handleChangeInput} sx={{ mt: 4 }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <Typography sx={{ mt: 5 }}>
                                    Published
                                </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <FormGroup sx={{ mt: 4, mx: 1 }} >
                                    <FormControlLabel
                                        sx={{ color: 'text.primary' }}
                                        control={
                                            <IOSSwitch
                                                checked={published}
                                                onChange={() => setPublished(!published)}
                                            />
                                        }
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Box> */}
                </Box>

                <AppBar sx={{ position: "relative", bgcolor: "rgba(0, 0, 0, 0.04)", py: 3 }} >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Button onClick={toggeleHandleClick} sx={{
                            borderRadius: 3,
                            width: "50%", height: "73%", backgroundColor: "#dbdbd9",
                            color: "red", "&:hover": { backgroundColor: "#fae6e6" },
                        }} variant="contained"
                        >
                            Cancel
                        </Button>

                        <Button onClick={handleAddToFreeShipping} sx={{
                            ml: 2, borderRadius: 3,
                            width: "50%", height: "73%", backgroundColor: "#3b8f51",
                            "&:hover": { backgroundColor: "#307543" },
                        }} variant="contained"
                        >
                            Add Free Shipping
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
};

export default AddFreeShipping;
