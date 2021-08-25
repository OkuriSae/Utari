import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

import {usersRouter} from "../routes/users";

// initialize express server
const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

// initialize the database and the collection
const db = admin.firestore();
const userCollection = "users";

interface User {
  firstName: string,
  lastName: string,
  email: string,
  areaNumber: string,
  department: string,
  id:string,
  contactNumber:string
}

app.use("/users", usersRouter);

// Create new user
app.post("/users", async (req, res) => {
  try {
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      areaNumber: req.body["areaNumber"],
      department: req.body["department"],
      id: req.body["id"],
      contactNumber: req.body["contactNumber"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send("error: create user");
  }
});

// get a single contact
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection).doc(userId).get()
      .then((user) => {
        if (!user.exists) throw new Error("User not found");
        res.status(200).json({id: user.id, data: user.data()});
      })
      .catch((error) => res.status(500).send(error));
});

// Delete a user
app.delete("/users/:userId", (req, res) => {
  db.collection(userCollection).doc(req.params.userId).delete()
      .then(()=>res.status(204).send("Document successfully deleted!"))
      .catch(function(error) {
        res.status(500).send(error);
      });
});

// Update user
app.put("/users/:userId", async (req, res) => {
  await db.collection(userCollection)
      .doc(req.params.userId).set(req.body, {merge: true})
      .then(()=> res.json({id: req.params.userId}))
      .catch((error)=> res.status(500).send(error));
});

// define google cloud function name
export const webApi = functions.https.onRequest(main);
