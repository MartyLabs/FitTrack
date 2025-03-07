const request = require("supertest");
const app = require("../server"); // Importer le serveur Express

describe("Test API Users", () => {
  let server;

  // Avant de lancer les tests, démarrer le serveur Express sur un autre port
  beforeAll((done) => {
    server = app.listen(4000, () => {
      done();
    });
  });

  // Après tous les tests, fermer le serveur proprement
  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  test("Récupérer la liste des utilisateurs", async () => {
    const response = await request(app).get("/users");

    // Vérifier que la requête retourne un statut 200
    expect(response.status).toBe(200);

    // Vérifier que la réponse est bien un tableau JSON
    expect(Array.isArray(response.body)).toBe(true);
  });
});
