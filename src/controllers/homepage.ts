import { Request, Response } from "express";

export let index = async (request: Request, response: Response) => {
  response.render("homepage");
};
