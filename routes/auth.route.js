/* eslint-disable max-len */
import express from 'express';

import {
  register
} from '../controllers/auth/register.js';
import {
  UserRegisterSchema
} from '../validators/user.validator.js';

// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/register',
  [UserRegisterSchema],
  register
);
// router.post('/update', inventoryCategoryUpdateSchema, editInventoryCategory);
// router.get('/deleteCategory/:id', deleteInventoryCategory);
// router.get('/getCategoryList', getCategoryList);

export default router;
