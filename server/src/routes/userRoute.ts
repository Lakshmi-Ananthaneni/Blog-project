import express from 'express';

import { isAuthorised } from '../middlewares/authorise';
import { registerUserValidator, loginUserValidator } from '../validators/validators';
import {
  registerUser,
  loginUser,
  showProfile,
  logoutUser,
  createRefreshToken,
  verifyUser,
  forgotPassword,
  resetPassword
} from '../controllers/userController';

const router = express.Router();

// all routes start with /api/users

router.post('/register',  registerUser);
router.post('/verify/:token', verifyUser);
router.post('/login', loginUserValidator, loginUser);
router.get('/profile', isAuthorised, showProfile);
router.get('/refresh', createRefreshToken, isAuthorised, showProfile);
router.post('/logout', isAuthorised, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;