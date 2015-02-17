/** @jsx React.DOM */

'use strict';

var React = require('react');
var Immutable = require('immutable');
var DOUBLE_CLICK_WINDOW_MS = 500;
var PureRenderMixin = require('react/addons').PureRenderMixin;
var utils = require('../utils');

var SheetCell = React.createClass({

    mixins: [PureRenderMixin],

    getInitialState: function () {
        return {
            lastClickDate: 0
        };
    },

    shouldComponentUpdate: function(nextProps) {
        return nextProps.selectedCells.has(utils.getCellHash(nextProps.cell)) ||
                this.props.selectedCells.has(utils.getCellHash(this.props.cell));
    },

    render: function() {
        var isSelected = this.props.selectedCells.has(utils.getCellHash(this.props.cell));
        var isEditing = this.props.editingCellKeys.has(this.props.cell.get('key'));

        var cellStyle = {
            border: isSelected ? '2px solid #7BA0FF' : 'none',
            borderRight: isSelected ? '2px solid #7BA0FF' : '1px solid #ddd',
            borderBottom: isSelected ? '2px solid #7BA0FF' : '1px solid #ddd',
            paddingLeft: isSelected ? 0 : 2,
            paddingTop: isSelected ? 0 : 2,
            paddingBottom: isSelected ? 0 : 1,
            paddingRight: isSelected ? 0 : 1
        };

        var inputStyle = {
            fontWeight: this.props.cell.get('fontWeight'),
            textAlign: this.props.cell.get('textAlign'),
            fontStyle: this.props.cell.get('fontStyle'),
            color: this.props.cell.get('fontColor')
        };

        return (
            <td
                className='cell'
                style={cellStyle}
                onClick={this._handleClick}
                onBlur={this._handleBlur}
            >
                <input type='value'
                    value={this.props.cell.get('value')}
                    readOnly={!isEditing}
                    style={inputStyle}
                    onKeyUp={this._handleKeyUp}
                    onChange={this._handleChange}
                />
            </td>
        );
    },

    _handleClick: function(ev) {

        var curClickDate = Date.now();

        if (!this.props.selectedCells.has(utils.getCellHash(this.props.cell))) {

            if (ev.metaKey) {
                this.props.selectedCells = this.props.selectedCells.set(utils.getCellHash(this.props.cell), Immutable.Map({
                    x: this.props.cell.get('x'),
                    y: this.props.cell.get('y')
                }));
            } else {
                this.props.selectedCells = this.props.selectedCells.clear();
                this.props.selectedCells = this.props.selectedCells.set(utils.getCellHash(this.props.cell), Immutable.Map({
                    x: this.props.cell.get('x'),
                    y: this.props.cell.get('y')
                }));
            }
        } else if (!this.props.editingCellKeys.contains(this.props.cell.get('key')) && curClickDate - this.state.lastClickDate < DOUBLE_CLICK_WINDOW_MS) {
            this.props.editingCellKeys = this.props.editingCellKeys.set(this.props.cell.get('key'), true);
        }

        this.setState({
            lastClickDate: curClickDate
        });
    },

    _handleChange: function(ev) {
        this.props.cell = this.props.cell.set('value', ev.target.value);
    },

    _handleKeyUp: function(ev) {

        if (ev.key !== 'Enter') {
            return;
        }

        var value = ev.target.value;
        if (value && value.substring(0,1) === '=') {
            console.log('eval');
        }
    }
});

module.exports = SheetCell;
