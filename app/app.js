'use strict';

var React = require('react');
var Immutable = require('immutable');
var SheetApp = require('./components/SheetApp.jsx');

var initialData = Immutable.fromJS(JSON.parse(document.getElementById('initial-state').innerHTML));

React.render(
	<SheetApp sheetData={initialData} />,
	document.getElementById('app-main')
);
