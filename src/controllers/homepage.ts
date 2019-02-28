import { Request, Response } from "express";
import User from "../models/users";

export let index = async (request: Request, response: Response) => {

  console.log(await User.getAllUsers());

  response.render("homepage", { users: await User.getAllUsers() });
};
