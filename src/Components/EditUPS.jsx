import React, { useState } from "react";
import { Button, Dialog, Box, MenuItem, TextField, Grid, FormControlLabel } from "@mui/material";
import { AppBar, Toolbar, IconButton, Typography, Slide, FormGroup } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { API } from "../API";
import EditUpsField from "./EditUpsField";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditUPS = ({ upsShipping, fetchAllUpsShipping }) => {
    const [editUps, setEditUps] = useState(upsShipping);

    const handleChangeInput = (e) => {
        setEditUps({
            ...editUps,
            [e.target.name]: e.target.value,
        });
    }

    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleUpdateUPS = async (_id) => {
        try {
            await axios.put(`${API}/updateUpsShipping/${_id}`, { ...editUps });
            toast.success("UPS updated Successfully");
            toggeleHandleClick();
            fetchAllUpsShipping();
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
                                Add/Update UPS Value
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }}>
                                Add your UPS values and necessary information from here
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
                        <EditUpsField handleChangeInput={handleChangeInput}
                            editUps={editUps}
                        />
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

                        <Button onClick={() => handleUpdateUPS(upsShipping?._id)}
                            sx={{
                                ml: 2, borderRadius: 3, width: "50%", color: "black",
                                height: "73%", backgroundColor: "#fffb0a",
                                "&:hover": { backgroundColor: "#f7f554" },
                            }} variant="contained"
                        > Update UPS
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
};

export default EditUPS;
