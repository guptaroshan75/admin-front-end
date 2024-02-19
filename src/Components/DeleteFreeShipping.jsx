import React, { useState } from "react";
import { Typography, Box, Dialog, Button, styled, Divider } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../API";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const DeleteFreeShipping = ({ fetchAllFreeShipping, freeShipping }) => {
    const [open, setOpen] = useState(false);

    const toggelHandleClickOpen = () => {
        setOpen(!open);
    };

    const handleDeleteFreeShipping = async (_id) => {
        try {
            await axios.delete(`${API}/deleteFreeShipping/${_id}`);
            toast.error("Free Shipping Deleted Successfully");
            fetchAllFreeShipping();
            toggelHandleClickOpen();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Typography onClick={toggelHandleClickOpen} sx={{
                "&:hover": { cursor: "pointer", color: "red" }
            }}
            >
                <DeleteOutlineIcon sx={{ mt: 0.5,
                    fontSize: 25, ml: 1, color: "#9e9e9e", "&:hover": { color: "#f58484" },
                }}
                />
            </Typography>
            <BootstrapDialog onClose={toggelHandleClickOpen}
                aria-labelledby="customized-dialog-title" open={open}
            >
                <Box display={"flex"} justifyContent={"center"} my={3}>
                    <DeleteOutlineIcon sx={{ fontSize: 40, color: "#f58484" }} />
                </Box>
                <Box display={"flex"} justifyContent={"center"} mb={1}>
                    <Typography variant="h6" display={'flex'}>
                        Are You Sure! Want to Delete
                        <Typography variant="h6" color={'error'} ml={1}>
                            {freeShipping.sortOrder} ?
                        </Typography>
                    </Typography>
                </Box>
                <Box textAlign={"center"} mx={4} mb={5}>
                    <Typography variant="body1">
                        Do you really want to delete these
                        records? You can't view this in your list anymore if you delete!
                    </Typography>
                </Box>
                <Divider />
                <Box display={"flex"} justifyContent={"center"}
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }}
                >
                    <Button onClick={toggelHandleClickOpen} variant="contained" sx={{
                        ml: 2, my: 3,
                        bgcolor: "#c1c7c3", "&:hover": { bgcolor: "white", color: "black" }
                    }}
                    >
                        No, Keep It
                    </Button>
                    <Button sx={{
                        ml: 2, my: 3, bgcolor: "#3b9c55",
                        "&:hover": { bgcolor: "#357546" }
                    }} variant="contained"
                        onClick={() => handleDeleteFreeShipping(freeShipping?._id)}
                    >
                        Yes, Delete It
                    </Button>
                </Box>
            </BootstrapDialog>
        </>
    );
};

export default DeleteFreeShipping;