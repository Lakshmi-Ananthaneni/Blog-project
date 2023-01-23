/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeAdmin, setAdmin, setLoggedIn, setLoggedOut } from '../features/userSlice';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';
import { Activate, AdminLogin, Blogs, Contact, Dashboard, Error, ForgotPassword, Home, Login, Logout, Profile, Register, ResetPassword } from '../pages/Index';


const index = () => {
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.userR);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let loginState = JSON.parse(localStorage.getItem("isLoggedIn")!);
    let adminState = JSON.parse(localStorage.getItem("isAdmin")!);
    if (loginState === true) {
      dispatch(setLoggedIn());
    } else if (loginState === false) {
      dispatch(setLoggedOut());
    }
    if (adminState === true) {
      dispatch(setAdmin());
    } else if (adminState === false) {
      dispatch(removeAdmin());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
       <Navbar />
       <main className='main'>
        <Routes>
         <Route path ="/" element= {<Home />} />
         <Route path ="/contact" element= {<Contact/>} />
        
           <Route path ="/register" element= {<Register/>} />
           <Route path ="/login" element= {<Login />} />
        
          <Route path ="/activate/:token" element= {<Activate/>} />
          <Route path ="/forgotpassword" element= {<ForgotPassword/>} />
          <Route path ="/resetpassword/:token" element= {<ResetPassword/>} />
          <Route path ="/profile" element= {<Profile/>} />
          <Route path ="/blogs" element= {<Blogs/>} />
          <Route path ="*" element= {<Error/>} />
       
         {!isLoggedIn && (
           <Route path ="/admin-login" element= {<AdminLogin />} />
          )}
          
            
       
          {isLoggedIn && isAdmin && (
           <Route path="/dashboard" element={<Dashboard />}></Route>
          )}
        
       
         
        {isLoggedIn &&  (
            <Route path ="/logout" element= {<Logout/>} />
          )}
        
       
         
        </Routes>
       </main>
       <Footer />
    </BrowserRouter>
  )
}

export default index;