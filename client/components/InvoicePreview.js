import React from 'react'
import { formattedDate } from './../utils'

class InvoicePreivew extends React.Component {
    constructor(props) {
        super(props);
        this.invoice = this.props.invoices[this.props.params.invoiceid]
        this.entries = this.props.entries[this.props.params.invoiceid]
    }

    renderEntries() {
        return this.entries.map((entry, i) => {
            return (
                <div className="table-row" key={i}>
                    <div className="col-item td"><span className="td-span">{entry.description}</span></div>
                    <div className="col-quantity td"><span className="td-span">{entry.quantity} hrs</span></div>
                    <div className="col-rate td"><div className="currency-cont">{entry.rate}<span className="currency">{this.invoice.currency}</span></div></div>
                    <div className="col-amount td"><div className="currency-cont">{entry.amount}<span className="currency">{this.invoice.currency}</span></div></div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="popup-data invoice-popup-data">
                <h1 className="invoice-header">Invoice</h1>
                <span className="hr"></span>
                <div className="invoice-preview-row">
                    {/*<div className="from-logo-cont">
                        <img src={this.invoice.logo.path} width={this.invoice.logo.width} height={this.invoice.logo.height}/>
                    </div>*/}
                    <div className="address from">
                        <span className="label">From :</span>
                        <p className="text">{this.invoice.from}</p>
                    </div>
                    <div className="address to">
                        <span className="label">To :</span>
                        <p className="text">{this.invoice.to}</p>
                    </div>
                </div>
                <div className="invoice-preview-row">
                    <div className="invoice-meta-info">
                        <div className="meta-row">
                            <div className="col1"><p className="text">Tax Invoice</p></div><
                            div className="col2"><p className="text">{this.invoice.invoiceNo}</p></div>
                        </div>
                        <div className="meta-row">
                            <div className="col1"><p className="text">Invoice Date</p></div><
                            div className="col2"><p className="text">{formattedDate(this.invoice.invoiceDate)}</p></div>
                        </div>
                        <div className="meta-row">
                            <div className="col1"><p className="text">Invoice Due Date</p></div><
                            div className="col2"><p className="text">{formattedDate(this.invoice.invoiceDueDate)}</p></div>
                        </div>
                        <div className="meta-row bg">
                            <div className="col1"><p className="text"><b>Balance Due</b></p></div><
                            div className="col2"><p className="text">{this.invoice.total} {this.invoice.currency}</p></div>
                        </div>
                    </div>
                </div>
                <div className="invoice-preview-row">
                    <div className="invoice-entry-table">
                        <div className="table-header">
                            <div className="col-item th"><span className="th-span">Item</span></div>
                            <div className="col-quantity th"><span className="th-span">Quantity</span></div>
                            <div className="col-rate th"><span className="th-span">Rate</span></div>
                            <div className="col-amount th"><span className="th-span">Amount</span></div>
                        </div>
                        {this.renderEntries()}
                    </div>
                    <div className="invoice-summary-info">
                        <span className="hr"></span>
                        <div className="invoice-meta-info">
                            <div className="meta-row">
                                <div className="col1"><p className="text">Subtotal</p></div><
                                div className="col2"><p className="text">{this.invoice.subtotal} {this.invoice.currency}</p></div>
                            </div>
                            <div className="meta-row">
                                <div className="col1"><p className="text">Tax</p></div><
                                div className="col2"><p className="text">{this.invoice.tax}%</p></div>
                            </div>
                            <div className="meta-row">
                                <div className="col1"><p className="text">Discount</p></div><
                                div className="col2"><p className="text">{this.invoice.discount}%</p></div>
                            </div>
                            <div className="meta-row">
                                <div className="col1"><p className="text">Total</p></div><
                                div className="col2"><p className="text">{this.invoice.total} {this.invoice.currency}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="invoice-preview-row">
                    <div className="notes">
                        <span className="label">Notes :</span>
                        <p className="text">{this.invoice.notes}</p>
                    </div>
                    <div className="terms">
                        <span className="label">Terms :</span>
                        <p className="text">{this.invoice.terms}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default InvoicePreivew
