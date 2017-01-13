import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
                ref={this.props.childRef} />
        )
    }
}

const mapStatesToProps = (state, ownProps) => {
    return {
        subtotal: ownProps.subtotal,
        total: ownProps.total,
        invoice: ownProps.invoice,
        invoiceEntries: ownProps.invoiceEntries,
        entriesCont: ownProps.entriesCont
    }
}

const mapDispatchToActions = (dispatch, ownProps) => {
    return bindActionCreators({
    }, dispatch)
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        childRef: ownProps.childRef,
        addEntry: ownProps.addEntry,
        updateEntry: ownProps.updateEntry,
        removeEntry: ownProps.removeEntry
    }
}

export default connect(mapStatesToProps, mapDispatchToActions, mergeProps)(EntriesContainer)
