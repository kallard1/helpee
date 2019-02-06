import { Request, Response } from "express";
import bdd from "../config/bdd";

export let index = async (request: Request, response: Response) => {
  response.render("homepage", { users: await getUsers() });
};

async function getUsers() {
  return await bdd.knex.select()
    .from("users");
}
