import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator/check";

import { newUserEmail } from "../../config/email";
import { default as User } from "../../models/user";

/**
 * Register page.
 *
 * @param req
 * @param res
 */
export let index = async (req: Request, res: Response) => {
  if (req.user) {
    req.flash("warning", "You are already logged in!");
    res.redirect("/");
  }

  res.render("auth/register/registration", {});
};

/**
 * Register treatment.
 *
 * @param req
 * @param res
 */
export let registration = async (req: Request, res: Response) => {
  console.log("registration");
  const errors = validationResult(req);
  console.log(errors.isEmpty(), errors.array());
  if (!errors.isEmpty()) {
    req.flash("warning", errors.array());
    // return res.redirect("/auth/register");
  }

  const { firstname, lastname, password: clearPassword, email, address, address1, zip_code, city, phone } = req.body;
  const password = await bcrypt.hash(clearPassword, 10);

  const user = new User({
    firstname,
    lastname,
    email,
    password,
    informations: { address, address1, zip_code, city, phone },
  });

  user.save().then(() => {
    newUserEmail(user);
    req.flash("success", "Congratulation, your account was created with success. We sent a confirmation email.");
    res.redirect("/");
  }).catch((err) => {
    console.log(err);
  });
};
