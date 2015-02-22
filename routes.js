/** @jsx React.DOM */

'use strict';

var React = require('react');
var Immutable = require('immutable');
var SheetApp = require('./app/components/SheetApp.jsx');

/**
 * Application routes
 */
module.exports = function(app) {

    app.get('/', function(req, res) {

        var rows = [];

        for (var y = 0; y < 1; y++) {
            var cells = [];
            for(var x = 0; x < 2; x++) {
                cells.push({
                    key: '' + y + x,
                    x: x,
                    y: y,
                    value: '' + y + x,
                    fontColor: '',
                    fontWeight: '',
                    fontStyle: '',
                    textAlign: '',
                    isSelected: false
                });
            }

            rows.push(cells);
        }

        var initialData = {
            rows: rows,
            selectedCells: {},
            editingCells: {}
        };

        var markup = React.renderToString(
            <SheetApp sheetData={Immutable.fromJS(initialData)} />
        );

        res.render('home', {
            content: markup,
            state: JSON.stringify(initialData)
        });
    });
};
