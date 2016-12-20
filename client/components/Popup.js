import React from 'react'
import ReactDOM from 'react-dom'

class Popup extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.addEventListener('keyup', this.closeOverlayOnEsc.bind(this))
    }

    closeOverlayOnEsc(e) {
        if(this.props.ui.overlay) {
            if(e.keyCode === 27) {
                this.closeOverlay(e)
            }
        }
    }

    closeOverlay(e) {
        e.preventDefault()
        ReactDOM.unmountComponentAtNode(document.getElementById('popup-container'))
        this.props.toggleOverlay()
    }

    render() {
        return (
            <div>
                <div className={"popup " + ((this.props.ui.overlay) ? 'show-popup' : '')} id="popup">
                    <a href="" onClick={this.closeOverlay.bind(this)} className="cls-btn overlay-cls-btn">x</a>
                    <div className="popup-container" id="popup-container">

                    </div>
                </div>
            </div>
        )
    }
}

export default Popup
