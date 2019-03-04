import request from "supertest";

import app from "../app";

describe("GET /", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/")
      .send();

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toEqual("text/html; charset=utf-8");
  });
});
