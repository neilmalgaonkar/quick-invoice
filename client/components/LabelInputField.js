import React from 'react'


class LabelInputField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"input-field-cont " + this.props.position + ' ' + this.props.contClass}>
                <span className="input-label">{this.props.labelText}</span>
                <input ref="labelField" type={this.props.fieldType} className={"input " + this.props.fieldClass} defaultValue={this.props.value} onChange={this.props.fieldChangeCallback}/>
            </div>
        );
    }
}

LabelInputField.defaultProps = {
    contClass : '',
    position: 'right-align',
    fieldType: 'text',
    labelText: '?',
    fieldClass: 'field-class',
    fieldChangeCallback: () => '',
    value: ''
}

export default LabelInputField;
