import * as dotenv from 'dotenv';
import express from 'express';
import routes from './router';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import mongoose from 'mongoose';

// Config the .env file
dotenv.config();

// Create the API
const app = express();
const port = process.env.PORT || 8080;

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
      'localhost:27017' + '/Tazkarti',
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
