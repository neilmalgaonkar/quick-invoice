import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Main from './Main'

import * as actions from './../actions/actionCreators'

const mapStateToProps = (state) => {
    return {
        invoices: state.invoices,
        entries: state.entries
    }
}

const mapDisptachToAction = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

const App = connect(mapStateToProps, mapDisptachToAction)(Main)

export default App;
