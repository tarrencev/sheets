'use strict';

var React = require('react');
var Immutable = require('immutable');
var PureRenderMixin = require('react/addons').PureRenderMixin;
var Cell = require('./Cell.jsx');
var RowCell = require('./RowCell.jsx');
var Table = require('react-bootstrap/Table');
var UtilsMixin = require('../mixins/UtilsMixin');

var Sheet = React.createClass({

    mixins: [PureRenderMixin, UtilsMixin],

    shouldComponentUpdate: function(nextProps) {
        return !Immutable.is(this.props.sheetData, nextProps.sheetData);
    },

    renderCell: function(cell) {
        return <Cell
                    key={cell.get('x') + ':' + cell.get('y')}
                    cell={cell}
                    onCellSelection={this._cellSelectionHandler}
                    onCellEditing={this._cellEditingHandler}
                />;
    },

    renderRow: function(cells, i) {
        return (<tr key={i}>
                    <RowCell value={i + 1}/>
                    {cells.map(this.renderCell).toArray()}
                </tr>);
    },

    render: function() {
        return (
            <Table>
                {this.props.sheetData.get('rows').map(this.renderRow).toArray()}
            </Table>
        );
    },

    _cellSelectionHandler: function(cell, isMultiSelect) {
        var sheetData = this.props.sheetData;
        var me = this;

        if (cell.get('isSelected')) {
            return;
        }

        sheetData.update(function(sheetData) {
            if (!isMultiSelect) {
                sheetData.get('selectedCells').forEach(function(cell) {
                    sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isSelected'], false);
                    sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], false);
                });
                sheetData = sheetData.set('selectedCells', Immutable.Map());
            }
            sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isSelected'], true);
            sheetData = sheetData.setIn(['selectedCells', me.getCellHash(cell)], cell);

            return sheetData;
        });
    },


    _cellEditingHandler: function(cell) {
        var sheetData = this.props.sheetData;
        var me = this;

        sheetData.update(function(sheetData) {
            sheetData.get('editingCells').forEach(function(cell) {
                sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], false);
            });

            sheetData = sheetData.set('isEditing', Immutable.Map());
            sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], true);
            sheetData = sheetData.setIn(['editingCells', me.getCellHash(cell)], cell);
            return sheetData;
        });
    }
});

module.exports = Sheet;
