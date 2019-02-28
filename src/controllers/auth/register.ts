import bcrypt from "bcrypt";
import { Request, Response } from "express";

import bdd from "../../config/bdd";
import { UserInterface } from "../../Interfaces/UserInterface";

/**
 * Register page.
 *
 * @param request
 * @param response
 */
export let index = async (request: Request, response: Response) => {

  request.flash("error", "Votre compte a été créé avec succès !");

  console.log(response);

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

  const user = await setUser({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    password: bcrypt.hashSync(request.body.password, 10),
    email: request.body.email,
    role: "ROLE_USER",
  });

  await setInformationsUser({
    userUUID: user[0].uuid,
    address: request.body.address,
    address1: request.body.address1,
    zipCode: request.body.zipCode,
    city: request.body.city,
  });

  request.flash("success", "Votre compte a été créé avec succès !");

  response.redirect("/");
};

async function setUser(user: UserInterface) {
  return await bdd.knex("users")
    .returning(["uuid"])
    .insert({
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      role: user.role,
    });
}

async function setInformationsUser(informationsUser: any) {
  return await bdd.knex("informations_users")
    .insert({
      user_uuid: informationsUser.userUUID,
      address: informationsUser.address,
      address_1: informationsUser.address1,
      zip_code: informationsUser.zipCode,
      city: informationsUser.city,
    });
}
