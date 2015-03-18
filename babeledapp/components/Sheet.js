"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Immutable = _interopRequire(require("immutable"));

var Cell = _interopRequire(require("./Cell.js"));

var RowCell = _interopRequire(require("./RowCell.js"));

var Table = _interopRequire(require("react-bootstrap/Table"));

var Sheet = (function (_React$Component) {
    function Sheet() {
        _classCallCheck(this, Sheet);

        if (_React$Component != null) {
            _React$Component.apply(this, arguments);
        }
    }

    _inherits(Sheet, _React$Component);

    _createClass(Sheet, {
        shouldComponentUpdate: {
            value: function shouldComponentUpdate(nextProps) {
                return !Immutable.is(this.props.sheetData, nextProps.sheetData);
            }
        },
        renderCell: {
            value: function renderCell(cell) {
                return React.createElement(Cell, {
                    key: cell.get("x") + ":" + cell.get("y"),
                    cell: cell,
                    onCellSelection: this._cellSelectionHandler.bind(this),
                    onCellEditing: this._cellEditingHandler.bind(this)
                });
            }
        },
        renderRow: {
            value: function renderRow(cells, i) {
                return React.createElement(
                    "tr",
                    { key: i },
                    React.createElement(RowCell, { value: i + 1 }),
                    cells.map(this.renderCell.bind(this)).toArray()
                );
            }
        },
        render: {
            value: function render() {
                return React.createElement(
                    Table,
                    null,
                    this.props.sheetData.get("rows").map(this.renderRow.bind(this)).toArray()
                );
            }
        },
        _getCellHash: {
            value: function _getCellHash(cell) {
                return cell.get("x") + ":" + cell.get("y");
            }
        },
        _cellSelectionHandler: {
            value: function _cellSelectionHandler(cell, isMultiSelect) {
                console.log("select");
                var sheetData = this.props.sheetData;
                var self = this;

                if (cell.get("isSelected")) {
                    return;
                }

                sheetData.update(function (sheetData) {
                    if (!isMultiSelect) {
                        sheetData.get("selectedCells").forEach(function (cell) {
                            sheetData = sheetData.setIn(["rows", cell.get("y"), cell.get("x"), "isSelected"], false);
                            sheetData = sheetData.setIn(["rows", cell.get("y"), cell.get("x"), "isEditing"], false);
                        });
                        sheetData = sheetData.set("selectedCells", Immutable.Map());
                    }
                    sheetData = sheetData.setIn(["rows", cell.get("y"), cell.get("x"), "isSelected"], true);
                    sheetData = sheetData.setIn(["selectedCells", self._getCellHash(cell)], cell);

                    return sheetData;
                });
            }
        },
        _cellEditingHandler: {
            value: function _cellEditingHandler(cell) {
                var sheetData = this.props.sheetData;
                var self = this;

                sheetData.update(function (sheetData) {
                    sheetData.get("editingCells").forEach(function (cell) {
                        sheetData = sheetData.setIn(["rows", cell.get("y"), cell.get("x"), "isEditing"], false);
                    });

                    sheetData = sheetData.set("isEditing", Immutable.Map());
                    sheetData = sheetData.setIn(["rows", cell.get("y"), cell.get("x"), "isEditing"], true);
                    sheetData = sheetData.setIn(["editingCells", self._getCellHash(cell)], cell);
                    return sheetData;
                });
            }
        }
    });

    return Sheet;
})(React.Component);

;

module.exports = Sheet;