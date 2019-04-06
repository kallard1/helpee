import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator/check';

import { newUserEmail } from '../../config/email';
import User from '../../models/user';

/**
 * Register page.
 *
 * @param req
 * @param res
 */
exports.index = async(req, res) => {
  if (req.user) {
    req.flash('warning', 'You are already logged in!');
    res.end();
    res.redirect('/');
  }

  res.render('auth/register/registration', {});
};

/**
 * Register treatment.
 *
 * @param req
 * @param res
 */
exports.registration = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('warning', errors.array());
    return res.redirect('/auth/register');
  }

  const {
    firstname, lastname, password: clearPassword, email, address, address1, zip_code, city, phone
  } = req.body;
  const password = await bcrypt.hash(clearPassword, 10);

  const user = new User({
    firstname,
    lastname,
    email,
    password,
    informations: {
      address, address1, zip_code, city, phone
    }
  });

  user.save().then(() => {
    newUserEmail(user);
    req.flash('success', 'Congratulation, your account was created with success. We sent a confirmation email.');
    res.redirect('/');
  }).catch((err) => {
    console.error(err);
  });
};