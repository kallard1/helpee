import request from "supertest";

import app from "../../app";

describe("GET /auth/register", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/auth/register")
      .send();

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toEqual("text/html; charset=utf-8");
  });
});
