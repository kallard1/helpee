import { check } from 'express-validator/check';
import express from 'express';

import * as communityController from '../controllers/community';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const router = express.Router();

router.get('/new', isLoggedIn, communityController.new);
router.post('/save', isLoggedIn, [
  check('name')
    .isLength({ max: 75 })
    .withMessage('Name is too long')
    .exists()
    .withMessage('Name is required'),
  check('city')
    .exists()
    .withMessage('City is required'),
  check('description')
    .exists()
    .withMessage('Description is required')
], communityController.save);

module.exports = router;
