import React, { useState } from "react";
import { Button, Dialog, Box, Switch, TextField, Grid, FormControlLabel } from "@mui/material";
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

const EditAttributeValue = ({ attribute, fetchAllAttributeValues, initialPublished }) => {
    const [published, setPublished] = useState(initialPublished);
    // const [publishedVis, setPublishedVis] = useState(attribute);
    const [editAttributeValue, setEditAttributeValue] = useState(attribute);

    const handleChangeInput = (e) => {
        setEditAttributeValue({
            ...editAttributeValue,
            [e.target.name]: e.target.value,
        });
    }

    // const handleChangeVis = (e) => {
    //     setPublished(!published);
    //     setPublishedVis({
    //         ...publishedVis,
    //         published: attribute.published,
    //     })
    // }

    const handleUpdateAttributeVal = async (_id) => {
        try {
            await axios.put(`${API}/updateAttributeValues/${_id}`, { ...editAttributeValue, published });
            toast.success("Attribute Value updated Successfully");
            fetchAllAttributeValues();
            toggeleHandleClick();
        } catch (error) {
            console.log(error);
        }
    };

    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Typography onClick={toggeleHandleClick} sx={{ "&:hover": { cursor: "pointer" } }} >
                <EditNoteIcon sx={{
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
                                Add/Update Attribute Valu
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: " black" }}>
                                Add your attribute values and necessary information from here
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
                    <Box sx={{ px: 4, mb: 3, mt: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid container>
                                <Grid item lg={4} md={4} sm={6} xs={12}>
                                    <Typography sx={{ mt: 2 }}>Category Name</Typography>
                                </Grid>
                                <Grid item lg={8} md={8} sm={6} xs={12}>
                                    <TextField fullWidth name="displayName"
                                        value={editAttributeValue.displayName} variant="outlined"
                                        type={"text"} onChange={handleChangeInput}
                                        error={!editAttributeValue.displayName} required
                                        placeholder={"Color or Size or Dimension or Material or Fabric"}
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
                                    <FormGroup sx={{ mt: 4, mx: 1 }}>
                                        <FormControlLabel
                                            sx={{ color: 'text.primary' }}
                                            control={
                                                <IOSSwitch
                                                    checked={published}
                                                    onChange={() => setPublished(!published)}
                                                    // onChange={handleChangeVis}
                                                />
                                            }
                                        />
                                    </FormGroup>
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

                        <Button onClick={() => handleUpdateAttributeVal(attribute?._id)}
                            sx={{
                                ml: 2, borderRadius: 3, width: "50%", color: "black",
                                height: "73%", backgroundColor: "#fffb0a",
                                "&:hover": { backgroundColor: "#f7f554" },
                            }} variant="contained"
                        > Update Attribute
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
};

export default EditAttributeValue;
