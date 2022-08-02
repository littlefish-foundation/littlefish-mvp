const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

const loaders = require('./loaders');
const routes = require('./routes');
const NotFoundError = require('./errors/not-found');
const errorHandler = require('./middlewares/error-handler');
// const swaggerDocument = require('./docs/swagger.json');

const app = express();
dotenv.config();
loaders();

app.use(helmet());

const options = {
  origin: '*',
  methods: '*',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening on ${process.env.PORT || 8080} port.`);

  app.use('/', routes);

  app.use((req, res, next) => {
    const error = new NotFoundError();
    next(error);
  });
  app.use(errorHandler);
});

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});
module.exports = server;
