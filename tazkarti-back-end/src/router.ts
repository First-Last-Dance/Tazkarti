import express from 'express';
import * as test from './users/service';
import userRoutes from './users/router';
import stadiumRoutes from './stadiums/router';
import { requireAuth, requireManager } from './shared/authentication';

const routes = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
routes.get('/', (req, res) => {
  test.checkAvailableUserName('Amr');
  res.send('Hello World! from route');
});
routes.use('/user', userRoutes);
routes.use('/stadium', requireAuth, requireManager, stadiumRoutes);

export default routes;
