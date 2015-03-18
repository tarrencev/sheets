'use strict';

import React from 'react';
import Immutable from 'immutable';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.sheetData, nextProps.sheetData);
    }

    render() {
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
    }

    _addStyle(delta) {
        var me = this;
        return function() {
            me._updateSelectedCells(delta);
        };
    }

    _updateSelectedCells(delta) {
        var deltaKey = Object.keys(delta)[0];
        var sheetData = this.props.sheetData;

        sheetData.update(function(sheetData) {
            sheetData.get('selectedCells').forEach(function(cell) {
                sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), deltaKey], delta[deltaKey]);
            });

            return sheetData;
        });
    }
};

module.exports = Toolbar;
