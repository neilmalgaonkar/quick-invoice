import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router'

import DatePicker from 'react-datepicker'
import Moment from 'moment'

import Entries from './Entries'
import InvoicePreview from './InvoicePreview'

class Invoice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            invoiceDate: this.props.invoice.invoiceDate,
            invoiceDueDate: this.props.invoice.invoiceDueDate
        };
        this.invoiceDate = {}
        let defaultLogoData = {
            path: "",
            width: 0,
            height: 0
        }
        this.logo = Object.assign({},defaultLogoData, props.invoice.logo)
    }

    updateInvoiceState() {
        console.log(this.logo)
        let entriesCont = this.refs.entriesCont.refs;
        let logoSelected = (this.logo.path === "") ? false : true
        this.invoiceData = {
            invoiceNo: this.refs.invoiceNo.value,
            invoiceTerms: this.refs.invoiceTerms.value,
            invoiceDate: this.state.invoiceDate,
            invoiceDueDate: this.state.invoiceDueDate,
            logoSelected: logoSelected,
            logo: this.logo,
            from : this.refs.from.value,
            to: this.refs.to.value,
            notes: this.refs.notes.value,
            terms: this.refs.termsText.value,
            tax: entriesCont.tax.value,
            discount: entriesCont.discount.value,
            entries: this.props.entries[this.props.invoiceid],
            subtotal: this.subtotal(),
            total: this.totalAmount()
        }
    }

    handleFieldUpdates() {
        this.updateInvoiceState();
        this.props.saveInvoice(this.invoiceData, this.props.invoiceid)
    }

    saveInvoice(e) {
        e.preventDefault()
        this.updateInvoiceState()
        this.props.storeInvoice(this.invoiceData, this.props.invoiceid)
    }

    handleChange(label, date) {
        if(label === 'invoice_date') {
            this.setState({
                invoiceDate: date
            })
        } else {
            this.setState({
                invoiceDueDate: date
            })
        }
    }

    subtotal() {
        let invoiceEntries = this.props.entries[this.props.invoiceid]
        if(invoiceEntries === undefined) {
            return 0
        }
        let amount = invoiceEntries.reduce((totalAmount, entry) => {
            if(isNaN(totalAmount) === undefined)
                totalAmount = 0
            return totalAmount + entry.amount
        }, 0)
        return amount
    }

    totalAmount() {
        let amount = this.subtotal()
        let discount = (amount * this.props.invoice.discount) / 100
        let discountedAmount = amount - discount
        let taxAmount = (discountedAmount * this.props.invoice.tax) / 100
        let finalAmount = taxAmount + discountedAmount
        return finalAmount
    }

    openFileBrowser(e) {
        this.refs.logo_upload_btn.click()
    }

    imageChosen(e) {
        let self = this;
        let files = e.target.files
        if(files.length > 0) {
            let file = files[0]
            let image = new Image()
            let fr = new FileReader()
            fr.onload = (fileLoadedEvent) => {
                let data = fileLoadedEvent.target.result
                image.onload = () => {
                    // console.log(image.width, image.height)
                    let dimensions = this._resize(image)
                    self.logo = {
                        path: data,
                        width: dimensions.imgWidth,
                        height: dimensions.imgHeight
                    }
                    this.handleFieldUpdates()
                }
                image.src = data
            }
            fr.readAsDataURL(file)
        }
    }

    _resize(image) {
        let imgWidth = image.width
        let imgHeight = image.height
        let maxWidth = 200
        let maxHeight = 200
        let ratio = 0

        if(imgWidth > maxWidth) {
            ratio = maxWidth / imgWidth
            imgHeight = imgHeight * ratio
            imgWidth = maxWidth
        }

        if(imgHeight > maxHeight) {
            ratio = maxHeight / imgHeight
            imgHeight = maxHeight
            imgWidth = imgWidth * ratio
        }

        return {
            imgWidth,
            imgHeight
        }
    }

    previewInvoice(e) {
        e.preventDefault()
        this.props.toggleOverlay()
        ReactDOM.render(<InvoicePreview {...this.props}/>, document.getElementById('popup-container'))
    }

    render() {
        return (
            <div className="invoice-container">
                <form ref="invoiceForm" className="invoice-form" onChange={this.updateInvoiceState.bind(this)} onSubmit={this.saveInvoice.bind(this)}>
                    <div className="header-cont">
                        <Link to="/" className="button goto-home" >&lt; Back</Link>
                        <h1 className="header">Invoice</h1>
                        <div className="invoice-btn-cont">
                            <button className="button preview-invoice" onClick={this.previewInvoice.bind(this)}>Preview</button>
                            <button className="button save-invoice" type="submit">Save Invoice</button>
                        </div>
                    </div>
                    <div className="invoice-info-header">
                        {/*<div className="row">
                            <div className="col1">
                                <div className="logo-placeholder" onClick={this.openFileBrowser.bind(this)}>
                                    <input type="file" ref="logo_upload_btn" className="logo-upload-btn" onChange={this.imageChosen.bind(this)}/>
                                    <span className="upload-btn-text">+ Add Logo</span>
                                    <div className="img-cont">
                                        <span className="cls-btn">x</span>

                                        <img src={this.props.invoice.logo.path} className="logo" width={this.props.invoice.logo.width} height={this.props.invoice.logo.height} ref="logo"/>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                        <div className="row">
                            <div className="col1">
                                <div className="field-grp">
                                    <label for="invoiceNo" className="field-label">Invoice No</label>
                                    <input id="inviceNo" type="text" className="input" ref="invoiceNo" placeholder="Invoice Number" defaultValue={this.props.invoice.invoiceNo}/>
                                </div>
                            </div><div className="col2">
                                <div className="field-grp">
                                    <label for="invoiceTerms" className="field-label">Invoice Terms</label>
                                    <input type="text" className="input" ref="invoiceTerms" id="invoiceTerms" placeholder="Invoice Terms" defaultValue={this.props.invoice.invoiceTerms}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col1">
                                <div className="field-grp">
                                    <label className="field-label">Invoice Date</label>
                                    <DatePicker ref="invoiceDate" selected={Moment(this.state.invoiceDate)} placeholderText="Invoice Date" onChange={this.handleChange.bind(this, 'invoice_date')}/>
                                </div>
                            </div><div className="col2">
                                <div className="field-grp">
                                    <label className="field-label">Invoice Terms</label>
                                    <DatePicker ref="invoiceDueDate" selected={Moment(this.state.invoiceDueDate)} placeholderText="Invoice Due Date" onChange={this.handleChange.bind(this, 'invoice_due_date')}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col1">
                                <div className="field-grp">
                                    <label for="from" className="field-label">From</label>
                                    <textarea ref="from" placeholder="Invoice from? (required)" id="from" defaultValue={this.props.invoice.from}></textarea>
                                </div>
                            </div><div className="col2">
                                <div className="field-grp">
                                    <label for="to" className="field-label">To</label>
                                    <textarea ref="to" id="to" placeholder="Invoice to? (required)" defaultValue={this.props.invoice.to}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-entries">
                        <Entries ref="entriesCont" {...this.props} subtotal={this.subtotal()} total={this.totalAmount()} handleFieldUpdates={this.handleFieldUpdates.bind(this)}/>
                    </div>
                    <div className="invoice-info-footer">
                        <div className="field-grp">
                            <label for="notes" className="field-label"> Notes</label>
                            <textarea ref="notes" id="notes" placeholder="Notes for invoice" defaultValue={this.props.invoice.notes}></textarea>
                        </div>
                        <div className="field-grp">
                            <label for="termsText" className="field-label">Terms</label>
                            <textarea ref="termsText" id="termsText" placeholder="Terms for invoice" defaultValue={this.props.invoice.terms}></textarea>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Invoice.defaultProps = {
    invoice: {
        currency: "USD",
        invoiceNo: "",
        invoiceTerms: "",
        invoiceDate: Moment(),
        invoiceDueDate: Moment(),
        logo: {
            path: "",
            width: 0,
            height: 0
        },
        logoSelected: false,
        from: "",
        to: "",
        notes: "",
        terms: "",
        to: "",
        entries: [],
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        status: "draft"
    }
}

export default Invoice;
