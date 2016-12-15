import React from 'react'
import _ from 'lodash'

import Invoice from './Invoice'

class InvoiceContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let invoice = false;
        let newInvoiceId = this.props.invoices.length;
        if(this.props.params.invoiceid !== undefined) {
            invoice = this.props.invoices[this.props.params.invoiceid]
            return (<div><Invoice invoice={invoice} invoiceid={this.props.params.invoiceid} {...this.props}/></div>)
        }
        return (<div><Invoice invoiceid={newInvoiceId} {...this.props}/></div>)
    }
}

export default InvoiceContainer
