import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router'
import Popup from './Popup'
import Notification from './Notification'

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={((this.props.ui.overlay) ? 'overlay-open' : 'overlay-close')}>
                <Notification {...this.props}/>
                <div className="overlay">
                </div>
                <Popup {...this.props}/>
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
