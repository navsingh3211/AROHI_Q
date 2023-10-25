/* eslint-disable max-len */
import express from 'express';

import {
  register,login,forgetPassword
} from '../controllers/auth/register.js';
import {
  userRegisterSchema,userLoginSchema
} from '../validators/user.validator.js';

// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/register',
  [userRegisterSchema],
  register
);
router.post('/login', [userLoginSchema], login);
router.post('/forget-password', forgetPassword);
// router.get('/getCategoryList', getCategoryList);

export default router;
