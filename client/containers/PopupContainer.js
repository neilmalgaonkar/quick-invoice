import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { toggleOverlay } from './../actions/actionCreators'

import Popup from './../components/Popup/Popup'

const PopupContainer = (props) => {
    return (
        <div>
            <div className="overlay"></div>
            <Popup ui={props.ui} toggleOverlay={props.toggleOverlay}/>
        </div>
    )
}

const mapStatesToProps = (state) => {
    return {
        ui: state.ui
    }
}

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        toggleOverlay
    }, dispatch)
}

export default connect(mapStatesToProps, mapDispatchToAction)(PopupContainer)
