/** @jsx React.DOM */

'use strict';

var React = require('react');
var Immutable = require('immutable');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var ButtonGroup = require('react-bootstrap/ButtonGroup');
var Button = require('react-bootstrap/Button');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var Toolbar = React.createClass({

    mixins: [PureRenderMixin],

    shouldComponentUpdate: function(nextProps) {
        return !Immutable.is(this.props.sheetData, nextProps.sheetData);
    },

    render: function() {
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button onClick={this._addStyle({textAlign: 'left'})}>Left</Button>
                    <Button onClick={this._addStyle({textAlign: 'center'})}>Center</Button>
                    <Button onClick={this._addStyle({textAlign: 'right'})}>Right</Button>
                </ButtonGroup>
                <Button onClick={this._addStyle({fontWeight: 'bold'})}>Bold</Button>
                <Button onClick={this._addStyle({fontStyle: 'italic'})}>Italics</Button>
                <Button onClick={this.props.undo}>Undo</Button>
            </ButtonToolbar>
        );
    },

    _addStyle: function(delta) {
        var me = this;
        return function() {
            me._updateSelectedCells(delta);
        };
    },

    _updateSelectedCells: function(delta) {
        var deltaKey = Object.keys(delta)[0];
        var sheetData = this.props.sheetData;

        sheetData.update(function(sheetData) {
            sheetData.get('selectedCells').forEach(function(cell) {
                sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), deltaKey], delta[deltaKey]);
            });

            return sheetData;
        });
    }
});

module.exports = Toolbar;
