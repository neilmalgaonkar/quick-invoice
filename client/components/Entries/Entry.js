import React from 'react'

import _ from 'lodash'
import validator from 'validator'

import { adjustDecimal } from './../../utils'

import LabelInputField from './../UI/LabelInputField'

class Entry extends React.Component {
    constructor(props) {
        super(props);
    }

    remove(e) {
        e.preventDefault()
        this.props.removeEntry(this.props.index)
    }

    updateEntry() {
        let index = this.props.index
        let rate = !isNaN(this.refs['rateRef_' + index].refs.labelField.value) ? this.refs['rateRef_' + index].refs.labelField.value : 0
        let quantity = !isNaN(this.refs['quantityRef_' + index].refs.labelField.value) ? this.refs['quantityRef_' + index].refs.labelField.value : 0
        let amount = rate * quantity
        let entry = {
            description: validator.escape(this.refs['description_' + index].value),
            rate: rate,
            quantity: quantity,
            amount: amount
        }
        this.props.updateEntry(entry, index);
    }

    render(){
        return (
            <div className="table-row">
                <div className="row-view">
                    <a href="" className="cls-btn" onClick={this.remove.bind(this)}>x</a>
                    <div className="td col-item">
                        <label htmlFor={"description_" + this.props.index}className="field-label">Description</label>
                        <input type="text" ref={"description_" + this.props.index} placeholder="Item description" defaultValue={validator.unescape(this.props.entry.description)} onChange={this.updateEntry.bind(this)}/>
                    </div>
                    <div className="td col-quantity">
                        <label htmlFor={"quantity_" + this.props.index}className="field-label">Quantity</label>
                        <LabelInputField ref={"quantityRef_" + this.props.index} position="right" labelText={this.props.invoice.quantity} contClass="entry-quantity-cont-field" value={this.props.entry.quantity} labelText="hrs" fieldChangeCallback={this.updateEntry.bind(this)}/>
                    </div>
                    <div className="td col-rate">
                        <label htmlFor={"rate_" + this.props.index}className="field-label">Rate</label>
                        <LabelInputField ref={"rateRef_" + this.props.index} position="right" labelText={this.props.invoice.currency} contClass="entry-rate-cont-field" value={this.props.entry.rate} fieldChangeCallback={this.updateEntry.bind(this)}/>
                    </div>
                    <div className="td col-amount">
                        <label className="field-label">Amount</label>
                        <div className="currency-cont">{adjustDecimal(this.props.entry.amount)}<span className="currency">{this.props.invoice.currency}</span></div>
                        </div>
                </div>
            </div>

        );
    }
}

Entry.defaultProps = {
    description: "",
    quantity: 0,
    rate: 0,
    amount: 0
}

export default Entry;
