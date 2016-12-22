import React from 'react'

import { Link } from 'react-router'

import InvoiceRow from './InvoiceRow'

class List extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="list-container">
                <h1 className="list-header">Your Invoices</h1>
                <Link to={"/new/" + (this.props.invoices.length)} className="button new-invoice">New Invoice</Link>
                <div className="invoice-list-table">
                    <div className="table-header">
                        <span className="th col-no">Invoice No</span>
                        <span className="th col-date">Issue Date</span>
                        <span className="th col-date col-due-date">Due Date</span>
                        <span className="th col-status">Status</span>
                        <span className="th col-action">Action</span>
                    </div>
                {this.props.invoices.map((invoice, index) => {
                    if(invoice != null){
                        return <InvoiceRow key={index} invoiceIndex={index} currInvoice={invoice} {...this.props} />
                    }
                })}
                </div>
                <div className="responsive-invoice-list-table"></div>
            </div>
        )
    }
}

List.defaultProps = {
    invoices: []
}

export default List;
