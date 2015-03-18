'use strict';

import React from 'react';
import Immutable from 'immutable';
import History from 'immutable-history';
import Sheet from './Sheet.jsx';
import Toolbar from './Toolbar.jsx';

class SheetApp extends React.Component {

    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(Immutable.is(this.props.sheetData, nextProps.sheetData) &&
                    Immutable.is(this.state.sheetData, nextState.sheetData));
    }

    componentWillMount() {
        this.setState({
            history: new History(this.props.sheetData, this._cursorChange.bind(this)),
        });
    }

    _cursorChange(cursor) {
        this.setState({
            sheetData: cursor
        });
    }

    _undo() {
        this.state.history.undo();
    }

    render() {

        return (
            <div>
                <Toolbar
                    undo={this._undo}
                    sheetData={this.state.sheetData}
                />
                <div className='sheet-container'>
                    <Sheet
                        sheetData={this.state.sheetData}
                    />
                </div>
            </div>
        );
    }
};

module.exports = SheetApp;
