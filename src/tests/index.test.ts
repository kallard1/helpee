import request from "supertest";

import app from "../app";
import bdd from "../config/bdd";

describe("GET /", () => {

  beforeAll(async (done) => {
    await bdd.knex.raw("SELECT truncate_tables('helpee')")
      .then(async () => {
        await bdd.knex.migrate.rollback()
          .then(async () => {
            await bdd.knex.migrate.latest()
              .then(async () => {
                return await bdd.knex.seed.run()
                  .then(() => {
                    done();
                  });
              });
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
