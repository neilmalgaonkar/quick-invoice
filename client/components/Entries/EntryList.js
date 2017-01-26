import React, { PropTypes } from 'react'

import Entry from './Entry';
import LabelInputField from './../UI/LabelInputField'

import listStyles from './entries.styl'

class EntryList extends React.Component {
    constructor(props) {
        super(props)
    }

    toggleClsBtn() {
        return (this.props.invoiceEntries.length == 1? 'hide-cls-btn' : '')
    }

    addItem(e) {
        e.preventDefault()
        this.props.addEntry(this.props.invoiceId, {
            description: "",
            quantity: 0,
            rate: 0,
            amount: 0
        })
        this.props.saveInvoice()
    }

    removeItem(e) {
        e.preventDefault()
    }

    renderEntries() {
        return this.props.invoiceEntries.map((entry, index) => {
            return (<Entry key={index} index={index} entry={entry} {...this.props} invoiceId={this.props.invoiceId} updateEntry={this.props.updateEntry} removeEntry={this.props.removeEntry} reorderEntries={this.props.reorderEntries} saveInvoice={this.props.saveInvoice}/>)
        })
    }

    render() {
        return (<div className="entries-cont">
                <div className="entries-table">
                    <div className="table-header">
                        <span className="th col-item">Item</span>
                        <span className="th col-quantity">Quantity</span>
                        <span className="th col-rate">Rate</span>
                        <span className="th col-amount">Amount</span>
                    </div>
                    <div className="responsive-table-header"><h1>Entries</h1></div>
                    <div className={`entries ${this.toggleClsBtn()} `}>
                        {this.renderEntries()}
                    </div>
                    <a href="" className="add-item button" onClick={this.addItem.bind(this)}>Add Item</a>
                </div>
                <div className="invoice-amount-info">
                    <div className="amount-table">
                        <div className="table-row">
                            <div className="col1"><label>Subtotal</label></div>
                            <div className="col2 bg"><div className="currency-cont">{this.props.subtotal}<span className="currency">{this.props.invoice.currency}</span></div></div>
                        </div>
                        <div className="table-row">
                            <div className="col1"><label>Discount</label></div>
                            <div className="col2">
                                <LabelInputField ref="discountRef" position="right" fieldType="text" labelText="%" contClass="discount-field-cont" value={this.props.invoice.discount}/>
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="col1"><label>Tax</label></div>
                            <div className="col2">
                                <LabelInputField ref="taxRef" position="right" fieldType="text" labelText="%" value={this.props.invoice.tax} contClass="tax-field-cont"/>
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="col1"><label>Total Amount</label></div>
                            <div className="col2 bg"><div className="currency-cont">{this.props.total}<span className="currency">{this.props.invoice.currency}</span></div></div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default EntryList;
