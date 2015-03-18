'use strict';

import React from 'react';
import Immutable from 'immutable';

class RowCell extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.cell, nextProps.cell);
    }

    render() {
        return (
            <td className='row-cell'>{this.props.value}</td>
        );
    }
};

module.exports = RowCell;
