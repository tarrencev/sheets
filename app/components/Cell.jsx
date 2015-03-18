'use strict';

var React = require('react');
var Immutable = require('immutable');
var DOUBLE_CLICK_WINDOW_MS = 500;
var PureRenderMixin = require('react/addons').PureRenderMixin;

var SheetCell = React.createClass({

    mixins: [PureRenderMixin],

    getInitialState: function () {
        return {
            lastClickDate: 0
        };
    },

    shouldComponentUpdate: function(nextProps) {
        return !Immutable.is(this.props.cell, nextProps.cell);
    },

    render: function() {
        var isSelected = this.props.cell.get('isSelected');
        var isEditing = this.props.cell.get('isEditing');

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

        if (this.props.cell.get('isSelected') && curClickDate - this.state.lastClickDate < DOUBLE_CLICK_WINDOW_MS) {
            this.props.onCellEditing(this.props.cell);
        } else if (ev.metaKey) {
            this.props.onCellSelection(this.props.cell, true);
        } else {
            this.props.onCellSelection(this.props.cell);
        }

        this.setState({
            lastClickDate: curClickDate
        });
    },

    _handleChange: function(ev) {
        this.props.cell.update('value', function() { return ev.target.value; });
    },

    _handleKeyUp: function(ev) {

        if (ev.key !== 'Enter') {
            return;
        }

        var value = ev.target.value;
        if (value && value.substring(0,1) === '=') {
            // @tvanas: Implement a safe way to execute client generated code
            this.props.cell.update('value', function() { return eval(ev.target.value.slice(1)); });
        }
    }
});

module.exports = SheetCell;
