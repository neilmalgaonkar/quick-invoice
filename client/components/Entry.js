import React from 'react'

import LabelInputField from './LabelInputField'

class Entry extends React.Component {
    constructor(props) {
        super(props);
    }

    remove(e) {
        e.preventDefault()
        // this.props.removeItem(this.props.index);
        this.props.removeEntry(this.props.invoiceid, this.props.index)
    }

    updateEntry() {
        let index = this.props.index
        let entry = {
            description: this.refs['description_' + index].value,
            rate: this.refs['rateRef_' + index].refs.labelField.value,
            quantity: this.refs['quantityRef_' + index].refs.labelField.value,
            amount: 0
        }
        this.props.updateEntry(this.props.invoiceid, entry, index);
    }

    render(){
        return (
            <div className="table-row">
                <a href="" className="cls-btn" onClick={this.remove.bind(this)}>x</a>
                <div className="td col-item"><input type="text" ref={"description_" + this.props.index} placeholder="Item description" defaultValue={this.props.entry.description} onChange={this.updateEntry.bind(this)}/></div>
                <div className="td col-quantity">
                    {/*<input type="number" step="any" ref={"quantity_" + this.props.index} placeholder="Quantity" defaultValue={this.props.entry.quantity} onChange={this.updateEntry.bind(this)}/>*/}
                    <LabelInputField ref={"quantityRef_" + this.props.index} position="right" labelText={this.props.invoice.quantity} contClass="entry-quantity-cont-field" value={this.props.entry.quantity} labelText="hrs" fieldChangeCallback={this.updateEntry.bind(this)}/>
                </div>
                <div className="td col-rate">
                    {/*<input type="number" step="any" ref={"rate_" + this.props.index} placeholder="Rate" defaultValue={this.props.entry.rate} onChange={this.updateEntry.bind(this)}/> */}
                    <LabelInputField ref={"rateRef_" + this.props.index} position="right" labelText={this.props.invoice.currency} contClass="entry-rate-cont-field" value={this.props.entry.rate} fieldChangeCallback={this.updateEntry.bind(this)}/>
                </div>
                <div className="td col-amount"><div className="currency-cont">{this.props.entry.amount}<span className="currency">{this.props.invoice.currency}</span></div></div>
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
