import { Box, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, px: 3, mt: 10, ml: 30, }} >
      <Navbar />
      <Typography variant="h5" sx={{ my: 2, fontWeight: 800 }}> Dashboard Overview </Typography>
    </Box>
  )
}

export default Dashboard