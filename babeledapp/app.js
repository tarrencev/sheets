"use strict";

var React = require("react");
var Immutable = require("immutable");
var SheetApp = require("./components/SheetApp.js");

var initialData = Immutable.fromJS(JSON.parse(document.getElementById("initial-state").innerHTML));

React.render(React.createElement(SheetApp, { sheetData: initialData }), document.getElementById("app-main"));