import React from 'react'

import { connect } from 'react-redux'

import Notification from '../components/Notification/Notification'

const NotificationContainer = (props, dispatch) => {

    return (
        <Notification ui={props.ui}/>
    )
}

const mapStateToProps = (state) => {
    return {
        ui: state.ui
    }
}

export default connect(mapStateToProps)(NotificationContainer)
