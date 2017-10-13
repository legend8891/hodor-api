import mongoose from 'mongoose';
import util from 'util';

// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';
import db from './db/models';
import pry from 'pryjs';

const debug = require('debug')('hodor-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// set models so it can be accessed globally
// console.log("app is");
// console.log(app);
// eval(pry.it);
app.set('models', require('./db/models'));
var User = app.get('models').User;
// console.log(User);
// eval(pry.it);

// connect to mongo db
// const mongoUri = config.mongo.host;
// mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to database: ${mongoUri}`);
// });
//
// // print mongoose logs in dev env
// if (config.MONGOOSE_DEBUG) {
//   mongoose.set('debug', (collectionName, method, query, doc) => {
//     debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
//   });
// }

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}
global.appInstance = app;
export default app;
