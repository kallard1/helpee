import request from "supertest";

import app from "../app";
import bdd from "../config/bdd";

describe("GET /", () => {

  beforeAll((done) => {
    bdd.knex.migrate.rollback()
      .then(() => {
        bdd.knex.migrate.latest()
          .then(() => {
            done();
          });
      });
  });

  it("should return 200", async () => {
    const response = await request(app)
      .get("/")
      .send();

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toEqual("text/html; charset=utf-8");
  });
});
