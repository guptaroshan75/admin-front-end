import React, { useState } from "react";
import { Button, Dialog, Box, TextField, Grid, FormControlLabel, Switch, MenuItem, FormGroup } from "@mui/material";
import { AppBar, Toolbar, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { API } from "../API";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import UPSField from "./UPSField";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const AddUPS = ({fetchAllUpsShipping}) => {
    // const { id } = useParams();
    const [open, setOpen] = useState(false);

    const [addUpsShipping, setAddUpsShipping] = useState({
        accessKey: '',
        userName: '',
        password: '',
        pickupMethod: '',
        packingType: '',
        customerCode: '',
        originCode: '',
        originCity: '',
        originState: '',
        originCountry: '',
        originZip: '',
        testMode: '',
        quoteType: '',
        services: [],
        insurance: '',
        displayWeight: '',
        weightClass: '',
        lengthClass: '',
        dimensions: '',
        taxClass: '',
        geoZone: '',
        status: '',
        sortOrder: '',
        debugMode: '',
    });

    const handleChangeInput = (e) => {
        setAddUpsShipping({
            ...addUpsShipping,
            [e.target.name]: e.target.value,
        });
    };

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleAddToUPS = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/addUpsShippingVal`, addUpsShipping);
            toast.success("UPS Shipping Creataed Successfully");
            setAddUpsShipping({
                accessKey: '',
                userName: '',
                password: '',
                pickupMethod: '',
                packingType: '',
                customerCode: '',
                originCode: '',
                originCity: '',
                originState: '',
                originCountry: '',
                originZip: '',
                testMode: '',
                quoteType: '',
                services: [],
                insurance: '',
                displayWeight: '',
                weightClass: '',
                lengthClass: '',
                dimensions: '',
                taxClass: '',
                geoZone: '',
                status: '',
                sortOrder: '',
                debugMode: '',
            });
            toggeleHandleClick();
            fetchAllUpsShipping();
        } catch (error) {
            console.log(error);
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
                                Add/Update UPS Values
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }}>
                                Add your UPS and necessary information from here
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
                    <UPSField addUpsShipping={addUpsShipping}
                        handleChangeInput={handleChangeInput}
                    />
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

                        <Button onClick={handleAddToUPS} sx={{
                            ml: 2, borderRadius: 3,
                            width: "50%", height: "73%", backgroundColor: "#3b8f51",
                            "&:hover": { backgroundColor: "#307543" },
                        }} variant="contained"
                        >
                            Add UPS
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
};

export default AddUPS;
