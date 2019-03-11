import { Request, Response } from "express";

export let index = (req: Request, res: Response): void => {
  return res.render("ad/new", {});
};
