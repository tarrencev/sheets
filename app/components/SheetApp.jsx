'use strict';

var React = require('react');
var Immutable = require('immutable');
var History = require('immutable-history');
var Sheet = require('./Sheet.jsx');
var Toolbar = require('./Toolbar.jsx');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var SheetApp = React.createClass({

    mixins: [PureRenderMixin],

    shouldComponentUpdate: function(nextProps, nextState) {
        return !(Immutable.is(this.props.sheetData, nextProps.sheetData) &&
                    Immutable.is(this.state.sheetData, nextState.sheetData));
    },

    componentWillMount: function() {
        this.setState({
            history: new History(this.props.sheetData, this._cursorChange),
        });
    },

    _cursorChange: function(cursor) {
        this.setState({
            sheetData: cursor
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
                    sheetData={this.state.sheetData}
                />
                <div className='sheet-container'>
                    <Sheet
                        sheetData={this.state.sheetData}
                    />
                </div>
            </div>
        );
    }
});

module.exports = SheetApp;
