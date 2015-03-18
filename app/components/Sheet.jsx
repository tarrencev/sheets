'use strict';

import React from 'react';
import Immutable from 'immutable';
import Cell from './Cell.jsx';
import RowCell from './RowCell.jsx';
import Table from 'react-bootstrap/Table';

class Sheet extends React.Component {

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.sheetData, nextProps.sheetData);
    }

    renderCell(cell) {
        return <Cell
                    key={cell.get('x') + ':' + cell.get('y')}
                    cell={cell}
                    onCellSelection={this._cellSelectionHandler}
                    onCellEditing={this._cellEditingHandler}
                />;
    }

    renderRow(cells, i) {
        return (<tr key={i}>
                    <RowCell value={i + 1}/>
                    {cells.map(this.renderCell.bind(this)).toArray()}
                </tr>);
    }

    render() {
        return (
            <Table>
                {this.props.sheetData.get('rows').map(this.renderRow.bind(this)).toArray()}
            </Table>
        );
    }

    _getCellHash(cell) {
        return cell.get('x') + ':' + cell.get('y');
    }

    _cellSelectionHandler(cell, isMultiSelect) {
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
            sheetData = sheetData.setIn(['selectedCells', this._getCellHash(cell)], cell);

            return sheetData;
        });
    }


    _cellEditingHandler(cell) {
        var sheetData = this.props.sheetData;
        var me = this;

        sheetData.update(function(sheetData) {
            sheetData.get('editingCells').forEach(function(cell) {
                sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], false);
            });

            sheetData = sheetData.set('isEditing', Immutable.Map());
            sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], true);
            sheetData = sheetData.setIn(['editingCells', this._getCellHash(cell)], cell);
            return sheetData;
        });
    }
};

module.exports = Sheet;
