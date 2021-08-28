import { QuerySnapshot } from '@google-cloud/firestore';
import * as express from 'express';
import * as admin from 'firebase-admin';

/* eslint new-cap: 0 */
export const usersRouter = express.Router();

const userCollection = 'users';
const db = admin.firestore();

interface User {
  firstName: string;
  lastName: string;
  email: string;
  areaNumber: string;
  department: string;
  id: string;
  contactNumber: string;
}

usersRouter.get('/', async (req, res) => {
  try {
    const userQuerySnapshot = (await db.collection(userCollection).get()) as QuerySnapshot<User>;
    const users: { id: User['id']; data: User }[] = [];
    userQuerySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create new user
usersRouter.post('/', async (req, res) => {
  try {
    const user: User = {
      firstName: req.body['firstName'],
      lastName: req.body['lastName'],
      email: req.body['email'],
      areaNumber: req.body['areaNumber'],
      department: req.body['department'],
      id: req.body['id'],
      contactNumber: req.body['contactNumber'],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send('error: create user');
  }
});

// get a single contact
usersRouter.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection)
    .doc(userId)
    .get()
    .then((user) => {
      if (!user.exists) throw new Error('User not found');
      res.status(200).json({ id: user.id, data: user.data() });
    })
    .catch((error) => res.status(500).send(error));
});

// Delete a user
usersRouter.delete('/:userId', (req, res) => {
  db.collection(userCollection)
    .doc(req.params.userId)
    .delete()
    .then(() => res.status(204).send('Document successfully deleted!'))
    .catch((error) => res.status(500).send(error));
});

// Update user
usersRouter.put('/:userId', async (req, res) => {
  await db
    .collection(userCollection)
    .doc(req.params.userId)
    .set(req.body, { merge: true })
    .then(() => res.json({ id: req.params.userId }))
    .catch((error) => res.status(500).send(error));
});
