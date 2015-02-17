/** @jsx React.DOM */

'use strict';

var React = require('react');
var Cursor = require('immutable/contrib/cursor');
var Sheet = require('./Sheet.jsx');
var Toolbar = require('./Toolbar.jsx');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var SheetApp = React.createClass({

    mixins: [PureRenderMixin],

    getInitialState: function() {
        return {
            sheetDataCursor: Cursor.from(this.props.sheetData, [], this._cursorChange)
        };
    },

    _cursorChange: function(newData) {
        this.state.sheetDataCursor = Cursor.from(newData, [], this._cursorChange);
        this.forceUpdate();
    },

    render: function() {

        return (
            <div>
                <Toolbar
                    rows={this.state.sheetDataCursor.get('rows')}
                    selectedCells={this.state.sheetDataCursor.get('selectedCells')}
                    editingCellKeys={this.state.sheetDataCursor.get('editingCellKeys')}
                />
                <Sheet
                    rows={this.state.sheetDataCursor.get('rows')}
                    selectedCells={this.state.sheetDataCursor.get('selectedCells')}
                    editingCellKeys={this.state.sheetDataCursor.get('editingCellKeys')}
                />
            </div>
        );
    }
});

module.exports = SheetApp;
