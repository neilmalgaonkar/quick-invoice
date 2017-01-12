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
                <span className="td col-no"><Link to={"/invoice/"
                 + this.props.invoiceIndex} className="view-link">{this.props.currInvoice.invoiceNo}</Link></span>
                <span className="td col-date">{formattedDate(this.props.currInvoice.invoiceDate)}</span>
                <span className="td col-date col-due-date">{formattedDate(this.props.currInvoice.invoiceDueDate)}</span>
                <span className="td col-action"><Link to={"/invoice/"
                 + this.props.invoiceIndex} className="view-link">View</Link></span>
            </div>
        );
    }
}

export default InvoiceRow
