import React from 'react';
import { render } from 'react-dom';

// import router
import { Router, Route, IndexRoute } from 'react-router'

import { Provider } from 'react-redux';

import css from './styles/style.styl';

import store, { history } from './store'

import App from './components/App';
import ListContainer from './containers/ListContainer'
import InvoiceContainer from './components/InvoiceContainer'

render((
   <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={ListContainer}></IndexRoute>
                <Route path="/new/:invoiceid" component={InvoiceContainer}></Route>
                <Route path="/invoice/:invoiceid" component={InvoiceContainer}></Route>
            </Route>
        </Router>
    </Provider>
),
document.getElementById('root'));
