import React, { useState } from 'react';
import { Button, Dialog, Box } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { API } from '../API';
import axios from 'axios';
import AddAtributeField from './AddAtributeField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddAttributes = ({fetchAllAttribute, addAttribute, setAddAttribute, handleChangeInput}) => {
    const [open, setOpen] = useState(false);

    const toggeleHandleClick = () => {
        setOpen(!open);
    };

    const handleAddToAttribute = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/addAttribute`, addAttribute);
            toast.success("Attribute Creataed Successfully");
            setAddAttribute({
                attName: '',
                displayName: '',
                options: '',
            });
            fetchAllAttribute();
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
                }}> Add Attribute
            </Button>
            <Dialog fullScreen sx={{ ml: '50%' }} open={open} onClose={toggeleHandleClick}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'rgba(0, 0, 0, 0.04)', py: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} variant="h6" >
                                Add Attribute Value
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, color: ' black' }} >
                                Add your attribute values and necessary information from here
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
                    <AddAtributeField addAttribute={addAttribute}
                        handleChangeInput={handleChangeInput}
                    />
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

                        <Button onClick={handleAddToAttribute}
                            sx={{
                                ml: 2, borderRadius: 3, width: "50%",
                                height: "73%", backgroundColor: '#37ab4a', '&:hover': {
                                    backgroundColor: '#37ab4a'
                                }
                            }}
                            variant='contained'>Add Attribute
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
}

export default AddAttributes;