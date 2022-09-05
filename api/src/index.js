const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const https = require('https');
const fs = require('fs');

// has to be first for env variables
const config = require('./config');

const loaders = require('./server/loaders');
const routes = require('./server/routes');
const NotFoundError = require('./errors/not-found');
const errorHandler = require('./server/middlewares/error-handler');
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

app.use('/documentation/index.html', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// app.use(helmet());
app.use('/', routes);
app.use((req, res, next) => {
  const error = new NotFoundError();
  next(error);
});

app.use(errorHandler);

if (config.runningEnvironment === 'dev') {
  app.listen(config.port || 8080, () => {
    console.log(`Server is listening on ${config.port || 8080} port.`);
  });
} else {
  const httpsOptions = {
    key: fs.readFileSync('./sslkey/key.pem'),
    cert: fs.readFileSync('./sslkey/cer.cert'),
  };
  https.createServer(httpsOptions, app).listen(443);
}
