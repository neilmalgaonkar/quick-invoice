import React from 'react'
import { Link } from 'react-router'

import DatePicker from 'react-datepicker'
import Moment from 'moment'

import Entries from './Entries'

class Invoice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            invoiceDate: this.props.invoice.invoiceDate,
            invoiceDueDate: this.props.invoice.invoiceDueDate
        };
        this.invoiceDate = {}
    }

    updateInvoiceState() {
        let entriesCont = this.refs.entriesCont.refs;
        this.invoiceData = {
            invoiceNo: this.refs.invoiceNo.value,
            invoiceTerms: this.refs.invoiceTerms.value,
            invoiceDate: this.state.invoiceDate,
            invoiceDueDate: this.state.invoiceDueDate,
            from : this.refs.from.value,
            to: this.refs.to.value,
            notes: this.refs.notes.value,
            terms: this.refs.termsText.value,
            tax: entriesCont.tax.value,
            discount: entriesCont.discount.value,
            entries: this.props.entries[this.props.invoiceid],
            subtotal: this.subtotal(),
            total: this.totalAmount()
        }
    }

    handleFieldUpdates() {
        this.updateInvoiceState();
        this.props.saveInvoice(this.invoiceData, this.props.invoiceid)
    }

    saveInvoice(e) {
        e.preventDefault()
        this.updateInvoiceState()
        // this.invoiceData['entries'] = this.props.entries[this.props.invoiceid]
        this.props.storeInvoice(this.invoiceData, this.props.invoiceid)
    }

    handleChange(label, date) {
        if(label === 'invoice_date') {
            this.setState({
                invoiceDate: date
            })
        } else {
            this.setState({
                invoiceDueDate: date
            })
        }
    }

    subtotal() {
        let invoiceEntries = this.props.entries[this.props.invoiceid]
        if(invoiceEntries === undefined) {
            return 0
        }
        let amount = invoiceEntries.reduce((totalAmount, entry) => {
            if(isNaN(totalAmount) === undefined)
                totalAmount = 0
            return totalAmount + entry.amount
        }, 0)
        return amount
    }

    totalAmount() {
        let amount = this.subtotal()
        let discount = (amount * this.props.invoice.discount) / 100
        let discountedAmount = amount - discount
        let taxAmount = (discountedAmount * this.props.invoice.tax) / 100
        let finalAmount = taxAmount + discountedAmount
        return finalAmount
    }

    render() {
        return (
            <div className="invoice-container">
                <form ref="invoiceForm" className="invoice-form" onChange={this.updateInvoiceState.bind(this)} onSubmit={this.saveInvoice.bind(this)}>
                    <div className="header-cont">
                        <Link to="/" className="button goto-home" >&lt; Back</Link>
                        <h1 className="header">Invoice</h1>
                        <button className="button save-invoice" type="submit">Save Invoice</button>
                    </div>
                    <div className="invoice-info-header">
                        <div className="row">
                            <div className="col1">
                                <div className="field-grp">
                                    <input type="text" className="input" ref="invoiceNo" placeholder="Invoice Number" defaultValue={this.props.invoice.invoiceNo}/>
                                </div>
                            </div><div className="col2">
                                <div className="field-grp">
                                    <input type="text" className="input" ref="invoiceTerms" placeholder="Invoice Terms" defaultValue={this.props.invoice.invoiceTerms}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col1">
                                <div className="field-grp">
                                    <DatePicker ref="invoiceDate" selected={Moment(this.state.invoiceDate)} placeholderText="Invoice Date" onChange={this.handleChange.bind(this, 'invoice_date')}/>
                                </div>
                            </div><div className="col2">
                                <div className="field-grp">
                                    <DatePicker ref="invoiceDueDate" selected={Moment(this.state.invoiceDueDate)} placeholderText="Invoice Due Date" onChange={this.handleChange.bind(this, 'invoice_due_date')}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col1">
                                <div className="field-grp">
                                    <textarea ref="from" placeholder="Invoice from? (required)" defaultValue={this.props.invoice.from}></textarea>
                                </div>
                            </div><div className="col2">
                                <div className="field-grp">
                                    <textarea ref="to" placeholder="Invoice to? (required)" defaultValue={this.props.invoice.to}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-entries">
                        <Entries ref="entriesCont" {...this.props} subtotal={this.subtotal()} total={this.totalAmount()} handleFieldUpdates={this.handleFieldUpdates.bind(this)}/>
                    </div>
                    <div className="invoice-info-footer">
                        <div className="field-grp">
                            <textarea ref="notes" placeholder="Notes for invoice" defaultValue={this.props.invoice.notes}></textarea>
                        </div>
                        <div className="field-grp">
                            <textarea ref="termsText" placeholder="Terms for invoice" defaultValue={this.props.invoice.terms}></textarea>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Invoice.defaultProps = {
    invoice: {
        currency: "USD",
        invoiceNo: "",
        invoiceTerms: "",
        invoiceDate: Moment(),
        invoiceDueDate: Moment(),
        from: "",
        to: "",
        notes: "",
        terms: "",
        to: "",
        entries: [],
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        status: "draft"
    }
}

export default Invoice;
