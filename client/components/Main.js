import React from 'react'
import { Link } from 'react-router'
import Invoice from './Invoice'

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="site-title"><Link to="/">Quick Invoice!</Link></h1>
                <div className="container">
                    <div className="main-content">
                        {React.cloneElement(this.props.children, this.props)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
