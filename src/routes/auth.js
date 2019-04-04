import { check } from 'express-validator/check';
import express from 'express';

import * as registerController from '../controllers/auth/register';
import * as securityController from '../controllers/auth/security';

import User from '../models/user';

const router = express.Router();

router.get('/register', registerController.index);
router.post('/register',
  [
    check('firstname')
      .isLength({ max: 75 }).withMessage('Firstname is too long')
      .exists()
      .withMessage('Firstname is required'),
    check('lastname')
      .isLength({ max: 75 }).withMessage('Lastname is too long')
      .exists()
      .withMessage('Lastname is required'),
    check('password')
      .exists().withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must need 8 characters min.')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least 1 number.')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least 1 lowercase letter.')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least 1 uppercase letter.'),
    check('passwordConfirmation')
      .exists().withMessage('Password confirmation is required')
      .isLength({ min: 8 })
      .withMessage('Password must need 8 characters min.')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least 1 number.')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least 1 lowercase letter.')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least 1 uppercase letter.')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }

        return true;
      }),
    check('email').isEmail().custom(email => User.findOne({ email }).then((user) => {
      if (user) {
        return Promise.reject(new Error('E-mail already in use'));
      }
    })).normalizeEmail({ gmail_remove_dots: false }),
    check('address').isLength({ max: 75 }),
    check('address1').isLength({ max: 75 }),
    check('zipCode').isPostalCode('FR'),
    check('city').exists().withMessage('City is required'),
    check('phone')
      .isLength({ min: 10, max: 12 })
      .withMessage('Phone number must contain 10 characters.')
      .matches(/((\+?)(33|0)?([0-9]{9}))/g)
      .withMessage('Invalid format for phone number.')
  ],
  registerController.registration);

router.get('/login', securityController.index);
router.post('/login', securityController.login);

router.get('/logout', securityController.logout);

module.exports = router;
