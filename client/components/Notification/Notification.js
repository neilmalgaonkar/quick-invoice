import React from 'react'

import notificationStyle from './_notification.styl'

class Notification extends React.Component
{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`notification-cont ${(this.props.ui.notificationAutoVisible) ? 'show' : ''}`}>
                <div className="notification">
                    <p className="message">Invoice autosaved to local storage.</p>
                </div>
            </div>
        )
    }
}

export default Notification
