const request = require("supertest");
const app = require("../server");

describe("Books API", () => {

  test("GET / should return API message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Book API running...");
  });

  test("GET /books should return books list or unauthorized", async () => {
    const res = await request(app).get("/books");
    expect([200, 401]).toContain(res.statusCode);
  });

});