'use strict';

import React from 'react';
import Immutable from 'immutable';
import Cell from './Cell.js';
import RowCell from './RowCell.js';
import Table from 'react-bootstrap/Table';

class Sheet extends React.Component {

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.sheetData, nextProps.sheetData);
    }

    renderCell(cell) {
        return <Cell
                    key={cell.get('x') + ':' + cell.get('y')}
                    cell={cell}
                    onCellSelection={this._cellSelectionHandler.bind(this)}
                    onCellEditing={this._cellEditingHandler.bind(this)}
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
        let sheetData = this.props.sheetData;

        if (cell.get('isSelected')) {
            return;
        }

        sheetData.update(sheetData => {
            if (!isMultiSelect) {
                sheetData.get('selectedCells').forEach(cell => {
                    sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isSelected'], false);
                    sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], false);
                });
                sheetData = sheetData.set('selectedCells', Immutable.Map());
            }
            sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isSelected'], true);
            sheetData = sheetData.setIn(['selectedCells', this._getCellHash(cell)], cell);

            return sheetData;
        }.bind(this));
    }


    _cellEditingHandler(cell) {
        let sheetData = this.props.sheetData;

        sheetData.update(sheetData => {
            sheetData.get('editingCells').forEach(cell => {
                sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], false);
            });

            sheetData = sheetData.set('isEditing', Immutable.Map());
            sheetData = sheetData.setIn(['rows', cell.get('y'), cell.get('x'), 'isEditing'], true);
            sheetData = sheetData.setIn(['editingCells', this._getCellHash(cell)], cell);
            return sheetData;
        }.bind(this));
    }
};

module.exports = Sheet;
