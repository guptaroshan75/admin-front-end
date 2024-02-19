import React, { useState } from "react";
import { Button, Dialog, Box, TextField, Grid } from "@mui/material";
import { AppBar, Toolbar, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { API } from "../API";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GalleryAdd = ({ handleChangeInput, fetchAllGallery,
    addGallery, setAddGallery, handleFileUpload
}) => {
    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleAddToBlog = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('galleryImage', addGallery.galleryImage);
        formData.append('imageTitle', addGallery.imageTitle);
        try {
            await axios.post(`${API}/addGallery`, formData);
            toast.success("Gallery Added Successfully");
            setAddGallery({
                imageTitle: '',
                galleryImage: '',
            });
            fetchAllGallery();
            toggeleHandleClick();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Box>
            <Button onClick={toggeleHandleClick} variant="contained"
                startIcon={<AddIcon />} sx={{
                    p: "10px", my: "5px",
                    backgroundColor: "#37ab4a", "&:hover": { backgroundColor: "#37ab4a" },
                }}
            >
                Add Gallery
            </Button>
            <Dialog fullScreen sx={{ ml: "50%" }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative", bgcolor: "rgba(0, 0, 0, 0.04)", py: 2 }} >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }} variant="h5">
                                Add Gallery
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }}>
                                Add your Gallery and necessary information from here
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
                                <Typography sx={{ mt: 2 }}> Gallery Title </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <TextField fullWidth name="imageTitle" type={"text"}
                                    value={addGallery.imageTitle} variant="outlined"
                                    error={!addGallery.imageTitle} required
                                    placeholder={"Gallery Title is required *"}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <Typography sx={{ mt: 5, ml: 5, mx: 0 }}>
                                    Gallery Image
                                </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <TextField fullWidth id="image-input" type="file"
                                    sx={{ mt: 5 }} inputProps={{ accept: ".jpeg, .png, .jpg" }}
                                    variant="outlined" name="blogImage" onChange={handleFileUpload}
                                />
                            </Grid>
                        </Grid>
                    </Box>
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

                        <Button onClick={handleAddToBlog} sx={{
                            ml: 2, borderRadius: 3,
                            width: "50%", height: "73%", backgroundColor: "#37ab4a",
                            "&:hover": { backgroundColor: "#37ab4a" },
                        }} variant="contained"
                        >
                            Gallery Add
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
};

export default GalleryAdd;
