import { Request, Response } from "express";

import { default as User } from "../models/user";

/**
 * GET /
 * Home page.
 *
 * @param req
 * @param res
 */
export let index = async (req: Request, res: Response) => {

  const userCount = await User.estimatedDocumentCount();

  console.log(userCount);
  res.render("homepage", {
    userCount,
  });
};
