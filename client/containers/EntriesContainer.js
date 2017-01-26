import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addEntry, updateEntry, removeEntry, reorderEntries } from './../actions/actionCreators'

import EntryList from './../components/Entries/EntryList'

class EntriesContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <EntryList ref={this.props.entriesCont} subtotal={this.props.subtotal}
                total={this.props.total}
                invoice={this.props.invoice}
                invoiceEntries={this.props.invoiceEntries}
                addEntry={this.props.addEntry}
                updateEntry={this.props.updateEntry}
                removeEntry={this.props.removeEntry}
                reorderEntries={this.props.reorderEntries}
                ref={this.props.childRef}
                invoiceId={this.props.invoiceId}
                saveInvoice={this.props.saveInvoice}/>
        )
    }
}

const mapStatesToProps = (state, ownProps) => {
    return {
        subtotal: ownProps.subtotal,
        total: ownProps.total,
        invoice: ownProps.invoice,
        invoiceEntries: ownProps.invoiceEntries,
        entriesCont: ownProps.entriesCont,
        invoiceId: ownProps.invoiceId
    }
}

const mapDispatchToActions = (dispatch) => {
    return bindActionCreators({
        addEntry,
        updateEntry,
        removeEntry,
        reorderEntries
    }, dispatch)
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        childRef: ownProps.childRef,
        saveInvoice: ownProps.saveInvoice
    }
}

export default connect(mapStatesToProps, mapDispatchToActions, mergeProps)(EntriesContainer)
