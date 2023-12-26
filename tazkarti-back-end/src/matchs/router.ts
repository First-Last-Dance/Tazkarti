import express, { json } from 'express';
import * as match from './controller';
import { CodedError } from '../shared/error';
import { requireAuth, requireManager } from '../shared/authentication';
import expressWs from 'express-ws';
import { wss } from '../app';

export interface clientDate {
  client: any;
  userName: string;
  matchID: string;
}
export const mountMatchRouter = () => {
  const matchRoutes = express.Router() as expressWs.Router;
  let clients: Array<clientDate> = [];
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
   *   components:
   *           MatchEditScheme:
   *             type: object
   *             properties:
   *               matchID:
   *                 type: string
   *                 required: true
   *               homeTeam:
   *                 type: string
   *                 required: false
   *               awayTeam:
   *                 type: string
   *                 required: false
   *               matchVenue:
   *                 type: string
   *                 required: false
   *               date:
   *                 type: string
   *                 required: false
   *               time:
   *                 type: string
   *                 required: false
   *               mainReferee:
   *                 type: string
   *                 required: false
   *               firstLinesman:
   *                 type: string
   *                 required: false
   *               secondLinesman:
   *                 type: string
   *                 required: false
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
   *                      matchID: 6589f3eb83637d97c83cee28
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
   *                     $ref: '#/components/MatchEditScheme'
   *                  example:
   *                      matchID: 6589f3eb83637d97c83cee28
   *                      homeTeam: Team1
   *                      awayTeam: Team2
   *                      matchVenue: Cairo stadium
   *                      date: 2024-01-01
   *                      time: 4.5
   *                      mainReferee: mohy
   *                      firstLinesman: bola
   *                      secondLinesman: luka
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
   *      parameters:
   *      - in: path
   *        name: matchID
   *        required: true
   *        type: string
   *        minimum: 1
   *        description: the name of the match
   *        default: 6589f3eb83637d97c83cee28
   *      responses:
   *          200:
   *              description: returns matchs data
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/MatchSchemes'
   *                      example:
   *                          matchID: 6589f3eb83637d97c83cee28
   *                          homeTeam: Team1
   *                          awayTeam: Team2
   *                          matchVenue: Cairo stadium
   *                          date: 2024-01-01
   *                          time: 4.5
   *                          mainReferee: mohy
   *                          firstLinesman: bola
   *                          secondLinesman: luka
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
   *      responses:
   *          200:
   *              description: returns matchs data
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/MatchSchemes'
   *                      example:
   *                          matchID: 6589f3eb83637d97c83cee28
   *                          homeTeam: Team1
   *                          awayTeam: Team2
   *                          matchVenue: Cairo stadium
   *                          date: 2024-01-01
   *                          time: 4.5
   *                          mainReferee: mohy
   *                          firstLinesman: bola
   *                          secondLinesman: luka
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

  matchRoutes.get('/seats/:matchID', async (req, res) => {
    if (!req.params.matchID) {
      res.status(400).send('matchID is required');
    } else {
      await match
        .getSeats(req.params.matchID, res.locals.userName)
        .then((seats) => {
          res.status(200).send(seats);
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

  matchRoutes.post('/seats/:matchID', async (req, res) => {
    if (!req.params.matchID) {
      res.status(400).send('matchID is required');
    } else {
      let seats = [];
      if (!req.body.reserveSeats) {
      } else {
        seats = req.body.reserveSeats;
      }
      await match
        .reserve(req.params.matchID, res.locals.userName, seats)
        .then(() => {
          res.status(200).send('Ok');
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

  matchRoutes.ws('/echo', function (ws, req) {
    console.log('hi');
    ws.on('message', function (msg) {
      console.log(msg);
      ws.send(msg);
    });
  });

  matchRoutes.ws('/seats', async function (ws, req) {
    ws.on('message', async function (msg) {
      const matchID = JSON.parse(JSON.stringify(msg)).matchID;
      const userName = JSON.parse(JSON.stringify(msg)).userName;
      clients.push({ client: ws, matchID: matchID, userName: userName });
      const seats = await match.getSeats(matchID, 'Admin');
      ws.send(JSON.stringify({ seats: seats }));
      //   wss.clients.forEach(function (client) {
      //     client.send(seats);
      //   });
    });
    ws.on('close', function () {
      clients = clients.filter((client) => {
        client.client == ws;
      });
    });
  });
  return matchRoutes;
};
