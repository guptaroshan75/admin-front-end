import React, { useState } from "react";
import { Box, Divider, FormControlLabel, Pagination, Switch } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Typography, Paper, Stack, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { API } from "../API";
import axios from "axios";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

const CategoryList = ({ fetchAllCategory, categories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = categories.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleBadgeVisibility = async (catId) => {
    const updatedCategory = categories.map(category => {
      if (category._id === catId) {
        const updatedCat = {
          ...category,
          status: category.status,
        };
        updateVisibility(catId, updatedCat.status);
        return updatedCat;
      }
      return category;
    });
    fetchAllCategory(updateVisibility);
    return updatedCategory;
  };

  const updateVisibility = async (catId, checked) => {
    try {
      await axios.put(`${API}/updateCategoryVisble/${catId}`, { status: checked });
      fetchAllCategory();
      toast.success("Category Visibility In DataBase");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Box style={{ height: 400, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell scope="row"> ID </TableCell>
                <TableCell align="right"> CATEGORY NAME </TableCell>
                <TableCell align="right"> IMAGE </TableCell>
                <TableCell align="right"> STATUS </TableCell>
                <TableCell align="right"> ACTIONS </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleProducts.map(category => (
                <TableRow>
                  <TableCell scope="row" sx={{ fontWeight: 800 }}>
                    {category._id.slice(-4)}
                  </TableCell>
                  <TableCell align="right"> {category.catName} </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                      <Avatar alt={category.catName} src={category.myImage} />
                    </Stack>
                  </TableCell>
                  <TableCell align="right" >
                    <FormControlLabel
                      sx={{ color: 'text.primary', justifyContent: "center" }}
                      control={
                        <Switch
                          checked={category.status}
                          onChange={() => handleBadgeVisibility(category?._id)}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box display={"flex"} justifyContent={'flex-end'}>
                      <Typography>
                        <EditCategory category={category}
                          fetchAllCategory={fetchAllCategory}
                        />
                      </Typography>
                      <Typography>
                        <DeleteCategory category={category} fetchAllCategory={fetchAllCategory} />
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }} my={2}>
            <Pagination count={Math.ceil(categories.length / itemsPerPage)}
              page={currentPage} onChange={handlePageChange} color="primary"
            />
          </Box>
        </TableContainer>
      </Box>
    </>
  );
};

export default CategoryList;
