import React from 'react'
import { Link } from 'react-router-dom'

import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setLoggedIn } from "../../features/userSlice";
import { loginUser } from "../../services/userService";
import { UserLogin } from "../../types/types";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values: UserLogin, { resetForm }) => {
      try {
        const res = await loginUser(values);
        if (res.status === 200) {
          dispatch(setLoggedIn());
          toast.success(res.data.message);
          resetForm({});
          navigate("/profile");
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <div className='form'>
       <ToastContainer />
      <h1 className="text p-3">Login</h1>
      <div className='page'>
        <form onSubmit={formik.handleSubmit}>
          <div className='form__section'>
            <label htmlFor="email">Email:</label>
            <input type="email" 
               id="email" 
               {...formik.getFieldProps("email")}
               required />
            {formik.touched.email && formik.errors.email ? (
              <div className="formikErrMsg">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='form__section'>
            <label htmlFor="password">Password:</label>
            <input type="password"
               id="password"  
               {...formik.getFieldProps("password")}
               required />
            {formik.touched.password && formik.errors.password ? (
              <div className="formikErrMsg">{formik.errors.password}</div>
            ) : null}
          </div>
          
          <div className="form__section">
            <button className="submitBtn" type="submit">
              Login
            </button>
            </ div>
        </form>
        <div className='userLink'>
          <Link to ="/forgotpassword" className ="link">Forgot password?</Link>
          <Link to ="/admin-login" className ="link m-5">Are you an admin?</Link>
          <p>Don't have an account?  <Link to ="/register" >Register</Link> </p>
        </div>
      </div>
    </div>
  )
}
