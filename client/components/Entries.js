import React from 'react'

import Entry from './Entry';

class Entries extends React.Component {
    constructor(props) {
        super(props)
        if(props.entries[props.invoiceid] === undefined) {
            this.addItem();
        }
    }

    toggleClsBtn() {
        if(this.props.entries[this.props.invoiceid] === undefined) {
            return ''
        }
        return (this.props.entries[this.props.invoiceid].length == 1? 'hide-cls-btn' : '')
    }

    addItem(e) {
        if(e !== undefined)
            e.preventDefault()
        this.props.addEntry(Entry.defaultProps, this.props.invoiceid);
    }

    removeItem(e) {
        e.preventDefault()
    }

    renderEntries() {
        if(this.props.entries[this.props.invoiceid] === undefined) {
            return;
        }
        return this.props.entries[this.props.invoiceid].map((entry, index) => <Entry key={index} index={index} entry={entry} removeItem={this.removeItem.bind(this)} {...this.props}/>)
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
                            <div className="col2"><div className="currency-cont">{this.props.subtotal}</div></div>
                        </div>
                        <div className="table-row">
                            <div className="col1"><label>Discount</label></div>
                            <div className="col2"><input type="text" ref="discount" className="rtl" defaultValue={this.props.invoice.discount} onChange={this.props.handleFieldUpdates} /></div>
                        </div>
                        <div className="table-row">
                            <div className="col1"><label>Tax</label></div>
                            <div className="col2"><input type="text" ref="tax" className="rtl" defaultValue={this.props.invoice.tax} onChange={this.props.handleFieldUpdates}/></div>
                        </div>
                        <div className="table-row">
                            <div className="col1"><label>Total Amount</label></div>
                            <div className="col2"><div className="currency-cont">{this.props.total}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Entries;
