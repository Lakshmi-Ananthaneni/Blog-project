import React from 'react';

import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRegister } from "../../types/types";
import { registerUser } from "../../services/userService";
import { Link } from 'react-router-dom';

export const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(8, "Must be exactly 8 digits")
        .max(8, "Must be exactly 8 digits"),
    }),
    onSubmit: async (values: UserRegister, { resetForm }) => {
      try {
        const res = await registerUser(values);
        if (res.status === 200) {
          toast.success(res.data.message);
          resetForm({});
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <div className='form'>
       <ToastContainer />
      <h1 className='text p-5'>Create your account</h1>
      <div className='page'>
        <form onSubmit={formik.handleSubmit}>
          <div className='form__section'>
            <label htmlFor="name">Name:</label>
            <input type="text" 
              id="name" 
              value={formik.values.name}
              onChange={formik.handleChange}
              required />
            {formik.touched.name && formik.errors.name ? (
              <div className="formikErrMsg">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className='form__section'>
            <label htmlFor="email">Email:</label>
            <input type="email" 
              id="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              required />
            {formik.touched.email && formik.errors.email ? (
              <div className="formikErrMsg">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='form__section'>
            <label htmlFor="password">Password:</label>
            <input type="password" 
              id="password" 
              value={formik.values.password}
              onChange={formik.handleChange}
              required />
            {formik.touched.password && formik.errors.password ? (
              <div className="formikErrMsg">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className='form__section'>
            <label htmlFor="phone">Phone:</label>
            <input type="text" 
              id="phone" 
              value={formik.values.phone}
              onChange={formik.handleChange}
              required />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="formikErrMsg">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button className="submitBtn" type="submit">
              Register
            </button>
            </ div>
        </form>
        <div className='UserLink'>
         <p>Already have an account?  <Link to ="/login" >Login</Link> </p>
        </div>
      </div>
    </div>
  )
}
