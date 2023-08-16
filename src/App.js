import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Products from './Pages/Products'
import Dashboard from './Pages/Dashboard'
import Customer from './Pages/Customer'
import Order from './Pages/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute'
import SingleProductPage from './Pages/SingleProductPage'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path='/dashboard' element={
          <PrivateRoute currentUser={currentUser}>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/products' element={
          <PrivateRoute currentUser={currentUser}>
            <Products />
          </PrivateRoute>
        } />
        <Route path='/customers' element={
          <PrivateRoute currentUser={currentUser}>
            <Customer />
          </PrivateRoute>
        } />
        <Route path='/orders' element={
          <PrivateRoute currentUser={currentUser}>
            <Order />
          </PrivateRoute>
        } />
        <Route path='/singleProduct/:id' element={<SingleProductPage />} />
      </Routes>
    </>
  )
}

export default App;
