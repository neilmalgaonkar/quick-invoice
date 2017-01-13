import React from 'react'
import ReactDOM from 'react-dom'

import _ from 'lodash'
import validator from 'validator'

import { Link } from 'react-router'
import Moment from 'moment'

import DatePicker from 'react-datepicker'
import EntriesContainer from './../../containers/EntriesContainer'
import Entry from './../Entries/Entry'
import InvoicePreviewContainer from './../../containers/InvoicePreviewContainer'
import LabelInputField from './../UI/LabelInputField'

import { adjustDecimal } from './../../utils'

import invoiceStyles from './invoice.styl'

class Invoice extends React.Component
{
    constructor(props) {
        super(props)
        this.hasFormModified = false
        this.state = {
            invoice: props.invoice,
            invoiceEntries: props.invoiceEntries,
            ui: {
                invoiceModified: false
            }
        }

        this.dates = {
            invoiceDate: props.invoice.invoiceDate,
            incoice: props.invoice.invoiceDueDate
        }

        this.entries = (props.invoiceEntries === undefined) ? [] : props.invoiceEntries

        let defaultLogoData = {
            path: "",
            width: 0,
            height: 0
        }
        this.logo = Object.assign({},defaultLogoData, props.invoice.logo)
        this.autoSaveInterval = 0
    }

    componentWillMount() {
        let self = this
        this.autoSaveInterval = setInterval(function() {
            if(self.hasFormModified)
                self.autoStore()
        }, 7000)
    }

