const request = require("supertest");
const app = require("../server"); // Importer ton serveur Express

test("Ajouter un entraînement", async () => {
  const response = await request(app).get("/users");

  expect(response.status).toBe(201);
});
