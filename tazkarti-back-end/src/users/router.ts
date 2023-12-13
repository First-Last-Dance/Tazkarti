import express from 'express';
import * as User from './controller';
import { requireAdmin, requireAuth } from '../shared/authentication';
import { CodedError } from '../shared/error';

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
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */
/**
 * @swagger
 *   components:
 *           userEditSchema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: false
 *               firstName:
 *                 type: string
 *                 required: false
 *               lastName:
 *                 type: string
 *                 required: false
 *               birthDate:
 *                 type: string
 *                 required: false
 *                 describtion: Must be of a valid format like "YYYY-MM-DD"
 *               gender:
 *                 type: string
 *                 required: false
 *                 describtion: must be male or female
 *               city:
 *                 type: string
 *                 required: false
 *               address:
 *                 type: string
 *                 required: false
 */

/**
 * @swagger
 *   components:
 *           UnauthorizedUsersSchema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 required: true
 *                 describtion: the userName of the user
 *               role:
 *                 type: string
 *                 required: true
 *                 describtion: must be fan or manager
 */

/**
 * @swagger
 *   components:
 *           AuthorizedUsersSchema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 required: true
 *                 describtion: the userName of the user
 *               role:
 *                 type: string
 *                 required: true
 *                 describtion: must be fan or manager
 */

/**
 * @swagger
 *   components:
 *           userChangePasswordSchema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *               newPassword:
 *                 type: string
 *                 required: true
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
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
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
    res.status(400).send('userName is required');
  }
  if (!req.body.password) {
    res.status(400).send('Password is required');
  }
  if (!req.body.firstName) {
    res.status(400).send('firstName is required');
  }
  if (!req.body.lastName) {
    res.status(400).send('lastName is required');
  }
  if (!req.body.birthDate) {
    res.status(400).send('birthDate is required');
  }
  if (!req.body.gender) {
    res.status(400).send('gender is required');
  }
  if (!req.body.city) {
    res.status(400).send('city is required');
  }
  if (!req.body.email) {
    res.status(400).send('email is required');
  }
  if (!req.body.role) {
    res.status(400).send('role is required');
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
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
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
    res.status(400).send('userName is required');
  }
  if (!req.body.password) {
    res.status(400).send('Password is required');
  }
  await User.signIn(req.body.userName, req.body.password)
    .then((jwt) => {
      res.status(200).send({ auth: true, token: jwt });
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

/**
 * @swagger
 * /user/authorize:
 *  patch:
 *      summary: authorize a user (only admin)
 *      tags: [Admin]
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
userRoutes.patch('/authorize', requireAuth, requireAdmin, async (req, res) => {
  if (!req.body.userName) {
    res.status(400).send('userName to be authorized is required');
  }
  await User.authorize(req.body.userName)
    .then(() => {
      res.status(200).send('ok');
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

/**
 * @swagger
 * /user:
 *  delete:
 *      summary: delete a user (only admin)
 *      tags: [Admin]
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
userRoutes.delete('/', requireAuth, requireAdmin, async (req, res) => {
  if (!req.body.userName) {
    res.status(400).send('userName to be deleted is required');
  }
  await User.deleteUser(req.body.userName)
    .then(() => {
      res.status(200).send('ok');
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

/**
 * @swagger
 * /user:
 *  patch:
 *      summary: update a user
 *      tags: [User]
 *      security:
 *           - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/userEditSchema'
 *                  example:
 *                    firstName: Amr
 *                    lastName: Ahmed
 *                    birthDate: 2001-03-11
 *                    gender: male
 *                    city: cairo
 *                    address: cairo, second floor :)
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
userRoutes.patch('/', requireAuth, async (req, res) => {
  await User.updateUser(
    res.locals.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.birthDate,
    req.body.gender,
    req.body.city,
    req.body.address,
  )
    .then(() => {
      res.status(200).send('ok');
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

/**
 * @swagger
 * /user/changePassword:
 *  patch:
 *      summary: change a user's password
 *      tags: [User]
 *      security:
 *           - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/userChangePasswordSchema'
 *                  example:
 *                    password: a123456789
 *                    newPassword: b123456789
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

userRoutes.patch('/changePassword', requireAuth, async (req, res) => {
  if (!req.body.password) {
    res.status(400).send('Password is required');
  }
  if (!req.body.newPassword) {
    res.status(400).send('New password is required');
  }
  await User.updatePassword(
    res.locals.userName,
    req.body.password,
    req.body.newPassword,
  )
    .then(() => {
      res.status(200).send('ok');
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

/**
 * @swagger
 * /user/unauthorized:
 *  get:
 *      summary: return a list of unauthorized users (only admin)
 *      tags: [Admin]
 *      security:
 *           - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/UnauthorizedUsersSchema'
 *              example:
 *                userName: Amr49
 *                role: fan
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */

userRoutes.get('/unauthorized', requireAuth, requireAdmin, async (req, res) => {
  await User.getAllUnauthorized()
    .then((usersData) => {
      res.status(200).send(usersData);
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

/**
 * @swagger
 * /user/authorized:
 *  get:
 *      summary: return a list of authorized users (only admin)
 *      tags: [Admin]
 *      security:
 *           - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/AuthorizedUsersSchema'
 *              example:
 *                userName: Amr49
 *                role: fan
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */

userRoutes.get('/authorized', requireAuth, requireAdmin, async (req, res) => {
  await User.getAllauthorized()
    .then((usersData) => {
      res.status(200).send(usersData);
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

/**
 * @swagger
 * /user/switchRole:
 *  patch:
 *      summary: switch the role of an authorized user (only admin)
 *      tags: [Admin]
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
userRoutes.patch('/switchRole', requireAuth, requireAdmin, async (req, res) => {
  if (!req.body.userName) {
    res.status(400).send('userName to switch his role');
  }
  await User.switchRole(req.body.userName)
    .then(() => {
      res.status(200).send('ok');
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

export default userRoutes;
