import { Pool } from "pg";
import path from "path";
import knex from "knex";
import config from "../config";

const env: string = (process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : "production");

class Bdd {
  public pool: Pool;
  public knex: knex;

  constructor() {
    this.pool = new Pool();
    this.knex = knex({
      client: "pg",
      connection: config[env].bdd,
      migrations: {
        tableName: "knex_migrations",
        directory: path.join(__dirname, "../migrations"),
      },
    });
  }

  async init() {
    await this.knex.migrate.latest();
    console.log("Migration: Done");
  }
}

const bdd = new Bdd();

export default bdd;
