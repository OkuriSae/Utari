import * as express from "express";
import * as admin from "firebase-admin";

/* eslint new-cap: 0 */
export const usersRouter = express.Router();

const userCollection = "users";
const db = admin.firestore();

usersRouter.get("/", async (req, res, next) => {
  try {
    const userQuerySnapshot = await db.collection(userCollection).get();
    const users: any[] = [];
    userQuerySnapshot.forEach(
        (doc)=>{
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
