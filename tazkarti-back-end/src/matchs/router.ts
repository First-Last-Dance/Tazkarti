import express from 'express';
import * as match from './controller';
import { CodedError } from '../shared/error';
import { requireAuth, requireManager } from '../shared/authentication';

const matchRoutes = express.Router();
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
 *           MatchSchemes:
 *             type: object
 *             properties:
 *               homeTeam:
 *                 type: string
 *                 required: true
 *               awayTeam:
 *                 type: string
 *                 required: true
 *               matchVenue:
 *                 type: string
 *                 required: true
 *               date:
 *                 type: string
 *                 required: true
 *               time:
 *                 type: string
 *                 required: true
 *               mainReferee:
 *                 type: string
 *                 required: true
 *               firstLinesman:
 *                 type: string
 *                 required: true
 *               secondLinesman:
 *                 type: string
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
 * /match/:
 *   post:
 *     summary: Add a new match
 *     tags: [Match]
 *     security:
 *           - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/MatchSchemes'
 *           example:
 *               homeTeam: Team1
 *               awayTeam: Team2
 *               matchVenue: Cairo stadium
 *               date: 2024-01-01
 *               time: 4.5
 *               mainReferee: mohy
 *               firstLinesman: bola
 *               secondLinesman: luka
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
matchRoutes.post('/', requireAuth, requireManager, async (req, res) => {
  if (!req.body.homeTeam) {
    res.status(400).send('home team is required');
  }
  if (!req.body.awayTeam) {
    res.status(400).send('away team required');
  }
  if (!req.body.matchVenue) {
    res.status(400).send('match venue is required');
  }
  if (!req.body.date) {
    res.status(400).send('date is required');
  }
  if (!req.body.time) {
    res.status(400).send('time is required');
  }
  if (!req.body.mainReferee) {
    res.status(400).send('main referee is required');
  }
  if (!req.body.firstLinesman) {
    res.status(400).send('first linesman is required');
  }
  if (!req.body.secondLinesman) {
    res.status(400).send('second linesman is required');
  } else {
    await match
      .Add(
        req.body.homeTeam,
        req.body.awayTeam,
        req.body.matchVenue,
        req.body.date,
        req.body.time,
        req.body.mainReferee,
        req.body.firstLinesman,
        req.body.secondLinesman,
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
 * /match:
 *  delete:
 *      summary: delete a match
 *      tags: [Match]
 *      security:
 *           - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          matchID:
 *                              type: string
 *                              required: true
 *                  example:
 *                      matchID: Cairo match
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
matchRoutes.delete('/', requireAuth, requireManager, async (req, res) => {
  if (!req.body.matchID) {
    res.status(400).send('matchID to be deleted is required');
  } else {
    await match
      .deleteMatch(req.body.matchID)
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
 * /match:
 *  patch:
 *      summary: update a match
 *      tags: [Match]
 *      security:
 *           - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/MatchEditSchema'
 *                  example:
 *                    matchID: Cairo match
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
matchRoutes.patch('/', requireAuth, requireManager, async (req, res) => {
  if (!req.body.matchID) {
    res.status(400).send('matchID to be updated is required');
  } else {
    await match
      .updateMatch(
        req.body.homeTeam,
        req.body.awayTeam,
        req.body.matchVenue,
        req.body.date,
        req.body.time,
        req.body.mainReferee,
        req.body.firstLinesman,
        req.body.secondLinesman,
        req.body.matchID,
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
 * /match/{matchID}:
 *  get:
 *      summary: return the data of a match
 *      tags: [Match]
 *      security:
 *           - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: matchID
 *        required: true
 *        type: string
 *        minimum: 1
 *        description: the name of the match
 *        default: Cairo match
 *      responses:
 *          200:
 *              description: returns matchs data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/MatchSchemes'
 *                      example:
 *                        matchID: Cairo match
 *                        numberOfRows: 10
 *                        numberOfSeatsPerRow: 8
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */

matchRoutes.get('/:matchID', async (req, res) => {
  if (req.params.matchID == undefined) {
    res.status(400).send('matchID is required');
  }
  await match
    .getMatch(req.params.matchID)
    .then((matchData) => {
      res.status(200).send(matchData);
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
 * /match:
 *  get:
 *      summary: Get data of all matchs
 *      tags: [Match]
 *      security:
 *           - bearerAuth: []
 *
 *      responses:
 *          200:
 *              description: returns matchs data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/MatchSchemes'
 *                      example:
 *                        matchID: Cairo match
 *                        numberOfRows: 10
 *                        numberOfSeatsPerRow: 8
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
matchRoutes.get('/', async (req, res) => {
  await match
    .getAllMatchs()
    .then((matchs) => {
      res.status(200).send(matchs);
    })
    .catch((err) => {
      if (err instanceof CodedError) {
        res.status(err.code).send(err.message);
      } else {
        res.status(500).send(err);
      }
    });
});

export default matchRoutes;
