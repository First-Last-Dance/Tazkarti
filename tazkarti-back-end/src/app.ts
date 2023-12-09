import * as dotenv from 'dotenv';
import express from 'express';
import routes from './router';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';

// Config the .env file
dotenv.config();

// Create the API
const app = express();
const port = process.env.PORT || 8080;

//add cors
// app.use(cors());
// We set the CORS origin to * so that we don't need to
// worry about the complexities of CORS.
app.use(
  cors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    origin: '*',
  }),
);

// Swagger Docs.
const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/**/router.ts'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

//Add the json parser
app.use(express.json());

// Set the main router
app.use('/', routes);

// Connect to DB

mongoose
  .connect(
    'mongodb://' + (process.env.DB_Host as string) ||
      '0.0.0.0:27017' + '/Tazkarti',
    { dbName: 'Tazkarti' },
  )
  .then(() => {
    console.log(`DB connected`);
    // Start the API
    app.listen(port, () => {
      console.log(`Backend server is listening on port ${port}....`);
      console.log('press CTRL+C to stop server');
    });
  })
  .catch((err) => console.log(err));

// mongoose
//   .connect('mongodb://0.0.0.0:27017/Tazkarti')
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });
