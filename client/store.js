import { createStore, applyMiddleware } from 'redux'

import { syncHistoryWithStore } from  'react-router-redux'
import { browserHistory } from 'react-router'

import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'

import { getLocalyStoredData } from './utils'

let storedData = getLocalyStoredData()
const defaultStore = {
    invoices: storedData.invoices,
    entries: storedData.entries
}

const store = createStore(rootReducer, defaultStore, applyMiddleware(thunkMiddleware))

export const history = syncHistoryWithStore(browserHistory, store)

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store;
