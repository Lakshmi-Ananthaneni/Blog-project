import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const registerUserValidator = [
  check('name').notEmpty().withMessage('Name is missing'),
  check('email').notEmpty().normalizeEmail().isEmail().withMessage('Not a valid email address.'),
  check('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
  check('phone').notEmpty().withMessage('Phone number is missing'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors.array().map((error) => error.msg);
      return res.status(404).json({
        validationErrors
      });
    }
    return next();
  }
];

export const loginUserValidator = [
  check('email').notEmpty().normalizeEmail().isEmail().withMessage('Not a valid email address.'),
  check('password').notEmpty().withMessage('Must provide password.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors.array().map((error) => error.msg);
      return res.status(404).json({
        validationErrors
      });
    }
    return next();
  }
];

export const blogValidator = [
  check('title').notEmpty().withMessage('Must povide title'),
  check('image').notEmpty().withMessage('Must povide image'),
  check('author').notEmpty().withMessage('Must provide author.'),
  check('publishDate').notEmpty().withMessage('Must provide date.'),
  check('body')
    .notEmpty()
    .isLength({ min: 20 })
    .withMessage('Content body must be at least 20 characters.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors.array().map((error) => error.msg);
      return res.status(404).json({
        validationErrors
      });
    }
    return next();
  }
];