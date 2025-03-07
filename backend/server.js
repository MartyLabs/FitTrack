require("dotenv").config(); //Loads environment variables from a .env file (useful for storing API keys).
const express = require("express"); //The framework used to create a web server.
const cors = require("cors"); //Middleware that enables Cross-Origin Resource Sharing (CORS), allowing frontend apps (like React Native) to communicate with the backend.
const admin = require("firebase-admin"); //SDK that allows backend applications to interact with Firebase services like Firestore and Authentication.

//serviceAccountKey.json → This file contains the credentials (private key) to authenticate Firebase Admin SDK.
//admin.initializeApp({...}) → Initializes Firebase for server-side usage.
//admin.credential.cert(serviceAccount) → Uses the private key to authenticate the app.
//databaseURL → The Firebase database URL (used only if you're using Realtime Database, not Firestore).
//const db = admin.firestore(); → Connects the Firebase Admin SDK to Firestore (our NoSQL database).

const { FieldValue } = require("firebase-admin/firestore");

// Construire dynamiquement l'objet credentials Firebase
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

if (!privateKey) {
  console.error("❌ Erreur : FIREBASE_PRIVATE_KEY n'est pas défini !");
  process.exit(1);
}

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fittrack-d7d66.firebaseio.com",
});

const db = admin.firestore();

//express() → Creates an instance of an Express app.
//app.use(express.json()) → Allows Express to parse JSON requests (useful for APIs receiving JSON data).
//app.use(cors()) → Enables CORS, allowing external frontend applications to communicate with this API.

const app = express();
app.use(express.json());
app.use(cors());

//app.get("/") → Defines an API route (/ is the root).
//req (Request) → Contains the incoming request data.
//res (Response) → The response object used to send back data.
//res.send(...) → Sends a simple text response to test if the backend is working.

app.get("/", (req, res) => {
  res.send("🚀 Backend Node.js + Express pour Firebase est en ligne !");
});

app.get("/users", async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    let users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error while getting users from firestore" });
  }
});

app.post("/:userId/workouts", async (req, res) => {
  try {
    const { userId } = req.params;
    const { title } = req.body;

    const workoutRef = db
      .collection("users")
      .doc(userId)
      .collection("workouts");

    const workout = {
      date: FieldValue.serverTimestamp(),
      title,
      exercices: [],
    };

    const docRef = await workoutRef.add(workout);
    res.status(201).json({
      id: docRef.id,
      message: "Workout has been created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/:userId/workouts/:workoutId/exercices", async (req, res) => {
  try {
    const { userId, workoutId } = req.params;
    const { name, repetitions, duration, rest, notes, imgs, date } = req.body;

    const workoutRef = db
      .collection("users")
      .doc(userId)
      .collection("workouts")
      .doc(workoutId);

    //Add new exercise to exercises Array
    await workoutRef.update({
      exercices: FieldValue.arrayUnion({
        name,
        repetitions,
        duration: duration || 0,
        rest,
        notes,
        imgs,
        date: new Date(date),
      }),
    });

    res.status(200).json({ message: "Exercice has been added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete workout
app.delete("/:userId/workouts/:workoutId", async (req, res) => {
  try {
    const { userId, workoutId } = req.params;
    const workoutRef = db
      .collection("users")
      .doc(userId)
      .collection("workouts")
      .doc(workoutId);

    await workoutRef.delete();

    res.status(200).json({ message: "Workout deleted !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//process.env.PORT || 5000 → Uses the port specified in an environment variable (.env), or defaults to 5000.
//app.listen(PORT, () => { ... }) → Starts the Express server on the specified port.
//Logs a message in the console when the server is running successfully.

const PORT = process.env.PORT || 5000;

// Vérifier si le script est exécuté directement (production) ou testé
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Serveur en écoute sur le port ${PORT}`);
  });
}

// Exporter `app` pour les tests
module.exports = app;
