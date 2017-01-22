import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './../actions/actionCreators'

import Invoice from './../components/Invoice/Invoice'

const InvoiceContainer = (props) => {
    return (
        <Invoice invoice={props.invoice} invoiceEntries={props.invoiceEntries} invoiceid={props.invoiceid} toggleOverlay={props.toggleOverlay} hideAutosaveNotification={props.hideAutosaveNotification} saveInvoice={props.saveInvoice} storeInvoice={props.storeInvoice} showAutosaveNotification={props.showAutosaveNotification} ui={props.ui} />
    )
}

const mapStatesToProps = (state, ownProps) => {
    return {
        invoice: state.invoices[ownProps.params.invoiceid],
        invoiceid: ownProps.params.invoiceid,
        invoiceEntries: state.entries[ownProps.params.invoiceid],
        ui: state.ui
    }
}

const mapDispatchToActions = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStatesToProps, mapDispatchToActions)(InvoiceContainer)
