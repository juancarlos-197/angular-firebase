/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';
import path from 'path';
//import * as admin from "firebase-admin";

//var serviceAccount = require("./config/yunius-c10efd39cac8.json");

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: path.resolve(__dirname,'./config/yunius-b4eee-firebase-adminsdk-tznl5-415aa213dc.json'),
  databaseURL: "https://yunius-b4eee.firebaseio.com"
});

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yunius-b4eee.firebaseio.com"
});*/

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
