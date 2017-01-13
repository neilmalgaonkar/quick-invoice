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

export function adjustDecimal(number, uptoDecimal = 2) {
    let parsedNumber = parseFloat(number)
    let parsedUptoDecimal = parseInt(uptoDecimal)
    if(number === undefined || isNaN(parsedNumber)) {
        return number
    }

    if(isNaN(parsedUptoDecimal)) {
        parsedUptoDecimal = 2;
    }

    number = number.toString()
    let splitNumberArr = number.split('.', 2)
    let decimal = "00";
    if(splitNumberArr.length > 1) {
        decimal = splitNumberArr[1].toString().slice(0, 2)
    }
    return splitNumberArr[0] + "." + decimal;
}
