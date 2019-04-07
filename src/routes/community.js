import { check } from 'express-validator/check';
import express from 'express';

import * as communityController from '../controllers/community';

const router = express.Router();

router.get('/new', communityController.new);
router.post('/save', [
  check('name')
    .isLength({ max: 75 })
    .withMessage('Name is too long')
    .exists()
    .withMessage('Name is required'),
  check('zipCode')
    .isPostalCode('FR')
    .withMessage('Zip code is not valid'),
  check('city')
    .exists()
    .withMessage('City is required'),
  check('description')
    .exists()
    .withMessage('Description is required')
], communityController.save);

module.exports = router;
