import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("GET /", () => {
  it("should return 200", async () => {
    const response = await request.get("/");

    expect(response.status).toEqual(200);
  });
});
