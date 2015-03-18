"use strict";

var React = require("react");
var Immutable = require("immutable");
var PureRenderMixin = require("react/addons").PureRenderMixin;

var RowCell = React.createClass({
    displayName: "RowCell",

    mixins: [PureRenderMixin],

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.cell, nextProps.cell);
    },

    render: function render() {

        return React.createElement(
            "td",
            { className: "row-cell" },
            this.props.value
        );
    }
});

module.exports = RowCell;