import { Request, Response } from "express";

export let index = async (request: Request, response: Response) => {
  response.render("auth/register", {
    csrfToken: request.csrfToken(),
  });
};

export let registration = async (request: Request, response: Response) => {
  return;
};
