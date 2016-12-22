import React from 'react'

import Entry from './Entry';
import LabelInputField from './LabelInputField'

class Entries extends React.Component {
    constructor(props) {
        super(props)
    }

    toggleClsBtn() {
        return (this.props.invoiceEntries.length == 1? 'hide-cls-btn' : '')
    }

    addItem(e) {
        if(e !== undefined)
            e.preventDefault()
        this.props.addEntry(Entry.defaultProps);
    }

    removeItem(e) {
        e.preventDefault()
    }

    renderEntries() {
        return this.props.invoiceEntries.map((entry, index) => <Entry key={index} index={index} entry={entry} {...this.props}/>)
    }

    render() {
        return(
            <div className="entries-cont">
                <div className="entries-table">
                    <div className="table-header">
                        <span className="th col-item">Item</span>
                        <span className="th col-quantity">Quantity</span>
                        <span className="th col-rate">Rate</span>
                        <span className="th col-amount">Amount</span>
                    </div>
                    <div className={`entries ${this.toggleClsBtn()} `}>
                        {this.renderEntries()}
                    </div>
                    <a href="" className="add-item button" onClick={this.addItem.bind(this)}>Add Item</a>
                </div>
                <div className="invoice-amount-info">
                    <div className="amount-table">
                        <div className="table-row">
                            <div className="col1"><label>Subtotal</label></div>
                            <div className="col2"><div className="currency-cont">{this.props.subtotal}<span className="currency">{this.props.invoice.currency}</span></div></div>
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
                            <div className="col2"><div className="currency-cont">{this.props.total}<span className="currency">{this.props.invoice.currency}</span></div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Entries;
