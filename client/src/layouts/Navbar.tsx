import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setLoggedOut } from '../features/userSlice';
import { logoutUser } from '../services/userService';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //const data= useSelector((state) => state.user.data);
  const { user, error, loading } = useAppSelector((state) => state.userR);
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.userR);
  const handleLogout = async () => {
    dispatch(setLoggedOut());
    navigate("/login");
    try {
        const res = await logoutUser();
        if (res.status === 200) {
          dispatch(setLoggedOut());
          navigate("/login");
        }
      } catch (error: any) {
        console.log(error);
      }
    };
  return (
    <nav className='nav'>
        <h1 className='logo'>Welcome!</h1>
        <div className='links'>
        <Link to="/" className='nav__link'>Home</Link>
        <Link to="/register" className='nav__link'>Register</Link>
        <Link to="/login" className='nav__link'>Login</Link>
        <Link to="/blogs" className='nav__link'>Blogs</Link>
        <Link to="/contact" className='nav__link'>Contact</Link>
        {isLoggedIn && (
          <Link to="/" onClick={handleLogout} className="link">Logout
          </Link>
      )} 
        </div>
    </nav>
  )
}

export default Navbar;