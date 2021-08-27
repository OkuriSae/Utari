import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

import { usersRouter } from './routes/users';

// initialize express server
const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', usersRouter);

// define google cloud function name
export const webApi = functions.https.onRequest(main);
