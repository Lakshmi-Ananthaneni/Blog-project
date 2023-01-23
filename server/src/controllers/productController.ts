import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { v4 } from 'uuid';
import { errorRes, successRes } from '../helpers/responseHelper';
import Product from '../models/productModel';


// / (GET)
export const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
  try {
   const products = await Product.find();
    return successRes(res, 200, 'success', products);
    //res.status(200).send(products);
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (GET)
export const getProductById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: id });
    if (product) {
      return successRes(res, 200, 'found product', product);
    } else {
      return errorRes(res, 400, 'product with id does not exist');
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};

// / (POST)
export const createProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, rating, category } = req.body;
    console.log(req.body);
    const product = new Product({
      id: v4(),
      //image: req.file?.filename,
      name: name,
      price: price,
      description: description,
      rating: rating,
      category: category,
    });
    const newProduct = await product.save();
    if (newProduct) {
      successRes(res, 201, 'Product successfully created', newProduct);
    }
  } catch (error: any) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (POST)
export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, rating, category } = req.body;
    const { id } = req.params;
    const product = await Product.findOne({ id: id });
    if (product) {
      const updatedProduct = await Product.updateOne(
        { id: id },
        {
          $set: {
            name, price, description, rating, category
          }
        },
        {
          new: true
        }
      );
      if (updatedProduct) {
        successRes(res, 201, 'Product successfully updated', updatedProduct);
      } else {
        return errorRes(res, 400, 'could not update product');
      }
    } else {
      return errorRes(res, 400, 'could not find product with id');
    }
  } catch (error: any) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (DELETE)
export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: id });
    if (product) {
      await Product.deleteOne({ id: id });
      return successRes(res, 200, 'Product deleted', product);
    } else {
      return errorRes(res, 400, 'product with id does not exist');
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};