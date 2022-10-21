const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
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
  origin: config.runningEnvironment === 'prod' ? /\.littlefish\.foundation$/ : '*',
  methods: '*',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));

app.use('/documentation/index.html', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/documentation/', express.static('docs'));
app.use(helmet());
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
  let httpsOptions;
  try {
    httpsOptions = {
      key: fs.readFileSync('./src/sslkey/key.pem'),
      cert: fs.readFileSync('./src/sslkey/cer.cert'),
    };
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  https.createServer(httpsOptions, app).listen(8000);
}
