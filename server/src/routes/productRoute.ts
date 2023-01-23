import express from 'express';
import { createProduct, 
         deleteProduct, 
         getAllProducts, 
         getProductById, 
         updateProduct } from '../controllers/productController';
//import { blogValidator } from '../validators/validators';
const { upload } = require("../middlewares/fileUpload");

const router = express.Router();

// all routes start with /api/blogs
router.get('/', getAllProducts);
router.get('/:id', getProductById);
//router.post('/', blogValidator, createProduct);
router.post('/', upload.single("image"), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;