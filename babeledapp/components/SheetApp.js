"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Immutable = _interopRequire(require("immutable"));

var History = _interopRequire(require("immutable-history"));

var Sheet = _interopRequire(require("./Sheet.js"));

var Toolbar = _interopRequire(require("./Toolbar.js"));

var SheetApp = (function (_React$Component) {
    function SheetApp(props) {
        _classCallCheck(this, SheetApp);

        _get(Object.getPrototypeOf(SheetApp.prototype), "constructor", this).call(this, props);
    }

    _inherits(SheetApp, _React$Component);

    _createClass(SheetApp, {
        shouldComponentUpdate: {
            value: function shouldComponentUpdate(nextProps, nextState) {
                return !(Immutable.is(this.props.sheetData, nextProps.sheetData) && Immutable.is(this.state.sheetData, nextState.sheetData));
            }
        },
        componentWillMount: {
            value: function componentWillMount() {
                this.setState({
                    history: new History(this.props.sheetData, this._cursorChange.bind(this)) });
            }
        },
        _cursorChange: {
            value: function _cursorChange(cursor) {
                this.setState({
                    sheetData: cursor
                });
            }
        },
        _undo: {
            value: function _undo() {
                this.state.history.undo();
            }
        },
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(Toolbar, {
                        undo: this._undo,
                        sheetData: this.state.sheetData
                    }),
                    React.createElement(
                        "div",
                        { className: "sheet-container" },
                        React.createElement(Sheet, {
                            sheetData: this.state.sheetData
                        })
                    )
                );
            }
        }
    });

    return SheetApp;
})(React.Component);

;

module.exports = SheetApp;