import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 *
 * @param req
 * @param res
 */
export let index = async (req: Request, res: Response) => {
  res.render("homepage");
};
