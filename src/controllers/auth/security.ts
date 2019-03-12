import { NextFunction, Request, Response } from "express";
import passport from "passport";

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
 * GET Logout page.
 *
 * @param req
 * @param res
 * @param next
 */
export let logout = async(req: Request, res: Response, next: NextFunction) => {
  req.logout();
  req.flash("success", "You are logged out.");
  res.redirect("/auth/login");
};
