import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setAdmin, setLoggedIn } from "../../features/userSlice";
import { UserLogin } from "../../types/types";
import { loginAdmin } from "../../services/adminService";

export const AdminLogin = () => {
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
        const res = await loginAdmin(values);
        if (res.status === 200) {
          dispatch(setLoggedIn());
          dispatch(setAdmin());
          toast.success(res.data.message);
          resetForm({});
          navigate("/dashboard");
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="form">
      <ToastContainer />
      <h1>Admin Login:</h1>
      <div className="card">
        <form onSubmit={formik.handleSubmit}>
          <div className="form__section">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div className="formikErrMsg">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="formikErrMsg">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button className="verificationBtn" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="buttonSection">
          <button
            className="secondaryBtn"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot password?
          </button>
          <button
            className="secondaryBtn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to user login
          </button>
        </div>
      </div>
    </div>
  );
};