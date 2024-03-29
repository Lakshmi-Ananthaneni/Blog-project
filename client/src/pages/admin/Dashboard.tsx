import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useDebounce from "../../app/useDebounce";
import BlogAdmin from "../../components/BlogAdmin";
import Pagination from "../../components/Pagination";
import { fetchBlogs } from "../../features/blogSlice";
import { fetchUser, setUser } from "../../features/userSlice";
import { refreshUser } from "../../services/userService";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 1000);
  const { blogs, error } = useAppSelector((state) => state.blogR);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(2);
  const indexLast = currentPage * postsPerPage;
  const indexFirst = indexLast - postsPerPage;
  const currentPosts = blogs.slice(indexFirst, indexLast);
  const totalPosts: number = blogs.length;

  //pagination function
  const paginate = (pageN: number): void => {
    setCurrentPage(pageN);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchBlogs(search));
  }, [debouncedValue, dispatch, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchBlogs(search));
  }, [dispatch, debouncedValue, search]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  //get login state
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  //if the user is logged in --> call refresh token from this route too

  //use useCallback so that only rerenders on dispatch
  const handleRefresh = useCallback(async () => {
    try {
      const res = await refreshUser();
      dispatch(setUser(res.foundUser));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 1000 * 20);
      return () => clearInterval(interval);
    }
  }, [dispatch, handleRefresh, isLoggedIn]);

  return (
    <main className="blog">
      {error && <p>Error</p>}
      <form
        className="searchBar"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="searchLabel" htmlFor="search">
          Search for a blog:
        </label>
        <input
          name="search"
          type="text"
          value={search}
          onChange={handleChange}
        />
      </form>
      <section className="blogContainer">
        <button
          className="verificationBtn editBtn"
          onClick={() => {
            navigate("/add-blog");
          }}
        >
          Add a new blog
        </button>
        {currentPosts.map((blog) => {
          return <BlogAdmin key={blog.id} blog={blog} />;
        })}
      </section>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
      />
    </main>
  );
};