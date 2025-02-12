const request = require("supertest");
const app = require("./server");

test("GET /top-scores", async () => {
  const response = await request(app).get("/top-scores");
  expect(response.statusCode).toBe(200);
});