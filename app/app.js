'use strict';

import React from 'react';
import Immutable from 'immutable';
import SheetApp from './components/SheetApp.js';

let initialData = Immutable.fromJS(JSON.parse(document.getElementById('initial-state').innerHTML));

React.render(
	<SheetApp sheetData={initialData} />,
	document.getElementById('app-main')
);
