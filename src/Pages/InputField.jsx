import React, { useEffect, useState } from "react";
import {
  Typography, Box, Grid, TextField, MenuItem, InputLabel, Select,
  FormControl, OutlinedInput, InputAdornment, Chip,
} from "@mui/material";
import { API } from '../API';
import axios from 'axios';

const InputField = ({
  addProduct, handleChangeInput, handleFileUpload, categories, attribute
}) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [attributeValues, setAttributeValues] = useState([]);

  const handleAttributeChange = (e) => {
    setSelectedAttribute(e.target.value);
  };

  useEffect(() => {
    if (selectedAttribute) {
      const fetchAttributeValues = async () => {
        try {
          const response = await
            axios.get(`${API}/getSpecificAttributeValueName/${selectedAttribute}`);
          console.log(response.data.data);
          setAttributeValues(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAttributeValues();
    }
  }, [selectedAttribute]);

  return (
    <>
      <Box sx={{ px: 4, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 1 }}> Product Title/Name </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField name="productName" value={addProduct.productName}
                variant="outlined" fullWidth type={"text"} error={!addProduct.productName}
                required placeholder={"Product Name is required *"} onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}> Product Description </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField multiline required rows={3} name="description"
                value={addProduct.description} placeholder={"Product Description is required *"}
                variant="outlined" onChange={handleChangeInput} sx={{ mt: 5 }}
                fullWidth type={"text"} error={!addProduct.description}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant="h6" sx={{ mt: 5, ml: 5, mx: 0 }}> Product Images </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="image-input" type={"file"} fullWidth sx={{ mt: 5 }}
                inputProps={{ accept: ".jpeg, .png, .jpg" }} variant="outlined"
                name="myImage" onChange={handleFileUpload}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant={"h6"}> Product SKU </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="outlined-basic" name="productSKU" value={addProduct.productSKU}
                variant="outlined" fullWidth sx={{ mt: 5 }} type={"text"}
                error={!addProduct.productSKU} required
                placeholder={"Product SKU is required *"} onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}> Product Barcode </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="outlined-basic" name="productBarcode" required variant="outlined"
                value={addProduct.productBarcode} sx={{ mt: 5 }} fullWidth
                type={"text"} onChange={handleChangeInput}
                error={!addProduct.productBarcode} placeholder={"Product Barcode is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}> Category </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl fullWidth sx={{ mt: 5 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select name={"category"}
                  value={addProduct.category} error={!addProduct.category}
                  label={"category"} type={'text'} onChange={handleChangeInput}
                >
                  {categories.map((category) => (
                    <MenuItem key={category?._id} value={category?.catName}
                      data-attribute={category?._id}>
                      {category.catName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}>
                Attributes
              </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl fullWidth sx={{ mt: 5 }}>
                <InputLabel id="demo-simple-select-label"> Attributes </InputLabel>
                <Select name={"attributes"} label={"attributes"} type={'text'}
                  id="attribute-select"
                  value={addProduct.attributes} error={!addProduct.attributes}
                  onChange={(e) => {
                    handleChangeInput(e);
                    handleAttributeChange(e);
                  }}
                >
                  {
                    attribute.map((attribute) => (
                      <MenuItem key={attribute?._id} value={attribute.attName}
                        data-attribute={attribute?._id}>
                        {attribute.attName}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        {selectedAttribute && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid container>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}>
                  Attribute Values
                </Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={6} xs={12}>
                <FormControl fullWidth sx={{ mt: 5 }}>
                  <InputLabel id="demo-multiple-chip-label"> Attribute Values </InputLabel>
                  <Select labelId="demo-multiple-chip-label" id="demo-multiple-chip"
                    value={addProduct.attributesValue} onChange={handleChangeInput}
                    multiple name={"attributesValue"} type={'text'}
                    input={<OutlinedInput id="select-multiple-chip" label="Attribute Values" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {attributeValues.map((attributeValue) => (
                      <MenuItem
                        key={attributeValue._id}
                        value={attributeValue.displayName}
                      >
                        {attributeValue.displayName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}>
                Attributes
              </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl fullWidth sx={{ mt: 5 }}>
                <InputLabel>Grouping</InputLabel>
                <Select native id="grouped-native-select" label="Grouping">
                  <option aria-label="None" value="" />
                  <optgroup label="Color">
                    <option value={1}>Option 1</option>
                    <option value={2}>Option 2</option>
                  </optgroup>
                  <optgroup label="Size">
                    <option value={3}>Option 3</option>
                    <option value={4}>Option 4</option>
                  </optgroup>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box> */}

        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={'h6'} sx={{ mt: 5, ml: 5, mx: 0 }}>
                Attributes
              </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl variant="outlined" fullWidth sx={{ mt: 5 }}>
                <InputLabel htmlFor="outer-select">Attributes</InputLabel>
                <Select label="Attributes" value={outerValue} onChange={handleOuterChange}
                  inputProps={{ id: 'outer-select' }}
                >
                  {
                    attribute.map((attribute) => (
                      <MenuItem key={attribute} value={attribute.attName}>
                        {attribute.attName}
                      </MenuItem>
                    ))
                  }
                  <MenuItem value="option1">Roshan</MenuItem>
                  <MenuItem value="option2">Tanish</MenuItem>
                </Select>
              </FormControl>

              {outerValue && (
                <FormControl variant="outlined" fullWidth sx={{ mt: 3 }}>
                  <InputLabel htmlFor="inner-select">Inner Select</InputLabel>
                  <Select
                    label="Inner Select"
                    value={innerValue}
                    onChange={handleInnerChange}
                    inputProps={{ id: 'inner-select' }}
                  >

                    {outerValue === 'option1' ? (
                      [
                        <MenuItem key="option1-1" value="option1-1">azamgarh</MenuItem>,
                        <MenuItem key="option1-2" value="option1-2">delhi</MenuItem>
                      ]
                    ) : null}
                    {outerValue === 'option2' ? (
                      [
                        <MenuItem key="option2-1" value="option2-1">bst</MenuItem>,
                        <MenuItem key="option2-2" value="option2-2">hcl</MenuItem>
                      ]
                    ) : null}
                  </Select>
                </FormControl>
              )}
            </Grid>
          </Grid>
        </Box> */}

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}> Product Price</Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl fullWidth sx={{ mt: 5 }}>
                <OutlinedInput onChange={handleChangeInput} error={!addProduct.price}
                  required placeholder={"Product Price is required *"} name="price"
                  value={addProduct.price} type={"number"} startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}>Sale Price </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <FormControl fullWidth sx={{ mt: 5 }}>
                <OutlinedInput onChange={handleChangeInput} error={!addProduct.salePrice}
                  required placeholder={"Sale Price is required *"} name="salePrice"
                  value={addProduct.salePrice} type={"number"} startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant={"h6"}>Product Quantity</Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="outlined-basic" name="productQuantity" required variant="outlined"
                value={addProduct.productQuantity} error={!addProduct.productQuantity}
                placeholder={"Product Quantity is required *"} sx={{ mt: 5 }} fullWidth
                type={"number"} onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography sx={{ mt: 5, ml: 5, mx: 0 }} variant={"h6"}> Product Slug</Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="outlined-basic" name="productSlug" value={addProduct.productSlug}
                required variant="outlined" sx={{ mt: 5 }} fullWidth type={"text"}
                onChange={handleChangeInput} error={!addProduct.productSlug}
                placeholder={"Product Slug is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}> Product Tags </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField id="outlined-basic" name="productTags" value={addProduct.productTags}
                required variant="outlined" sx={{ mt: 5 }} fullWidth type={"text"}
                onChange={handleChangeInput} error={!addProduct.productTags}
                placeholder={"Product Tags is required *"}
              />
            </Grid>
          </Grid>
        </Box>

        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Typography variant={"h6"} sx={{ mt: 5, ml: 5, mx: 0 }}> Published </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField name="published" type={"text"} variant="outlined" select={"true"}
                value={addProduct.published} onChange={handleChangeInput} sx={{ mt: 5 }}
                fullWidth label="Published" error={!addProduct.published}
              >
                <MenuItem value={"Out Of Stock"}> Out Of Stock </MenuItem>
                <MenuItem value={"In Stock"}> In Stock </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box> */}

      </Box>
    </>
  );
};

export default InputField;
