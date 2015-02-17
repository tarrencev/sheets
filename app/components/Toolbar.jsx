/** @jsx React.DOM */

'use strict';

var React = require('react');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var ButtonGroup = require('react-bootstrap/ButtonGroup');
var Button = require('react-bootstrap/Button');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var Toolbar = React.createClass({

    mixins: [PureRenderMixin],

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
        var selectedCells = this.props.selectedCells;

        // Perform a batch mutation to avoid creating a bunch of immutables
        var newRows = this.props.rows.withMutations(function(rows) {
            selectedCells.forEach(function(value, key) {
                var x = selectedCells.get(key).get('x');
                var y = selectedCells.get(key).get('y');
                rows.setIn([y, x, deltaKey], delta[deltaKey]);
            });
        });

        this.props.rows = newRows;
    }
});

module.exports = Toolbar;
