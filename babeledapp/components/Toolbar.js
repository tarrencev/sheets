"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Immutable = _interopRequire(require("immutable"));

var ButtonToolbar = _interopRequire(require("react-bootstrap/ButtonToolbar"));

var ButtonGroup = _interopRequire(require("react-bootstrap/ButtonGroup"));

var Button = _interopRequire(require("react-bootstrap/Button"));

var Toolbar = (function (_React$Component) {
    function Toolbar(props) {
        _classCallCheck(this, Toolbar);

        _get(Object.getPrototypeOf(Toolbar.prototype), "constructor", this).call(this, props);
    }

    _inherits(Toolbar, _React$Component);

    _createClass(Toolbar, {
        shouldComponentUpdate: {
            value: function shouldComponentUpdate(nextProps) {
                return !Immutable.is(this.props.sheetData, nextProps.sheetData);
            }
        },
        render: {
            value: function render() {
                return React.createElement(
                    ButtonToolbar,
                    null,
                    React.createElement(
                        ButtonGroup,
                        null,
                        React.createElement(
                            Button,
                            { onClick: this._addStyle({ textAlign: "left" }) },
                            "Left"
                        ),
                        React.createElement(
                            Button,
                            { onClick: this._addStyle({ textAlign: "center" }) },
                            "Center"
                        ),
                        React.createElement(
                            Button,
                            { onClick: this._addStyle({ textAlign: "right" }) },
                            "Right"
                        )
                    ),
                    React.createElement(
                        Button,
                        { onClick: this._addStyle({ fontWeight: "bold" }) },
                        "Bold"
                    ),
                    React.createElement(
                        Button,
                        { onClick: this._addStyle({ fontStyle: "italic" }) },
                        "Italics"
                    ),
                    React.createElement(
                        Button,
                        { onClick: this.props.undo },
                        "Undo"
                    )
                );
            }
        },
        _addStyle: {
            value: function _addStyle(delta) {
                var me = this;
                return function () {
                    me._updateSelectedCells(delta);
                };
            }
        },
        _updateSelectedCells: {
            value: function _updateSelectedCells(delta) {
                var deltaKey = Object.keys(delta)[0];
                var sheetData = this.props.sheetData;

                sheetData.update(function (sheetData) {
                    sheetData.get("selectedCells").forEach(function (cell) {
                        sheetData = sheetData.setIn(["rows", cell.get("y"), cell.get("x"), deltaKey], delta[deltaKey]);
                    });

                    return sheetData;
                });
            }
        }
    });

    return Toolbar;
})(React.Component);

;

module.exports = Toolbar;