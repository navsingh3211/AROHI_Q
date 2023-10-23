/* eslint-disable no-unused-vars */
import express from 'express';
const router = express.Router();
import authRoute from './auth.route.js';


/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json(
      'Welcome to Arohi Quize,Now You can register for the quize and fill up the form.'
    );
  });
  router.use('/', authRoute);
  return router;
};

export default routes;
