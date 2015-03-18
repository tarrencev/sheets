/** @jsx React.DOM */

'use strict';

var React = require('react');
var Immutable = require('immutable');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var RowCell = React.createClass({

    mixins: [PureRenderMixin],

    shouldComponentUpdate: function(nextProps) {
        return !Immutable.is(this.props.cell, nextProps.cell);
    },

    render: function() {

        return (
            <td className='row-cell'>{this.props.value}</td>
        );
    }
});

module.exports = RowCell;
