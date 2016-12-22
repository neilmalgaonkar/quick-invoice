import React from 'react'
import _ from 'lodash'

import Invoice from './Invoice'

class InvoiceContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let invoice = this.props.invoices[this.props.params.invoiceid]
        let invoiceEntries = this.props.entries[this.props.params.invoiceid]
        return (<div><Invoice invoice={invoice} invoiceEntries={invoiceEntries} invoiceid={this.props.params.invoiceid} {...this.props}/></div>)
    }
}

export default InvoiceContainer
