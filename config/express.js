'use strict';

var express = require('express'),
	exphbs  = require('express-handlebars'),
	path = require('path');

module.exports = function(app) {

	app.use(express.static(path.join(__dirname, '../public')));
	app.engine('.hbs', exphbs({
		extname: '.hbs',
		defaultLayout: 'main',
	}));
	app.set('view engine', '.hbs');
};
