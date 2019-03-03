import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../../models/users";

/**
 * Register page.
 *
 * @param request
 * @param response
 */
export let index = async (request: Request, response: Response) => {
  response.render("auth/register", {
    csrfToken: request.csrfToken(),
  });
};

/**
 * Register treatment.
 *
 * @param request
 * @param response
 */
export let registration = async (request: Request, response: Response) => {

  const user = await User.setUser({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    password: bcrypt.hashSync(request.body.password, 10),
    email: request.body.email,
    role: "ROLE_USER",
  });

  await User.setInformationsUser({
    user,
    address: request.body.address,
    address1: request.body.address1,
    zip_code: request.body.zipCode,
    city: request.body.city,
  });

  request.flash("success", "Votre compte a été créé avec succès !");

  response.redirect("/");
};
