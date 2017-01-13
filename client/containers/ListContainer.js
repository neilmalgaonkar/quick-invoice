import React from 'react'

import { connect } from 'react-redux'

import List from './../components/InvoiceList/List'

const ListContainer = (props) => {
    return (
        <List invoices={props.invoices}/>
    )
}

const mapsStateToProps = (state) => {
    return {
        invoices: state.invoices
    }
}

export default connect(mapsStateToProps)(ListContainer)
