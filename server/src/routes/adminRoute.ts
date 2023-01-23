import express from 'express';

import { isAuthorised } from '../middlewares/authorise';
import { loginUserValidator } from '../validators/validators';
import { loginAdmin, showDashboard } from '../controllers/adminController';

const router = express.Router();

// all routes start with /api/admin
router.post('/login', loginUserValidator, loginAdmin);
router.get('/dashboard', isAuthorised, showDashboard);

export default router;