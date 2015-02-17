/** @jsx React.DOM */

'use strict';

var React = require('react');
var History = require('immutable-history');
var Sheet = require('./Sheet.jsx');
var Toolbar = require('./Toolbar.jsx');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var SheetApp = React.createClass({

    mixins: [PureRenderMixin],

    componentWillMount: function() {
        this.setState({
            history: new History(this.props.sheetData, this._cursorChange)
        });
    },

    _cursorChange: function(cursor) {
        this.setState({
            sheetDataCursor: cursor
        });
    },

    _undo: function() {
        this.state.history.undo();
    },

    render: function() {

        return (
            <div>
                <Toolbar
                    undo={this._undo}
                    rows={this.state.sheetDataCursor.get('rows')}
                    selectedCells={this.state.sheetDataCursor.get('selectedCells')}
                    editingCellKeys={this.state.sheetDataCursor.get('editingCellKeys')}
                />
                <div className='sheet-container'>
                    <Sheet
                        rows={this.state.sheetDataCursor.get('rows')}
                        selectedCells={this.state.sheetDataCursor.get('selectedCells')}
                        editingCellKeys={this.state.sheetDataCursor.get('editingCellKeys')}
                    />
                </div>
            </div>
        );
    }
});

module.exports = SheetApp;
