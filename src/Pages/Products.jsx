import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import ProductList from '../Components/ProductList';
import AddProduct from '../Components/AddProduct'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { API } from '../API';

const category = [
  { label: 'The Shawshank Redemption' },
  { label: 'The Godfather' },
  { label: 'The Godfather: Part II' },
]

const price = [
  { label: 'Low to High' },
  { label: 'High to Low' },
  { label: 'Published' },
  { label: 'Unpublished' },
]

const Products = () => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [addProduct, setAddProduct] = useState({
    myImage: null,
    productName: '',
    description: '',
    productSKU: '',
    productBarcode: '',
    category: '',
    attributes: '',
    attributesValue: [],
    price: '',
    salePrice: '',
    productQuantity: '',
    productSlug: '',
    productTags: '',
  });

  const handleChangeInput = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value
    });
  }

  const handleFileUpload = (e) => {
    setAddProduct({
      ...addProduct,
      myImage: e.target.files[0]
    });
  };

  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(`${API}/getAllCategories`);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [products, setProducts] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(`${API}/getAllProducts`);
      const sortedProducts = response.data.data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setProducts(sortedProducts);
      setOriginalProducts(response.data.data);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  const searchAllProduct = async (searchValue) => {
    try {
      const response = await axios.get(`${API}/searchProducts/${searchValue}`);
      const searchResults = response.data.data.filter(product =>
        product.productName.charAt(0).toLowerCase() === searchValue.charAt(0).toLowerCase()
      );
      setSearchProducts(searchResults);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearChchange = (e) => {
    const searchValue = e.target.value
    if (searchValue === '') {
      setSearchProducts([])
      setCurrentPage(currentSearchPage);
    } else {
      searchAllProduct(searchValue)
      setCurrentSearchPage(currentPage)
    }
  }

  useEffect(() => {
    fetchAllProduct();
    fetchAllCategory();
    searchAllProduct();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, px: 3, mt: 10, ml: 30, mb: 20 }} >
      <Navbar />
      <Typography variant="h5" sx={{ my: 2, fontWeight: 800 }}> Products </Typography>
      <Paper sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', px: 2, py: 1 }} >
        <Box my={2}>
          <Button variant="outlined" startIcon={<FileUploadIcon />}
            sx={{ mr: 2, p: '10px', my: '5px' }}> Export
          </Button>
          <Button variant="outlined" startIcon={<SaveAltIcon />}
            sx={{ p: '10px', my: '5px' }}> Import
          </Button>
        </Box>

        <Box my={2}>
          <Button variant="contained" startIcon={<EditIcon />}
            sx={{
              mr: 2, p: '10px', my: '5px', backgroundColor: '#bbbfbc', '&:hover': {
                backgroundColor: '#bbbfbc'
              },
            }}> Bulk Action
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />}
            sx={{
              mr: 2, p: '10px', my: '5px', backgroundColor: '#ed5342', '&:hover': {
                backgroundColor: '#ed5342',
              },
            }}> Delete
          </Button>
          <Button>
            <AddProduct handleChangeInput={handleChangeInput} addProduct={addProduct}
              handleFileUpload={handleFileUpload} categories={categories}
              setAddProduct={setAddProduct} fetchAllProduct={fetchAllProduct}
            />
          </Button>
        </Box>
      </Paper>
      <Paper sx={{
        display: 'flex', justifyContent: 'space-between',
        flexWrap: 'wrap', px: 2, py: 1, mt: 3, alignItems: 'center'
      }}
      >
        <Box sx={{ m: 1 }} size="small">
          <TextField variant="outlined" sx={{ width: 300 }} placeholder='Search Product'
            onChange={handleSearChchange}
          />
        </Box>
        <Box>
          <Autocomplete disablePortal options={category} sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} placeholder='Category' />}
          />
        </Box>
        <Box>
          <Autocomplete disablePortal options={price} sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} placeholder='Price' />}
          />
        </Box>
      </Paper>
      <Box my={2}>
        <ProductList products={products} key={products?.id}
          searchProducts={searchProducts} fetchAllProduct={fetchAllProduct}
          setProducts={setProducts} categories={categories}
        />
      </Box>
    </Box>
  );
}

export default Products;