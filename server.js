/**
 * @fileoverview Express server for sheets
 * @author tvanas
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

require("babel/register");
var express = require('express'),
	path = require('path');

require('node-jsx').install();

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//------------------------------------------------------------------------------
// Application
//------------------------------------------------------------------------------

var config = require(path.join(__dirname,'config/config'));

var app = express();

// Express settings
require(path.join(__dirname,'config/express'))(app);

// Routing
require(path.join(__dirname, 'routes'))(app);

app.listen(config.port, function() {
	console.log('Listening on ' + config.port);
});

module.exports = app;
