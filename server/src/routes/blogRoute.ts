import express from 'express';
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlogById
} from '../controllers/blogController';
import { isAuthorised } from '../middlewares/authorise';
import { blogValidator } from '../validators/validators';
const { upload } = require("../middlewares/fileUpload");

const router = express.Router();

// all routes start with /api/blogs
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
//router.post('/', blogValidator, createBlog);
router.post('/', upload.single("image"), createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlogById);

export default router;