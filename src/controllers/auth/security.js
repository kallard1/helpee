import async from 'async';
import passport from 'passport';
import { v4 as uuid } from 'uuid';
import { forgotPassword } from '../../config/email';

import User from '../../models/user';

/**
 * GET /auth/login.
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
  res.render('auth/security/login', {
    csrfToken: req.csrfToken()
  });
};

/**
 * POST /auth/login.
 *
 * @param req
 * @param res
 * @param next
 */
exports.login = async(req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
};

/**
 * GET /auth/forgot-password
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.forgot = async(req, res) => {
  res.render('auth/forgot/forgot');
};

/**
 * POST /auth/forgot-password
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.generateToken = async(req, res, next) => {
  async.waterfall([
    (done) => {
      const token = uuid();

      done(null, token);
    },
    (token, done) => {
      User.findOne({ email: req.body.email }, (err, user) => {
        const u = user;
        if (!user) {
          req.flash('warning', 'No account found with this email.');
          return res.redirect('/auth/forgot-password');
        }

        if (err) {
          console.error(err);
        }

        u.resetPasswordToken = token;
        u.resetPasswordExpires = Date.now() + 3600000;

        u.save((error) => {
          done(error, u);
        });
      });
    },
    (user, done) => {
      forgotPassword(user, done);
    }
  ], (err) => {
    if (err) return next(err);
    req.flash('info', 'An e-mail has been sent with further instructions.');
    return res.redirect('/auth/forgot-password');
  });
};

/**
 * /auth/reset-password/:token
 */
exports.resetPassword = async(req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  }, (err, user) => {
    if (!user) {
      req.flash('danger', 'Password reset token is invalid or has expired');
      return res.redirect('/auth/forgot-password');
    }

    if (err) {
      console.error(err);
    }

    res.render('auth/forgot/reset');
  });
};

/**
 * GET /auth/logout.
 *
 * @param req
 * @param res

 */
exports.logout = async(req, res) => {
  req.logout();
  req.flash('success', 'You are logged out.');
  res.redirect('/auth/login');
};
