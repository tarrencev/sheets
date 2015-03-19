'use strict';

import React from 'react';
import Immutable from 'immutable';
import Jexl from 'Jexl';

const DOUBLE_CLICK_WINDOW_MS = 500;

class SheetCell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            astClickDate: 0,
            value: props.cell.get('value')
        }
    }

    componentWillReceiveProps(nextProps) {
        let wasEditing = this.props.cell.get('isEditing');
        let isEditing = nextProps.cell.get('isEditing');
        let value = nextProps.cell.get('value');

        if (wasEditing && !isEditing) {
            nextProps.cell.update('value', () => this.state.value);
        } else if (isEditing) {
            this.setState({
                value: value
            });
        } else if (value.substring(0, 1) === '=') {
            Jexl.eval(value.slice(1), {}, (err, res) => {
                this.setState({
                    value: res || err
                });
            }.bind(this));
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(this.props.cell, nextProps.cell) ||
                this.state.value === nextState.value ||
                nextProps.cell.get('value') !== nextState.value;
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
                onClick={this.handleClick.bind(this)}
            >
                <input type='value'
                    ref='input'
                    value={this.state.value}
                    readOnly={!isEditing}
                    style={inputStyle}
                    onKeyUp={this.handleKeyUp.bind(this)}
                    onChange={this.handleChange.bind(this)}
                />
            </td>
        );
    }

    handleClick(ev) {
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

    handleChange(ev) {
        this.setState({
            value: ev.target.value
        });
    }

    handleKeyUp(ev) {

        if (ev.key !== 'Enter') {
            return;
        }

        this.props.cell.update('isEditing', () => false);
    }
};

module.exports = SheetCell;
