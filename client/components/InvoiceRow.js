import React from 'react'
import { Link } from 'react-router'

import { formattedDate, invoiceStatus } from './../utils'

class InvoiceRow extends React.Component
{
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div className="table-row">
                <span className="td col-no">{this.props.currInvoice.invoiceNo}</span>
                <span className="td col-date">{formattedDate(this.props.currInvoice.invoiceDate)}</span>
                <span className="td col-date">{formattedDate(this.props.currInvoice.invoiceDueDate)}</span>
                <span className="td col-status">{invoiceStatus(this.props.currInvoice.status)}</span>
                <span className="td col-action"><Link to={"/invoice/"
                 + this.props.invoiceIndex}>Edit</Link></span>
            </div>
        );
    }
}

export default InvoiceRow
