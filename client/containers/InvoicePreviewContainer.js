import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InvoicePreview from './../components/Preview/InvoicePreview'

const InvoicePreviewContainer = (props, dispatch) => {
    return (
        <InvoicePreview invoice={props.invoice} entries={props.entries} />
    )
}

const mapStatesToProps = (state, ownProps) => {
    return {
        invoice: ownProps.invoice,
        entries: ownProps.entries
    }
}


export default connect(mapStatesToProps)(InvoicePreviewContainer)
