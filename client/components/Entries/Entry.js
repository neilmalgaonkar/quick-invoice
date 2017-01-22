import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

import ItemTypes from './../../Constants'

import { DragSource, DropTarget } from 'react-dnd'

import _ from 'lodash'
import validator from 'validator'

import { adjustDecimal } from './../../utils'

import LabelInputField from './../UI/LabelInputField'

const entryDragSourceSpec = {
    beginDrag: function(props, monitor, component) {
        let componentDom = findDOMNode(component)
        let clientRect = componentDom.getBoundingClientRect()
        return {
            index: props.index,
            invoiceId: props.invoiceId,
            height: clientRect.height
        }
    },
    endDrag: function(props, monitor, component) {
        let dropResult = monitor.getDropResult()
        if(dropResult !== null) {
            props.reorderEntries(props.invoiceId, dropResult.oldEntryIndex, dropResult.newEntryIndex)
        }
    },
    isDragging: function(props, monitor) {
        return (props.index === monitor.getItem().index)
    }
}

function entryDragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const entryDropTargetSpec = {
    drop: function(props, monitor, component) {
        let dragProps = monitor.getItem()
        return {
            newEntryIndex: props.index,
            oldEntryIndex: dragProps.index,
            invoiceId: props.invoiceId
        }
    },
    hover: function(props, monitor, component) {
        let currentEntryIndex = props.index
        let dragEntryIndex = monitor.getItem().index
        let hoverComponent = findDOMNode(component)
        let hoverClientRect = hoverComponent.getBoundingClientRect()
        let dragSourceOffset = monitor.getSourceClientOffset()
        let dragComponentHalfHeight = monitor.getItem().height / 2
        let hoverClientHalfHeight = hoverClientRect.height / 2
        let dragSwapHeight = dragSourceOffset.y + dragComponentHalfHeight
        let hoverSwapHeight = hoverClientRect.y + hoverClientHalfHeight

        if(dragEntryIndex === currentEntryIndex) {
            return
        }

        if(dragEntryIndex < currentEntryIndex && dragSwapHeight <= hoverSwapHeight) {
            return
        }

        props.reorderEntries(props.invoiceId, dragEntryIndex, currentEntryIndex)
        monitor.getItem().index = currentEntryIndex
    }
}

function entryDropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Entry extends React.Component {
    constructor(props) {
        super(props);
    }

    remove(e) {
        e.preventDefault()
        this.props.removeEntry(this.props.index)
    }

    updateEntry() {
        let index = this.props.index
        let rate = !isNaN(this.refs['rateRef_' + index].refs.labelField.value) ? this.refs['rateRef_' + index].refs.labelField.value : 0
        let quantity = !isNaN(this.refs['quantityRef_' + index].refs.labelField.value) ? this.refs['quantityRef_' + index].refs.labelField.value : 0
        let amount = rate * quantity
        let entry = {
            description: validator.escape(this.refs['description_' + index].value),
            rate: rate,
            quantity: quantity,
            amount: amount
        }
        this.props.updateEntry(entry, index);
    }

    render(){
        const { connectDragSource, connectDropTarget, isDragging } = this.props
        return connectDropTarget(connectDragSource(
            <div className="table-row">
                <div className="row-view-cont">
                    <div className="row-view">
                        <a href="" className="cls-btn" onClick={this.remove.bind(this)}>x</a>
                        <div className="td col-item">
                            <label htmlFor={"description_" + this.props.index}className="field-label">Description</label>
                            <div className="item-description-cont">
                                <div className="dnd-marker-cont"><div className="dnd-marker"><span className="up-dot"></span><span className="bottom-dot"></span></div></div>
                                <input type="text" ref={"description_" + this.props.index} placeholder="Item description" value={validator.unescape(this.props.entry.description)} onChange={this.updateEntry.bind(this)}/>
                            </div>
                        </div>
                        <div className="td col-quantity">
                            <label htmlFor={"quantity_" + this.props.index}className="field-label">Quantity</label>
                            <LabelInputField ref={"quantityRef_" + this.props.index} position="right" labelText={this.props.invoice.quantity} contClass="entry-quantity-cont-field" value={this.props.entry.quantity} labelText="hrs" fieldChangeCallback={this.updateEntry.bind(this)}/>
                        </div>
                        <div className="td col-rate">
                            <label htmlFor={"rate_" + this.props.index}className="field-label">Rate</label>
                            <LabelInputField ref={"rateRef_" + this.props.index} position="right" labelText={this.props.invoice.currency} contClass="entry-rate-cont-field" value={this.props.entry.rate} fieldChangeCallback={this.updateEntry.bind(this)}/>
                        </div>
                        <div className="td col-amount">
                            <label className="field-label">Amount</label>
                            <div className="currency-cont">{adjustDecimal(this.props.entry.amount)}<span className="currency">{this.props.invoice.currency}</span></div>
                            </div>
                    </div>
                </div>
            </div>

        ));
    }
}

Entry.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

Entry.defaultProps = {
    description: "",
    quantity: 0,
    rate: 0,
    amount: 0
}

export default _.flow(
    DropTarget(ItemTypes.ENTRY, entryDropTargetSpec, entryDropCollect),
    DragSource(ItemTypes.ENTRY, entryDragSourceSpec, entryDragCollect)
)(Entry);
