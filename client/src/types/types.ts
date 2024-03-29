import { StringMappingType } from "typescript";

export type InitialStateUser = {
    error: string;
    loading: boolean;
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: { name: string; email: string; phone: string };
  };
  
  export type InitialStateBlog = {
    error: string;
    loading: boolean;
    blogs: Blog[];
  };
  
  export type Blog = {
    id: string;
    title: string;
    image: string;
    author: string;
    publishDate: string;
    body: string;
  };
  
  export type NewBlog = {
    title: string;
    author: string;
    publishDate: string;
    body: string;
    image: string;
  };
  
  export type BlogProps = {
    blog: {
      id: string;
      title: string;
      author: string;
      publishDate: string;
      body: string;
      image: string;
    };
  };
  
  export type UserProfile = {
    name: string;
    email: string;
    phone: string;
  };
  
  export type UserRegister = {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
  
  export type UserLogin = {
    email: string;
    password: string;
  };
  
  export type ForgotUser = {
    email: string;
  };
  
  export type ResetUser = {
    password: string;
  };
  
  export type ModalProps = {
    message: string;
    closeModal: Function;
  };
  
  export type PaginationProps = {
    postsPerPage: number;
    totalPosts: number;
    paginate: (pageN: number) => void;
  };