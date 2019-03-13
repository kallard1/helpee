import async from "async";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/check";
import passport from "passport";
import { v4 as uuid } from "uuid";

import { editPasswordConfirmation, forgotPassword } from "../../config/email";
import { default as User, UserModel } from "../../models/user";

/**
 * GET Login page.
 *
 * @param req
 * @param res
 */

export let index = async (req: Request, res: Response) => {
  if (req.user) {
    req.flash("warning", "You are already logged in!");
    res.end();
    res.redirect("/");
  }
  res.render("auth/security/login", {
    csrfToken: req.csrfToken(),
  });
};

/**
 * POST Login page.
 *
 * @param req
 * @param res
 * @param next
 */
export let login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
};

/**
 * GET Forgot password page.
 *
 * @param req
 * @param res
 */
export let forgot = async (req: Request, res: Response) => {
  res.render("auth/forgot/forgot");
};

/**
 * POST Forgot password.
 *
 * @param req
 * @param res
 * @param next
 */
export let generatePasswordToken = async (req: Request, res: Response, next: NextFunction) => {
  async.waterfall([
    (done: any) => {
      const token = uuid();

      done(null, token);
    },
    (token: string, done: any) => {
      User.findOne({ email: req.body.email }, (err: Error, user: UserModel) => {
        if (!user) {
          req.flash("warning", "No account found with this email.");
          return res.redirect("/auth/forgot-password");
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        user.save((err) => {
          done(err, user);
        });
      });
    },
    (user: UserModel, done: any) => {
      forgotPassword(user, done);
    },
  ], (err) => {
    if (err) return next(err);
    req.flash("info", "An e-mail has been sent with further instructions.");
    return res.redirect("/auth/forgot-password");
  });
};

/**
 * GET reset password page.
 *
 * @param req
 * @param res
 */
export let resetPassword = async (req: Request, res: Response) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }, (err: Error, user: UserModel) => {
    if (!user) {
      req.flash("danger", "Password reset token is invalid or has expired");
      return res.redirect("/auth/forgot-password");
    }

    res.render("auth/forgot/reset");
  });
};

/**
 * Post /auth/reset-password.
 *
 * @param req
 * @param res
 * @param next
 */
export let resetingPassword = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("warning", errors.array());
    return res.redirect(`/auth/forgot-password/${req.params.token}`);
  }

  async.waterfall([
    (done: any) => {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      }, (err, user) => {
        if (!user) {
          req.flash("danger", "Password reset token is invalid or has expired");
          return res.redirect("/auth/forgot-password");
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(() => {
          req.logIn(user, (err: Error) => {
            done(err, user);
          });
        });
      });
    }, (user: UserModel, done: any) => {
      editPasswordConfirmation(user, done);
    }], (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

/**
 * GET Logout page.
 *
 * @param req
 * @param res
 */
export let logout = async (req: Request, res: Response) => {
  req.logout();
  req.flash("success", "You are logged out.");
  res.redirect("/auth/login");
};
