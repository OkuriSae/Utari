import * as express from 'express';

/* eslint new-cap: 0 */
export const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
  try {
    res.status(200).send('hello!');
  } catch (error) {
    res.status(500).send(error);
  }
});
