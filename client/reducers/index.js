import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { invoices } from './invoice'
import { entries } from './entries'
import { ui } from './ui'

const rootReducer = combineReducers({
    invoices,
    entries,
    ui,
    routing: routerReducer
});

export default rootReducer;
