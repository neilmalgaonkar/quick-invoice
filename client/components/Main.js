import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router'

import NotificationContainer from './../containers/NotificationContainer'
import PopupContainer from './../containers/PopupContainer'

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={((this.props.ui.overlay) ? 'overlay-open' : 'overlay-close')}>
                <NotificationContainer />
                <PopupContainer />
                <div>
                    <h1 className="site-title"><Link to="/">Quick Invoice!</Link></h1>
                    <div className="container">
                        <div className="main-content">
                            {React.cloneElement(this.props.children, this.props)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
