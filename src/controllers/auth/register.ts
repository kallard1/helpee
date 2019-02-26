import { Request, Response } from "express";

/**
 * Register page.
 *
 * @param request
 * @param response
 */
export let index = async (request: Request, response: Response) => {
  console.log(request.session);
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
  request.flash("error", "message");

  response.redirect("/auth/register");
};
