import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Nopage from './pages/nopage/Nopage';
import ProductInfo from './pages/productInfo/ProductInfo';
import ScrollTop from './Components/scrollTop/ScrollTop';
import Cart from './pages/cart/Cart';
import AllProduct from './pages/allProduct/AllProduct';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import UserDashboard from './pages/user/userDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProductPage from './pages/admin/AddProductPage';
import UpdateProductPage from './pages/admin/UpdateProduct';
import MyState from './context/myState';
import { Toaster } from 'react-hot-toast';
import Category from './Components/category/Category';
import { Logout } from './pages/logout/Logout';
import CategoryPage from './pages/category/CategoryPage';
import myContext from './context/myContext'; 
import PulseLoader from "react-spinners/PulseLoader";


const App = () => {
 const[ loading, SetLoading]= useState(true)

  useEffect(()=>{
   SetLoading(false)
  })


  return (
    <>
    {loading ? ( <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#d81b60" />
        </div>):  <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/*" element={<Nopage />} />
          <Route path="/product/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard/:email" element={<UserDashboard />} />

              <Route path="/addproduct" element={<AddProductPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/updateproduct/:id" element={<UpdateProductPage />} />
       

          <Route path="/category" element={<Category />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
        </Routes>
        <Toaster />
      </Router>
    </MyState>}
  
    </>
  );
};

export default App;
