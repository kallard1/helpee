import async from "async";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { v4 as uuid } from "uuid";

import { forgotPassword } from "../../config/email";
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

export let forgot = async (req: Request, res: Response) => {
  res.render("auth/forgot/forgot");
};

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
 * GET Logout page.
 *
 * @param req
 * @param res
 * @param next
 */
export let logout = async (req: Request, res: Response) => {
  req.logout();
  req.flash("success", "You are logged out.");
  res.redirect("/auth/login");
};
