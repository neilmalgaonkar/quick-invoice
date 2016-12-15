import React from 'react'

class Entry extends React.Component {
    constructor(props) {
        super(props);
    }

    remove(e) {
        e.preventDefault()
        // this.props.removeItem(this.props.index);
        this.props.removeEntry(this.props.invoiceid, this.props.index)
    }

    updateEntry() {
        let index = this.props.index
        let entry = {
            description: this.refs['description_' + index].value,
            rate: this.refs['rate_' + index].value,
            quantity: this.refs['quantity_' + index].value,
            amount: 0
        }
        this.props.updateEntry(this.props.invoiceid, entry, index);
    }

    render(){
        return (
            <div className="table-row">
                <a href="" className="cls-btn" onClick={this.remove.bind(this)}>x</a>
                <div className="td col-item"><input type="text" ref={"description_" + this.props.index} placeholder="Item description" defaultValue={this.props.entry.description} onChange={this.updateEntry.bind(this)}/></div>
                <div className="td col-quantity"><input type="number" step="any" ref={"quantity_" + this.props.index} placeholder="Quantity" defaultValue={this.props.entry.quantity} onChange={this.updateEntry.bind(this)}/></div>
                <div className="td col-rate"><input type="number" step="any" ref={"rate_" + this.props.index} placeholder="Rate" defaultValue={this.props.entry.rate} onChange={this.updateEntry.bind(this)}/></div>
                <div className="td col-amount"><span className="amount">{this.props.entry.amount}</span></div>
            </div>
        );
    }
}

Entry.defaultProps = {
    description: "",
    quantity: 0,
    rate: 0,
    amount: 0
}

export default Entry;
