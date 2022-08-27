const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

// has to be first for env variables
const config = require('./config');

const loaders = require('./loaders');
const routes = require('./routes');
const NotFoundError = require('./errors/not-found');
const errorHandler = require('./middlewares/error-handler');
const swaggerDocument = require('../docs/swagger.json');

const app = express();

loaders();

const options = {
  origin: '*',
  methods: '*',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(helmet());
app.use('/', routes);
app.use((req, res, next) => {
  const error = new NotFoundError();
  next(error);
});

app.use(errorHandler);

const server = app.listen(config.port || 8080, () => {
  console.log(`Server is listening on ${config.port || 8080} port.`);
});

module.exports = server;
