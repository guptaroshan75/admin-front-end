import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Paper from "@mui/material/Paper";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import CategoryAdd from "../Components/CategoryAdd";
import CategoryList from "../Components/CategoryList";
import { API } from "../API";
import axios from "axios";

const category = [
  { label: "The Shawshank Redemption" },
  { label: "The Godfather" },
  { label: "The Godfather: Part II" },
  { label: "The Dark Knight" },
  { label: "12 Angry Men" },
  { label: "Schindler's List" },
  { label: "Pulp Fiction" },
];

const price = [
  { label: "Low to High" },
  { label: "High to Low" },
  { label: "Published" },
  { label: "Unpublished" },
  { label: "Status - Selling" },
  { label: "Status - Out of Stock" },
  { label: "Date Added (Asc)" },
  { label: "Date Added (Desc)" },
  { label: "Date Updated (Asc)" },
  { label: "Date Updated (Desc)" },
];

const Category = () => {
  const [addCategory, setAddCategory] = useState({
    catName: "",
    myImage: null,
  });

  const handleChangeInput = (e) => {
    setAddCategory({
      ...addCategory,
      [e.target.name]: e.target.value
    });
  }

  const handleFileUpload = (e) => {
    setAddCategory({
      ...addCategory,
      myImage: e.target.files[0]
    });
  };

  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = () => {
  //       reject(error);
  //     };
  //   });
  // }

  // const handleFileUpload = async e => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);
  //   setAddCategory({
  //     ...addCategory,
  //     myImage: base64,
  //   });
  // };

  // const handleChangeInput = e => {
  //   setAddCategory({
  //     ...addCategory,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const [categories, setCategories] = useState([]);

  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(`${API}/getAllCategories`);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, px: 3, mt: 10, ml: 30, mb: 20 }}>
      <Navbar />
      <Typography variant="h5" sx={{ my: 2, fontWeight: 800 }}> Category </Typography>
      <Paper sx={{
        display: "flex", justifyContent: "space-between",
        alignContent: "center", flexWrap: "wrap", px: 2, py: 1
      }}
      >
        <Box my={2}>
          <Button variant="outlined" startIcon={<FileUploadIcon />}
            sx={{ mr: 2, p: "10px", my: "5px" }}
          > Export
          </Button>
          <Button variant="outlined" startIcon={<SaveAltIcon />}
            sx={{ p: "10px", my: "5px" }}
          > Import
          </Button>
        </Box>

        <Box my={2}>
          <Button variant="contained" startIcon={<EditIcon />}
            sx={{
              mr: 2, p: "10px", my: "5px", backgroundColor: "#bbbfbc",
              "&:hover": { backgroundColor: "#bbbfbc" },
            }}
          > Bulk Action
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />}
            sx={{
              mr: 2, p: "10px", my: "5px", backgroundColor: "#ed5342",
              "&:hover": { backgroundColor: "#ed5342" },
            }}
          > Delete
          </Button>
          <Button>
            <CategoryAdd handleFileUpload={handleFileUpload} addCategory={addCategory}
              setAddCategory={setAddCategory} handleChangeInput={handleChangeInput}
              fetchAllCategory={fetchAllCategory}
            />
          </Button>
        </Box>
      </Paper>
      <Paper sx={{
        display: "flex", justifyContent: "space-between",
        flexWrap: "wrap", px: 2, py: 1, mt: 3, alignItems: "center",
      }}
      >
        <Box sx={{ m: 1 }} size="small">
          <TextField variant="outlined" sx={{ width: 300 }} placeholder="Search Category" />
        </Box>
        <Box>
          <Autocomplete disablePortal options={category} sx={{ width: 300 }}
            renderInput={params => (<TextField {...params} placeholder="Category" />)}
          />
        </Box>
        <Box>
          <Autocomplete disablePortal options={price} sx={{ width: 300 }}
            renderInput={params => (<TextField {...params} placeholder="Price" />)}
          />
        </Box>
      </Paper>
      <Box my={2}>
        <CategoryList categories={categories} key={categories?._id}
          fetchAllCategory={fetchAllCategory}
        />
      </Box>
    </Box>
  );
};

export default Category;
