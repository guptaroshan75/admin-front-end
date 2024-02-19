import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Products from './Pages/Products'
import Dashboard from './Pages/Dashboard'
import Shipping from './Pages/Shipping'
import Order from './Pages/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute'
import SingleProductPage from './Pages/SingleProductPage'
import Category from './Pages/Category'
import Attributes from './Pages/Attributes'
import AttributeValues from './Pages/AttributeValues'
import ShippingValue from './Pages/ShippingValue'
import Blog from './Pages/Blog'
import Gallery from './Pages/Gallery'

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
          // <PrivateRoute currentUser={currentUser}>
          <Products />
          // </PrivateRoute>
        } />
        <Route path='/shipping' element={
          // <PrivateRoute currentUser={currentUser}>
          <Shipping />
          // </PrivateRoute>
        } />
        <Route path='/shipping-values/:id' element={
          // <PrivateRoute currentUser={currentUser}>
          <ShippingValue />
          // </PrivateRoute>
        } />
        <Route path='/orders' element={
          <PrivateRoute currentUser={currentUser}>
            <Order />
          </PrivateRoute>
        } />
        <Route path='/category' element={
          // <PrivateRoute currentUser={currentUser}>
          <Category />
          // </PrivateRoute>
        } />
        <Route path='/blog' element={
          // <PrivateRoute currentUser={currentUser}>
          <Blog />
          // </PrivateRoute>
        } />
         <Route path='/gallery' element={
          // <PrivateRoute currentUser={currentUser}>
          <Gallery />
          // </PrivateRoute>
        } />
        <Route path='/attributes' element={
          // <PrivateRoute currentUser={currentUser}>
          <Attributes />
          // </PrivateRoute>
        } />
        <Route path='/attribute-values/:id' element={
          // <PrivateRoute currentUser={currentUser}>
          <AttributeValues />
          // </PrivateRoute>
        } />
        <Route path='/singleProduct/:id' element={<SingleProductPage />} />
      </Routes>
    </>
  )
}

export default App;
