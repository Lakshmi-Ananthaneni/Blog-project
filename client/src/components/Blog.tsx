import React from "react";
import { BlogProps } from "../types/types";

const Blog = (props: BlogProps) => {
  const { title, author, publishDate, body ,image} = props.blog;
  return (
    <article className="blogContainer__item">
      <h2 className="title">{title }</h2>
      <div><img className='image' src={image} alt={image} /></div>
      <h5>{author}</h5>
      <p>{publishDate}</p>
      <p>{body}</p>
    </article>
  );
};

export default Blog;