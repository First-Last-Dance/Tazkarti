import express from 'express';
import * as User from './controller';
import { requireAdmin, requireAuth } from '../shared/authentication';

const userRoutes = express.Router();
/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */
/**
 * @swagger
 *   components:
 *           userSignUpSchema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 required: true
 *                 describtion: the userName of the user (Must be unique)
 *               password:
 *                 type: string
 *                 required: true
 *               firstName:
 *                 type: string
 *                 required: true
 *               lastName:
 *                 type: string
 *                 required: true
 *               birthDate:
 *                 type: string
 *                 required: true
 *                 describtion: Must be of a valid format like "YYYY-MM-DD"
 *               gender:
 *                 type: string
 *                 required: true
 *                 describtion: must be male or female
 *               city:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               role:
 *                 type: string
 *                 required: true
 *                 describtion: must be fan or manager
 *               address:
 *                 type: string
 *                 required: false
 */

/**
 * @swagger
 *   components:
 *           userSchema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 required: true
 *                 describtion: the userName of the user (Must be unique)
 *               firstName:
 *                 type: string
 *                 required: true
 *               lastName:
 *                 type: string
 *                 required: true
 *               birthDate:
 *                 type: string
 *                 required: true
 *                 describtion: Must be of a valid format like "YYYY-MM-DD"
 *               gender:
 *                 type: string
 *                 required: true
 *                 describtion: must be male or female
 *               city:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               role:
 *                 type: string
 *                 required: true
 *                 describtion: must be fan or manager
 *               address:
 *                 type: string
 *                 required: false
 *               admin:
 *                 type: boolean
 *                 required: true
 *               authorized:
 *                 type: boolean
 *                 required: true
 */

/**
 * @swagger
 *components:
 *  responses:
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 *    ServerError:
 *      description: serrver error
 *    BadRequest:
 *      description: Bad request
 *    Ok:
 *      description: Ok
 */

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Get data of signed in user
 *      tags: [User]
 *      security:
 *           - bearerAuth: []
 *
 *      responses:
 *          200:
 *              description: returns user data (doesn't return password)
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/userSchema'
 *                      example:
 *                          userName: Amr49
 *                          firstName: Amr
 *                          lastName: Ahmed
 *                          birthDate: 2001-03-11
 *                          gender: male
 *                          city: cairo
 *                          email: amroahmed49@gmail.com
 *                          role: manager
 *                          address: cairo, second floor :)
 *                          admin: false
 *                          authorized: true
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRoutes.get('/', requireAuth, async (req, res) => {
  await User.getUser(res.locals.userName)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ auth: false, message: err });
    });
});

/**
 * @swagger
 * /user/signUp:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/userSignUpSchema'
 *           example:
 *              userName: Amr49
 *              password: a123456789
 *              firstName: Amr
 *              lastName: Ahmed
 *              birthDate: 2001-03-11
 *              gender: male
 *              city: cairo
 *              email: amroahmed49@gmail.com
 *              role: fan
 *              address: cairo, second floor :)
 *
 *     responses:
 *          200:
 *              description: returns jwt token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              auth:
 *                                  type: boolean
 *                                  describtion: indicator of success
 *                              token:
 *                                  type: string
 *                                  describtion: the jwt token
 *                      example:
 *                          auth: true
 *                          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFtcjQ5IiwiaWF0IjoxNzAyMTExODUzfQ.yf_8a-KZ6dSpkJL6Pp3A7GyHR3taPrzTFD5rNlrGfOs
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRoutes.post('/signUp', async (req, res) => {
  if (!req.body.userName) {
    return res.status(400).send('userName is required');
  }
  if (!req.body.password) {
    return res.status(400).send('Password is required');
  }
  if (!req.body.firstName) {
    return res.status(400).send('firstName is required');
  }
  if (!req.body.lastName) {
    return res.status(400).send('lastName is required');
  }
  if (!req.body.birthDate) {
    return res.status(400).send('birthDate is required');
  }
  if (!req.body.gender) {
    return res.status(400).send('gender is required');
  }
  if (!req.body.city) {
    return res.status(400).send('city is required');
  }
  if (!req.body.email) {
    return res.status(400).send('email is required');
  }
  if (!req.body.role) {
    return res.status(400).send('role is required');
  }
  await User.signUp(
    req.body.userName,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.birthDate,
    req.body.gender,
    req.body.city,
    req.body.email,
    req.body.role,
    req.body.address,
  )
    .then((jwt) => {
      res.status(200).send({ auth: true, token: jwt });
    })
    .catch((err) => {
      if (err == 'user already exists') {
        res.status(400).send({ auth: false, message: 'User already exists' });
      } else if (err == 'invalid email') {
        res.status(400).send({ auth: false, message: 'invalid email' });
      } else if (err == 'invalid birthDate') {
        res.status(400).send({ auth: false, message: 'invalid birthDate' });
      } else if (err == 'invalid gender') {
        res.status(400).send({ auth: false, message: 'invalid gender' });
      } else if (err == 'invalid role') {
        res.status(400).send({ auth: false, message: 'invalid role' });
      } else {
        res.status(500).send({ auth: false, message: err });
      }
    });
});

/**
 * @swagger
 * /user/signIn:
 *  post:
 *      summary: Sign in an existing user
 *      tags: [User]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userName:
 *                              type: string
 *                              required: true
 *                          password:
 *                              type: string
 *                              required: true
 *                  example:
 *                      userName: Amr49
 *                      password: a123456789
 *      responses:
 *          200:
 *              description: returns jwt token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              auth:
 *                                  type: boolean
 *                                  describtion: indicator of success
 *                              token:
 *                                  type: string
 *                                  describtion: the jwt token
 *                      example:
 *                          auth: true
 *                          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFtcjQ5IiwiaWF0IjoxNzAyMTExODUzfQ.yf_8a-KZ6dSpkJL6Pp3A7GyHR3taPrzTFD5rNlrGfOs
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRoutes.post('/signIn', async (req, res) => {
  if (!req.body.userName) {
    return res
      .status(400)
      .send({ auth: false, message: 'userName is required' });
  }
  if (!req.body.password) {
    return res
      .status(400)
      .send({ auth: false, message: 'Password is required' });
  }
  await User.signIn(req.body.userName, req.body.password)
    .then((jwt) => {
      res.status(200).send({ auth: true, token: jwt });
    })
    .catch((err) => {
      if (err == 'user not found') {
        res.status(401).send({ auth: false, message: 'user not found' });
      } else if (err == 'invalid password') {
        res.status(401).send({ auth: false, message: 'invalid password' });
      } else {
        res.status(500).send({ auth: false, message: err });
      }
    });
});

/**
 * @swagger
 * /user/authorize:
 *  post:
 *      summary: authorize a user
 *      tags: [User]
 *      security:
 *           - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userName:
 *                              type: string
 *                              required: true
 *                  example:
 *                      userName: Amr49
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Ok'
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRoutes.post('/authorize', requireAuth, requireAdmin, async (req, res) => {
  if (!req.body.userName) {
    return res.status(400).send('userName to be authorized is required');
  }
  await User.authorize(req.body.userName)
    .then(() => {
      res.status(200).send('ok');
    })
    .catch((err) => {
      if (err == 'user not found') {
        res.status(400).send({ auth: false, message: 'user not found' });
      } else if (err == 'invalid password') {
        res.status(400).send({ auth: false, message: 'user must be manager' });
      } else {
        res.status(500).send({ auth: false, message: err });
      }
    });
});

export default userRoutes;
