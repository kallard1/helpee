import { check } from 'express-validator/check';
import express from 'express';

import { isLoggedInAndAdmin } from '../middlewares/isLoggedIn';

import * as adsCategoriesController from '../controllers/admin/ads/ads_categories';
//import * as dashboardController from '../controllers/admin/dashboard';

const router = express.Router();

router.get('/ads/categories', isLoggedInAndAdmin, adsCategoriesController.index);

router.get('/ads/category/new', isLoggedInAndAdmin, adsCategoriesController.new);

router.get('/ads/category/edit/:slug', isLoggedInAndAdmin, adsCategoriesController.edit);

router.post(
  '/ads/category/save/:id?',
  isLoggedInAndAdmin,
  [
    check('label')
      .isLength({ max: 75 })
      .withMessage('Label is too long')
      .exists()
      .withMessage('Label is required')
  ],
  adsCategoriesController.save
);
router.get('/ads/category/delete/:slug', isLoggedInAndAdmin, adsCategoriesController.delete);

module.exports = router;
