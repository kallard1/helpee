import { Request, Response } from "express";
import User from "../models/users";

export let index = async (request: Request, response: Response) => {
  response.render("homepage", { users: await User.getAllUsers() });
};
