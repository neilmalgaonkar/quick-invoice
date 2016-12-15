import React from 'react';
import { render } from 'react-dom';

// import router
import { Router, Route, IndexRoute } from 'react-router'

import { Provider } from 'react-redux';

import css from './styles/style.styl';

import store, { history } from './store'

import App from './components/App';

import List from './components/List'
import InvoiceContainer from './components/InvoiceContainer'

render((
   <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={List}></IndexRoute>
                <Route path="/new" component={InvoiceContainer}></Route>
                <Route path="/invoice/:invoiceid" component={InvoiceContainer}></Route>
            </Route>
        </Router>
    </Provider>
),
document.getElementById('root'));
