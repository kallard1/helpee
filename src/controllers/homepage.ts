import { Request, Response } from "express";
import Bdd from "../config/bdd";

export let index = async (request: Request, response: Response) => {
    response.render("homepage", {users: await getUsers()});
};

async function getUsers() {
    return await Bdd.knex.select()
        .from("users");
}
