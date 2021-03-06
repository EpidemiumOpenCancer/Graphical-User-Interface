'use strict';

//require('colors');
//import { environment } from "../../environments/environment";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';

var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  api = require('./routes/api'),
  cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 9000);
//${environment.backend.port}
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
 
}); 
  // Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// already done 
//app.use('/api', api);


// JSON API
app.get('/api/peoples', api.listAll);
app.get('/api/peoples/random', api.getRandom);
app.get('/api/peoples/:id', api.get);
app.get('/api/peoples/name/:name', api.filterByName);
app.get('/api/peoples/skill/:skill', api.filterBySkill);
app.post('/api/peoples', api.create);
app.put('/api/peoples/:id', api.update);
app.delete('/api/peoples/:id', api.delete);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));


});

/**
 * Create HTTP server.
 */
//inutile ? const server = http.createServer(app);

app.listen(app.get('port'), function () {
  console.log('✔Express server listening on http://localhost:%d/', app.get('port'));
});
