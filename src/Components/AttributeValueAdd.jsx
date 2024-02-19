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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 80, height: 34, padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0, margin: 2, transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(46px)', color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#3b8f51' : '#3b8f51',
                opacity: 1,
            },
        },
    },
    '& .MuiSwitch-thumb': { boxSizing: 'border-box', width: 30, height: 30 },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 1, opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#f7252c' : '#f7252c',
        '&:before, &:after': {
            content: '""', position: 'absolute',
            top: '52%', transform: 'translateY(-52%)',
        },
        '&:before': { content: '"Yes"', color: 'white', left: 6 },
        '&:after': { content: '"No"', color: 'white', right: 7 },
    },
}));


const AttributeValueAdd = ({ fetchAllAttributeValues }) => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [published, setPublished] = useState(true);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleAddToAttributeValue = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/addAttributeValue/${id}`, { displayName, published });
            toast.success("Attribute Values Creataed Successfully");
            setDisplayName('')
            setPublished(true)
            fetchAllAttributeValues();
            toggeleHandleClick();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Box>
            <Button onClick={toggeleHandleClick} variant="contained"
                startIcon={<AddIcon />} sx={{

                    backgroundColor: "#3b8f51", "&:hover": { backgroundColor: "#307543" },
                }}
            >
                Add Value
            </Button>
            <Dialog fullScreen sx={{ ml: "50%" }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative", bgcolor: "rgba(0, 0, 0, 0.04)", py: 2 }} >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }} variant="h5">
                                Add/Update Attribute Values
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }}>
                                Add your attribute values and necessary information from here
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
                                <Typography sx={{ mt: 2 }}>Display Name</Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <TextField fullWidth name="displayName" type={"text"}
                                    value={displayName} variant="outlined"
                                    error={!displayName} required
                                    placeholder={"Color or Size or Dimension or Material or Fabric"}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

                        <Button onClick={handleAddToAttributeValue} sx={{
                            ml: 2, borderRadius: 3,
                            width: "50%", height: "73%", backgroundColor: "#3b8f51",
                            "&:hover": { backgroundColor: "#307543" },
                        }} variant="contained"
                        >
                            Add Attribute
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
};

export default AttributeValueAdd;
