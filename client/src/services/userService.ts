import axios from "axios";
import { ForgotUser, ResetUser, UserLogin, UserRegister } from "../types/types";

const baseUrl = "http://localhost:3001/api/users/";

export const registerUser = async (values: UserRegister) => {
  const res = await axios.post(`${baseUrl}register`, values);
  return res;
};

export const verifyUser = async (token: string | undefined) => {
  const res = await axios.post(`${baseUrl}verify/${token}`);
  return res;
};

export const loginUser = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res;
};

export const userProfile = async () => {
  const res = await axios.get(`${baseUrl}profile`, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${baseUrl}logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return res;
};

export const refreshUser = async () => {
  const res = await axios.get(`${baseUrl}refresh`, {
    withCredentials: true,
  });
  return res.data;
};

export const forgotPassword = async (values: ForgotUser) => {
  const res = await axios.post(`${baseUrl}forgot-password`, values);
  return res;
};

export const resetPassword = async (
  values: ResetUser,
  token: string | undefined
) => {
  const res = await axios.post(`${baseUrl}reset-password/${token}`, values);
  return res;
};