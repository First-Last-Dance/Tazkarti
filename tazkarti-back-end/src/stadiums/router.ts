import express from 'express';
import * as stadium from './controller';
import { CodedError } from '../shared/error';

const stadiumRoutes = express.Router();
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
 *           StadiumSchemes:
 *             type: object
 *             properties:
 *               stadiumName:
 *                 type: string
 *                 required: true
 *               numberOfRows:
 *                 type: int
 *                 required: true
 *               numberOfSeatsPerRow:
 *                 type: int
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
 *   components:
 *           AvailabilityResponse:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    availability:
 *                      type: boolean
 *                      required: true
 *                example:
 *                  availability: true
 */
/**

/**
 * @swagger
 * /stadium/:
 *   post:
 *     summary: Add a new stadium
 *     tags: [Stadium]
 *     security:
 *           - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/StadiumSchemes'
 *           example:
 *              stadiumName: Cairo stadium
 *              numberOfRows: 10
 *              numberOfSeatsPerRow: 8
 *
 *     responses:
 *          200:
 *              $ref: '#/components/responses/Ok'
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
stadiumRoutes.post('/', async (req, res) => {
  if (!req.body.stadiumName) {
    res.status(400).send('stadiumName is required');
  }
  if (!req.body.numberOfRows) {
    res.status(400).send('number of rows is required');
  }
  if (!req.body.numberOfSeatsPerRow) {
    res.status(400).send('number of seats per row is required');
  } else {
    await stadium
      .Add(
        req.body.stadiumName,
        req.body.numberOfRows,
        req.body.numberOfSeatsPerRow,
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
  }
});

/**
 * @swagger
 * /stadium:
 *  delete:
 *      summary: delete a stadium
 *      tags: [Stadium]
 *      security:
 *           - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          stadiumName:
 *                              type: string
 *                              required: true
 *                  example:
 *                      stadiumName: Cairo stadium
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
stadiumRoutes.delete('/', async (req, res) => {
  if (!req.body.stadiumName) {
    res.status(400).send('stadiumName to be deleted is required');
  } else {
    await stadium
      .deleteStadium(req.body.stadiumName)
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
  }
});

/**
 * @swagger
 * /stadium:
 *  patch:
 *      summary: update a stadium
 *      tags: [Stadium]
 *      security:
 *           - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/StadiumEditSchema'
 *                  example:
 *                    stadiumName: Cairo stadium
 *                    numberOfRows: 10
 *                    numberOfSeatsPerRow: 8
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
stadiumRoutes.patch('/', async (req, res) => {
  if (!req.body.stadiumName) {
    res.status(400).send('stadiumName to be updated is required');
  } else {
    await stadium
      .updateStadium(
        res.locals.stadiumName,
        req.body.numberOfRows,
        req.body.numberOfSeatsPerRow,
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
  }
});

/**
 * @swagger
 * /stadium/available?stadiumName:
 *  get:
 *      summary: return true if stadiumName is available
 *      tags: [Stadium]
 *      security:
 *           - bearerAuth: []
 *      parameters:
 *      - in: query
 *        name: stadiumName
 *        required: true
 *        type: string
 *        minimum: 1
 *        default: Cairo stadium
 *      responses:
 *          200:
 *              $ref: '#/components/AvailabilityResponse'
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */

stadiumRoutes.get('/available', async (req, res) => {
  if (!req.query.stadiumName) {
    res.status(400).send('stadiumName is required');
  } else {
    await stadium
      .isAvailable(req.query.stadiumName as string)
      .then((availability) => {
        res.status(200).send({ available: availability });
      })
      .catch((err) => {
        if (err instanceof CodedError) {
          res.status(err.code).send(err.message);
        } else {
          res.status(500).send(err);
        }
      });
  }
});

/**
 * @swagger
 * /stadium/{stadiumName}:
 *  get:
 *      summary: return the data of a stadium
 *      tags: [Stadium]
 *      security:
 *           - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: stadiumName
 *        required: true
 *        type: string
 *        minimum: 1
 *        description: the name of the stadium
 *        default: Cairo stadium
 *      responses:
 *          200:
 *              description: returns stadiums data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/StadiumSchemes'
 *                      example:
 *                        stadiumName: Cairo stadium
 *                        numberOfRows: 10
 *                        numberOfSeatsPerRow: 8
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */

stadiumRoutes.get('/:stadiumName', async (req, res) => {
  if (req.params.stadiumName == undefined) {
    res.status(400).send('stadiumName is required');
  }
  await stadium
    .getStadium(req.params.stadiumName)
    .then((stadiumData) => {
      res.status(200).send(stadiumData);
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
 * /stadium:
 *  get:
 *      summary: Get data of all stadiums
 *      tags: [Stadium]
 *      security:
 *           - bearerAuth: []
 *
 *      responses:
 *          200:
 *              description: returns stadiums data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/StadiumSchemes'
 *                      example:
 *                        stadiumName: Cairo stadium
 *                        numberOfRows: 10
 *                        numberOfSeatsPerRow: 8
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
stadiumRoutes.get('/', async (req, res) => {
  await stadium
    .getAllStadiums()
    .then((stadiums) => {
      res.status(200).send(stadiums);
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

export default stadiumRoutes;
