/** @jsx React.DOM */

'use strict';

var React = require('react');
var Cell = require('./Cell.jsx');
var Table = require('react-bootstrap/Table');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var SheetApp = React.createClass({

    mixins: [PureRenderMixin],

    renderCell: function(cell) {
        return <Cell
                    key={cell.get('x') + ':' + cell.get('y')}
                    cell={cell}
                    selectedCells={this.props.selectedCells}
                    editingCellKeys={this.props.editingCellKeys}
                />;
    },

    renderRow: function(cells, i) {
        return (<tr key={i}>{cells.map(this.renderCell).toArray()}</tr>);
    },

    render: function() {
        return (
            <Table>
                {this.props.rows.map(this.renderRow).toArray()}
            </Table>
        );
    }
});

module.exports = SheetApp;
