import bdd from "../config/bdd";
import { InformationsUserInterface, UserInterface } from "../interfaces/UserInterface";

export default class User {
  static async setUser(user: UserInterface): Promise<Object> {
    const res: [Promise<Object>] = await bdd.knex("users")
      .returning(["uuid"])
      .insert({
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        email: user.email,
        role: user.role,
      });

    return res[0];
  }

  static async getAllUsers(): Promise<Object> {
    return await bdd.knex
      .select()
      .from("users")
      .leftJoin("informations_users", "informations_users.user_uuid", "users.uuid")
      .catch((error) => {
        console.error(`Error: ${error}`);
      })
      ;
  }

  static async setInformationsUser(informationsUser: InformationsUserInterface): Promise<Object> {
    return await bdd.knex("informations_users")
      .insert({
        user_uuid: informationsUser.user.uuid,
        address: informationsUser.address,
        address_1: informationsUser.address1,
        zip_code: informationsUser.zip_code,
        city: informationsUser.city,
      });
  }
}
