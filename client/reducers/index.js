import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { invoices } from './invoice'
import { entries } from './entries'

const rootReducer = combineReducers({
    invoices,
    entries,
    routing: routerReducer
});

export default rootReducer;