    componentWillUnmount() {
        clearInterval(this.autoSaveInterval)
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.ui.notificationAutoVisible && nextProps.ui.notificationAutoVisible) {
            this._hideAutosaveNotification()
        }
        this.setState({
            invoice: nextProps.invoice,
            invoiceEntries: nextProps.invoiceEntries
        })
    }

    autoStore() {
        this.storeInvoice()
    }

    onSubmitInvoice(e) {
        e.preventDefault()
        if(!this.hasFormModified)
            return
        this.storeInvoice()
    }

    storeInvoice() {
        let {invoice, entries} = this._gatherFormData()
        this.hasFormModified = false
        this.setState({
            ui: {
                invoiceModified: false
            }
        })
        this.props.storeInvoice(invoice, entries, this.props.invoiceid)
        this.props.showAutosaveNotification()
    }

    saveInvoice() {
        let {invoice, entries} = this._gatherFormData()
        this.hasFormModified = true
        this.setState({
            ui: {
                invoiceModified: true
            }
        })
        this.props.saveInvoice(invoice, entries, this.props.invoiceid)
    }

    previewInvoice(e) {
        e.preventDefault()
        this.props.toggleOverlay()
        ReactDOM.render(<InvoicePreviewContainer store={this.context.store} invoice={this.props.invoice} entries={this.props.invoiceEntries}/>, document.getElementById('popup-container'))
    }

    addEntry(entry) {
        this.entries.push(entry)
        this.saveInvoice()
    }

    updateEntry(updatedEntry, entryIndex) {
        if(this.entries[entryIndex] !== undefined) {
            this.entries = this.entries.map((entry, index) => index == entryIndex ? updatedEntry : entry)
            this.saveInvoice()
        }
    }

    removeEntry(entryIndex) {
        if(this.entries[entryIndex] !== undefined) {
            this.entries = [
                ...this.entries.splice(0, entryIndex),
                ...this.entries.splice(entryIndex + 1)
            ]
            this.saveInvoice()
        }
    }

    handleDateChange(label, date) {
        if(label === 'invoice_date') {
            this.dates.invoiceDate = date;
        } else {
            this.dates.invoiceDueDate = date
        }
        this.saveInvoice()
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
                    let dimensions = this._resize(image)
                    self.logo = {
                        path: data,
                        width: dimensions.imgWidth,
                        height: dimensions.imgHeight
                    }
                    this.saveInvoice()
                }
                image.src = data
            }
            fr.readAsDataURL(file)
        }
    }

    downloadPdf() {
        this.refs.hiddenForm.submit();
    }

    _hideAutosaveNotification() {
        let self = this
        setTimeout(function() {
            self.props.hideAutosaveNotification()
        }, 2000)
    }

    _hasFormModified() {
        let { invoice, entries } = this._gatherFormData()
        let currentInvoice = {
            ...invoice,
            'entries': entries
        }
        let propsInvoice = {
            ...this.props.invoice,
            'entries': this.props.invoiceEntries
        }
        let serializedInvoice = JSON.stringify(currentInvoice);
        let propsSerializedInvoice = JSON.stringify(propsInvoice)
        if(serializedInvoice === propsSerializedInvoice) {
            return false
        }
        return true
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

    _gatherFormData() {
        // let entriesCont = this.refs.entriesCont.refs.entriesList
        let entriesCont = this.childRef.refs
        let discount = entriesCont.discountRef.refs.labelField.value
        let tax = entriesCont.taxRef.refs.labelField.value
        let totalAmount = this._total(this.entries, tax, discount)

        let invoice = {
            invoiceNo: this.refs.invoiceNoRef.refs.labelField.value,
            invoiceTerms: this.refs.invoiceTerms.value,
            currency: this.refs.currency.value,
            tax: entriesCont.taxRef.refs.labelField.value,
            discount: entriesCont.discountRef.refs.labelField.value,
            subtotal: this._subTotal(this.entries),
            total: totalAmount,
            invoiceDate: this.dates.invoiceDate,
            invoiceDueDate: this.dates.invoiceDueDate,
            from : validator.escape(this.refs.from.value),
            to: validator.escape(this.refs.to.value),
            notes: validator.escape(this.refs.notes.value),
            terms: validator.escape(this.refs.termsText.value),
            logo: this.logo
        }

        let entries = this.entries;

        return {
            invoice,
            entries
        }
    }

    _subTotal(entries) {
        if(entries.length == 0) {
            return 0
        }
        let amount = entries.reduce((totalAmount, entry) => {
            return totalAmount + entry.amount
        }, 0)
        return adjustDecimal(amount)
    }

    _total(entries, tax, discount) {
        let amount = this._subTotal(entries)
        let calcDiscount = (amount * discount) / 100
        let discountedAmount = amount - calcDiscount
        let taxAmount = (discountedAmount * tax) / 100
        let finalAmount = taxAmount + discountedAmount
        return adjustDecimal(finalAmount)
    }

    render() {
        return (
            <div>
                <form ref="hiddenForm" method="POST" action={_GENERATE_PDF_} target="_blank">
                    <input type="hidden" name="invoice" value={JSON.stringify(this.state.invoice)}/>
                    <input type="hidden" name="entries" value={JSON.stringify(this.state.invoiceEntries)}/>
                </form>
                <div className="invoice-tool-bar">
                    <div className="invoice-tool-bar-cont">
                        <button className="button preview-invoice " onClick={this.previewInvoice.bind(this)}>Preview</button>
                        <button className={`button save-invoice ${(this.state.ui.invoiceModified) ? '' : 'disable'}`} type="submit">Save Invoice</button>
                        <button className={`button download-invoice ${(this.state.ui.invoiceModified) ? 'disable' : ''}`} onClick={(e) => {
                            if(!this.state.ui.invoiceModified)
                                this.downloadPdf.bind(this)()
                        }}>Download</button>
                    </div>
                </div>
                <div className="invoice-container">
                    <form ref="invoiceForm" className="invoice-form" onChange={this.saveInvoice.bind(this)} onSubmit={this.onSubmitInvoice.bind(this)}>
                        <div className="header-cont">
                            <Link to="/" className="button goto-home" >&lt; Back</Link>
                            {/*<h1 className="header">Invoice</h1>
                            <div className="invoice-btn-cont">
                                <button className="button preview-invoice " onClick={this.previewInvoice.bind(this)}>Preview</button>
                                <button className={`button save-invoice ${(this.state.ui.invoiceModified) ? '' : 'disable'}`} type="submit">Save Invoice</button>
                            </div> */}
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
                            </div> */}
                            <div className="row">
                                <div className="col1">
                                    <div className="field-grp">
                                        <label htmlFor="invoiceNo" className="field-label">Invoice No</label>
                                        <LabelInputField ref="invoiceNoRef" position="left" fieldType="text" labelText="#" contClass="invoice-no-field-cont" value={this.state.invoice.invoiceNo}/>
                                    </div>
                                </div><div className="col2">
                                    <div className="field-grp">
                                        <label htmlFor="invoiceTerms" className="field-label">Invoice Terms</label>
                                        <input type="text" className="input" ref="invoiceTerms" id="invoiceTerms" placeholder="Invoice Terms" defaultValue={this.state.invoice.invoiceTerms}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col1">
                                    <div className="field-grp">
                                        <label className="field-label">Invoice Date</label>
                                        <DatePicker ref="invoiceDate" selected={Moment(this.state.invoice.invoiceDate)} placeholderText="Invoice Date" onChange={this.handleDateChange.bind(this, 'invoice_date')}/>
                                    </div>
                                </div><div className="col2">
                                    <div className="field-grp">
                                        <label className="field-label">Invoice Terms</label>
                                        <DatePicker ref="invoiceDueDate" selected={Moment(this.state.invoice.invoiceDueDate)} placeholderText="Invoice Due Date" onChange={this.handleDateChange.bind(this, 'invoice_due_date')}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col1">
                                    <div className="field-grp">
                                        <label htmlFor="from" className="field-label">From</label>
                                        <textarea ref="from" placeholder="Invoice from? (required)" id="from" defaultValue={validator.unescape(this.state.invoice.from)}></textarea>
                                    </div>
                                </div><div className="col2">
                                    <div className="field-grp">
                                        <label htmlFor="to" className="field-label">To</label>
                                        <textarea ref="to" id="to" placeholder="Invoice to? (required)" defaultValue={validator.unescape(this.state.invoice.to)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col1">
                                    <div className="field-grp">
                                        <label htmlFor="currency" className="field-label">Currency</label>
                                        <input type="text" className="input" ref="currency" id="currency" placeholder="Invoice Currency" defaultValue={this.state.invoice.currency}/>
                                    </div>
                                </div>
                                <div className="col2"></div>
                            </div>
                        </div>
                        <div className="invoice-entries">
                            <EntriesContainer ref="entriesCont" childRef={component => this.childRef = component } subtotal={this.state.invoice.subtotal} total={this.state.invoice.total} invoice={this.state.invoice} invoiceEntries={this.state.invoiceEntries} addEntry={this.addEntry.bind(this)} updateEntry={this.updateEntry.bind(this)} removeEntry={this.removeEntry.bind(this)}/>
                        </div>
                        <div className="invoice-info-footer">
                            <div className="field-grp">
                                <label htmlFor="notes" className="field-label"> Notes</label>
                                <textarea ref="notes" id="notes" placeholder="Notes for invoice" defaultValue={validator.unescape(this.state.invoice.notes)}></textarea>
                            </div>
                            <div className="field-grp">
                                <label htmlFor="termsText" className="field-label">Terms</label>
                                <textarea ref="termsText" id="termsText" placeholder="Terms for invoice" defaultValue={validator.unescape(this.state.invoice.terms)}></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
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
        entries: [{
            description: "",
            quantity: 0,
            rate: 0,
            amount: 0
        }],
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        status: "draft"
    },
    invoiceEntries: [Entry.defaultProps]
}

Invoice.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default Invoice
