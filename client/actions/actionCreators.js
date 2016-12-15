import Promise from 'bluebird'

export function storeInvoice(invoice, invoiceIndex) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            try {
                let entries = invoice.entries;
                delete invoice.entries;
                storeArrayLocally("invoices", invoice, invoiceIndex)
                storeObjectLocally("entries", entries, invoiceIndex)
                invoice['entries'] = entries
                dispatch(saveInvoice(invoice, invoiceIndex))
                resolve(invoice)
            } catch(err) {
                console.log(err)
                resolve(invoice)
            }
        })
    }
}

function storeArrayLocally(key, data, dataIndex) {
    let serializedData = localStorage.getItem(key)
    if(serializedData == null) {
        serializedData = JSON.stringify([data])
        localStorage.setItem(key, serializedData)
    } else {
        let jsonData = JSON.parse(serializedData)
        jsonData[dataIndex] = data
        localStorage.setItem(key, JSON.stringify(jsonData))
    }
}

function storeObjectLocally(key, data, dataIndex) {
    let serializedData = localStorage.getItem(key)
    if(serializedData == null) {
        let obj = {}
        obj[dataIndex] = data
        serializedData = JSON.stringify(obj)
        localStorage.setItem(key, serializedData)
    } else {
        let jsonData = JSON.parse(serializedData)
        let jsonRecord = jsonData[dataIndex]
        jsonData[dataIndex] = data
        localStorage.setItem(key, JSON.stringify(jsonData))
    }
}

export function saveInvoice(invoice, invoiceIndex) {
    return {
        type: 'SAVE_INVOICE',
        invoice,
        invoiceIndex
    }
}

export function addEntry(entry, invoiceid) {
    return {
        type: 'ADD_ENTRY',
        entry,
        invoiceid
    };
}

export function updateEntry(invoiceid, entry, index) {
    return {
        type: 'UPDATE_ENTRY',
        invoiceid,
        entry,
        index
    }
}

export function removeEntry(invoiceno, index) {
    return {
        type: 'REMOVE_ENTRY',
        invoiceno,
        index
    }
}
