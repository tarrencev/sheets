'use strict';

import React from 'react';
import Immutable from 'immutable';
import Jexl from 'Jexl';

const DOUBLE_CLICK_WINDOW_MS = 500;

class SheetCell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            astClickDate: 0
        }
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.cell, nextProps.cell);
    }

    render() {
        let isSelected = this.props.cell.get('isSelected');
        let isEditing = this.props.cell.get('isEditing');

        let cellStyle = {
            border: isSelected ? '2px solid #7BA0FF' : 'none',
            borderRight: isSelected ? '2px solid #7BA0FF' : '1px solid #ddd',
            borderBottom: isSelected ? '2px solid #7BA0FF' : '1px solid #ddd',
            paddingLeft: isSelected ? 0 : 2,
            paddingTop: isSelected ? 0 : 2,
            paddingBottom: isSelected ? 0 : 1,
            paddingRight: isSelected ? 0 : 1
        };

        let inputStyle = {
            fontWeight: this.props.cell.get('fontWeight'),
            textAlign: this.props.cell.get('textAlign'),
            fontStyle: this.props.cell.get('fontStyle'),
            color: this.props.cell.get('fontColor')
        };

        return (
            <td
                className='cell'
                style={cellStyle}
                onClick={this._handleClick.bind(this)}
            >
                <input type='value'
                    value={this.props.cell.get('value')}
                    readOnly={!isEditing}
                    style={inputStyle}
                    onKeyUp={this._handleKeyUp.bind(this)}
                    onChange={this._handleChange.bind(this)}
                />
            </td>
        );
    }

    _handleClick(ev) {
        let curClickDate = Date.now();

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
    }

    _handleChange(ev) {
        this.props.cell.update('value', function() { return ev.target.value; });
    }

    _handleKeyUp(ev) {

        if (ev.key !== 'Enter') {
            return;
        }

        let value = ev.target.value;
        if (value && value.substring(0, 1) === '=') {
            Jexl.eval(ev.target.value.slice(1), {}, (err, res) => {
                this.props.cell.update('value', () => {
                    return res;
                });
            });
        }
    }
};

module.exports = SheetCell;
