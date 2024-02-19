import React from "react";
import {
  Typography, Box, Grid, TextField, MenuItem, InputLabel, Select,
  FormControl, OutlinedInput, Chip, RadioGroup, FormControlLabel, Radio,
} from "@mui/material";
import { API } from '../API';
import axios from 'axios';

const EditUpsField = ({ editUps, handleChangeInput }) => {
  return (
    <>
      <Box sx={{ px: 4, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 1 }}> Access Key </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField name="accessKey" value={editUps.accessKey}
                variant="outlined" fullWidth type={"text"}
                error={!editUps.accessKey} onChange={handleChangeInput}
                required placeholder={"Access Key is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5 }}> User Name </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField multiline required name="userName"
                value={editUps.userName} fullWidth type={"text"}
                placeholder={"User Name is required *"}
                variant="outlined" sx={{ mt: 4 }}
                error={!editUps.userName} onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5 }}> Password </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField name="password" sx={{ mt: 4 }} value={editUps.password}
                variant="outlined" fullWidth type={"text"}
                error={!editUps.password} onChange={handleChangeInput}
                required placeholder={"Password is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Pickup Method </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Select Type'
                name="pickupMethod" value={editUps.pickupMethod}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Daily Pickup"}> Daily Pickup </MenuItem>
                <MenuItem value={"Monday"}> Monday </MenuItem>
                <MenuItem value={"Tuesday"}> Tuesday </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Package Type </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Package Type'
                name="packingType" value={editUps.packingType}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Package"}> Package </MenuItem>
                <MenuItem value={"Bag"}> Bag </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5 }}> Customer Code </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'number'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Package Type'
                name="customerCode" value={editUps.customerCode}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={'01'}> 01 </MenuItem>
                <MenuItem value={'02'}> 02 </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Origin Code </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Origin Code'
                name="originCode" value={editUps.originCode}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Canada Origin"}> Canada Origin </MenuItem>
                <MenuItem value={"India Origin"}> India Origin </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5 }}> Origin City </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField name="originCity" value={editUps.originCity}
                variant="outlined" fullWidth type={"text"} sx={{ mt: 4 }}
                error={!editUps.originCity} onChange={handleChangeInput}
                required placeholder={"Origin City is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Origin State </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField name="originState" value={editUps.originState}
                variant="outlined" fullWidth type={"text"} sx={{ mt: 4 }}
                error={!editUps.originState} onChange={handleChangeInput}
                required placeholder={"Origin State is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}>Origin Country</Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="outlined-basic" name="originCountry" required variant="outlined"
                value={editUps.originCountry} error={!editUps.originCountry}
                placeholder={"Origin Country is required *"} sx={{ mt: 4 }} fullWidth
                type={"text"} onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Origin Zip </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="outlined-basic" name="originZip" value={editUps.originZip}
                required variant="outlined" sx={{ mt: 4 }} fullWidth type={"text"}
                onChange={handleChangeInput} error={!editUps.originZip}
                placeholder={"Origin Zip is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Test Mode </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl sx={{ mt: 4 }}>
                <RadioGroup row name="testMode" value={editUps.testMode}
                  onChange={handleChangeInput}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Quote Type </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Quote Type'
                name="quoteType" value={editUps.quoteType}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Commercial"}> Commercial </MenuItem>
                <MenuItem value={"UnCommercial"}> UnCommercial </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Services </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl fullWidth sx={{ mt: 4 }}>
                <InputLabel id="demo-multiple-chip-label"> Services </InputLabel>
                <Select labelId="demo-multiple-chip-label" id="demo-multiple-chip"
                  value={editUps.services} onChange={handleChangeInput}
                  multiple name={"services"} type={'text'}
                  input={<OutlinedInput id="select-multiple-chip" label="Services" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value={"UPS Express"}> UPS Express </MenuItem>
                  <MenuItem value={"UPS Expedited"}> UPS Expedited </MenuItem>
                  <MenuItem value={"UPS Worldwide Express"}> UPS Worldwide Express </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Insurance </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl sx={{ mt: 4 }}>
                <RadioGroup row name="insurance" value={editUps.insurance}
                  onChange={handleChangeInput}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Display Weight </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl sx={{ mt: 4 }}>
                <RadioGroup row name="displayWeight" value={editUps.displayWeight}
                  onChange={handleChangeInput}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Weight Class </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Weight Class'
                name="weightClass" value={editUps.weightClass}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Pound"}> Pound </MenuItem>
                <MenuItem value={"Kg"}> Kg </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Length Class </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Length Class'
                name="lengthClass" value={editUps.lengthClass}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Inch"}> Inch </MenuItem>
                <MenuItem value={"Cm"}> Cm </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5 }}> Dimensions </Typography>
            </Grid>
            <Grid item lg={8} md={3} sm={6} xs={12}>
              <TextField multiline required name="dimensions"
                value={editUps.dimensions} fullWidth type={"text"}
                placeholder={"Dimensions is required *"}
                variant="outlined" sx={{ mt: 4 }}
                error={!editUps.dimensions} onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }}> Tax Class </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined"
                fullWidth sx={{ mt: 4 }} label='Tax Class'
                name="taxClass" value={editUps.taxClass}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Canadian Taxes"}> Canadian Taxes </MenuItem>
                <MenuItem value={"Indian Taxes"}> Indian Taxes </MenuItem>
                <MenuItem value={"USA Taxes"}> USA Taxes </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5 }}> Geo Zone </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined" fullWidth sx={{ mt: 4 }}
                label='Select Type' name="geoZone" value={editUps.geoZone}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"All Zones"}> All Zones </MenuItem>
                <MenuItem value={"Alberta GST"}> Alberta GST </MenuItem>
                <MenuItem value={"British Columia HST"}> British Columia HST </MenuItem>
                <MenuItem value={"New Brunswick HST"}> New Brunswick HST </MenuItem>
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
              <TextField type={'text'} variant="outlined" fullWidth sx={{ mt: 4 }}
                label='Select Type' name="status" value={editUps.status}
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
                value={editUps.sortOrder} variant="outlined"
                error={!editUps.sortOrder} required placeholder={"UPS Sort Order"}
                onChange={handleChangeInput} sx={{ mt: 4 }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5 }}> Debug Mode </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField type={'text'} variant="outlined" fullWidth sx={{ mt: 4 }}
                label='Debug Mode' name="debugMode" value={editUps.debugMode}
                onChange={handleChangeInput} select={'true'}
              >
                <MenuItem value={"Disabled"}> Disabled </MenuItem>
                <MenuItem value={"Enable"}> Enable </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default EditUpsField;