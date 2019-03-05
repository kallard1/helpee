import knex from "knex";
import path from "path";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

class Bdd {
  public knex: knex;

  constructor() {
    this.knex = knex({
      client: "pg",
      connection: {
        host: process.env.DATABASE_HOST || "127.0.0.1",
        port: process.env.DATABASE_PORT || "5432",
        user: process.env.DATABASE_USER || "",
        password: process.env.DATABASE_PASSWORD || "",
        database: process.env.DATABASE_NAME || "",
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
        directory: path.join(__dirname, "../migrations"),
      },
      seeds: {
        directory: path.join(__dirname, `../seeds/${process.env.NODE_ENV === "production" ?
          "production" : "development"}`),
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
