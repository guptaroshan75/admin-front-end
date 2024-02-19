import React from "react";
import { Typography, Box, TextField, Grid, MenuItem } from "@mui/material";

const AddAtributeField = ({ handleChangeInput, addAttribute }) => {
    return (
        <Box>
            <Box sx={{ px: 4, mb: 3, mt: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography sx={{ mt: 2 }}>Attribute Title</Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField fullWidth name="attName"
                                value={addAttribute.attName}
                                variant="outlined" type={"text"}
                                error={!addAttribute.attName}
                                required
                                placeholder={"Color or Size or Dimension or Material or Fabric *"}
                                onChange={handleChangeInput}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography sx={{ mt: 4 }}>Display Name</Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField fullWidth name="displayName" sx={{ mt: 4 }}
                                value={addAttribute.displayName}
                                variant="outlined" type={"text"}
                                error={!addAttribute.displayName}
                                required
                                placeholder={"Display Name *"}
                                onChange={handleChangeInput}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Typography sx={{ mt: 4 }}>Options </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                            <TextField type={'text'} variant="outlined" select={'true'} fullWidth
                                sx={{ mt: 4 }} label='Select Type'  name="options"
                                value={addAttribute.options} onChange={handleChangeInput}
                            >
                                <MenuItem value={"Dropdown"}> Dropdown </MenuItem>
                                <MenuItem value={"Radio"}> Radio </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default AddAtributeField;
