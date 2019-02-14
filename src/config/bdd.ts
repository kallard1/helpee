import { Pool } from "pg";
import path from "path";
import knex from "knex";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const host: string = (process.env.DATABASE_HOST !== undefined ? process.env.DATABASE_HOST : "127.0.0.1");
const port: string = (process.env.DATABASE_PORT !== undefined ? process.env.DATABASE_PORT : "5432");
const username: string = (process.env.DATABASE_USER !== undefined ? process.env.DATABASE_USER : "");
const password: string = (process.env.DATABASE_PASSWORD !== undefined ? process.env.DATABASE_PASSWORD : "");
const name: string = (process.env.DATABASE_NAME !== undefined ? process.env.DATABASE_NAME : "");
console.log(host);

class Bdd {
  public pool: Pool;
  public knex: knex;

  constructor() {
    this.pool = new Pool();
    this.knex = knex({
      client: "pg",
      connection: {
        host: host,
        port: port,
        user: username,
        password: password,
        database: name,
      },
      pool: {
        min: 2,
        max: 10,
      },
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
