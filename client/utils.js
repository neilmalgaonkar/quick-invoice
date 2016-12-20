import Moment from 'moment'

export function getLocalyStoredData() {
    try {
        let invoices = localStorage.getItem("invoices")
        let entries = localStorage.getItem("entries")
        return {
            invoices: (invoices === null) ? [] : JSON.parse(invoices),
            entries: (entries === null) ? {} : JSON.parse(entries)
        }
    } catch(err) {
        return {
            invoices: [],
            entries: {}
        }
    }
}

export function formattedDate(date, format='DD/MM/YYYY') {
    return Moment(date).format(format)
}

export function invoiceStatus(status) {
    if(status === undefined || status == null) {
        return 'draft'
    }
    return status
}
