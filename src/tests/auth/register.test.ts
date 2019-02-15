import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("GET /auth/register", () => {
  it("should return 200", async () => {
    const response = await request.get("/auth/register");

    expect(response.status).toEqual(200);
  });
});
