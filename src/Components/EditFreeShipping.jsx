import React, { useState } from "react";
import { Button, Dialog, Box, MenuItem, TextField, Grid, FormControlLabel } from "@mui/material";
import { AppBar, Toolbar, IconButton, Typography, Slide, FormGroup } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { API } from "../API";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditFreeShipping = ({ freeShipping, fetchAllFreeShipping }) => {
    const [editFreeShipping, setEditFreeShipping] = useState(freeShipping);

    const handleChangeInput = (e) => {
        setEditFreeShipping({
            ...editFreeShipping,
            [e.target.name]: e.target.value,
        });
    }

    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleUpdateFreeShipping = async (_id) => {
        try {
            await axios.put(`${API}/updateFreeShipping/${_id}`, { ...editFreeShipping });
            toast.success("Free Shipping updated Successfully");
            toggeleHandleClick();
            fetchAllFreeShipping();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Typography onClick={toggeleHandleClick} sx={{ "&:hover": { cursor: "pointer" } }} >
                <EditNoteIcon sx={{ mt: 0.5,
                    fontSize: 30, ml: 1, color: "#9e9e9e",
                    "&:hover": { color: "#53a65f" }
                }}
                />
            </Typography>
            <Dialog fullScreen sx={{ ml: "50%" }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative", bgcolor: "rgba(0, 0, 0, 0.04)", py: 2 }} >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }} variant={"h5"}>
                                Add/Update Free Shipping Value
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }}>
                                Add your Free Shipping values and necessary information from here
                            </Typography>
                        </Box>
                        <IconButton edge="start" sx={{
                            bgcolor: "white", "&:hover":
                                { backgroundColor: "#f5b5b5", color: "black" }
                        }} color="error" onClick={toggeleHandleClick} aria-label="close" >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ width: "100%", typography: "body1", my: 4 }}>
                    <Box sx={{ px: 4, my: 5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid container>
                                <Grid item lg={4} md={4} sm={6} xs={12}>
                                    <Typography sx={{ mt: 2 }}> Total </Typography>
                                </Grid>
                                <Grid item lg={8} md={8} sm={6} xs={12}>
                                    <TextField fullWidth name="total" type={"number"}
                                        value={editFreeShipping.total} variant="outlined"
                                        error={!editFreeShipping.total} required
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
                                        name="geoZone" value={editFreeShipping.geoZone}
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
                                        name="status" value={editFreeShipping.status}
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
                                        value={editFreeShipping.sortOrder} variant="outlined"
                                        error={!editFreeShipping.sortOrder} required
                                        placeholder={"Free Shipping Sort Order"}
                                        onChange={handleChangeInput} sx={{ mt: 4 }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>

                <AppBar sx={{ position: "relative", bgcolor: "rgba(0, 0, 0, 0.04)", py: 3 }} >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Button onClick={toggeleHandleClick} sx={{
                            borderRadius: 3, width: "50%", height: "73%",
                            backgroundColor: "#dbdbd9",
                            color: "red", "&:hover": { backgroundColor: "#fae6e6" }
                        }} variant="contained"
                        > Cancel
                        </Button>

                        <Button onClick={() => handleUpdateFreeShipping(freeShipping?._id)}
                            sx={{
                                ml: 2, borderRadius: 3, width: "50%", color: "black",
                                height: "73%", backgroundColor: "#fffb0a",
                                "&:hover": { backgroundColor: "#f7f554" },
                            }} variant="contained"
                        > Update Free Shipping
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
};

export default EditFreeShipping;
