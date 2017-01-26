import Promise from 'bluebird'

export function storeInvoice(invoice, entries, invoiceid) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            try {
                storeArrayLocally("invoices", invoice, invoiceid)
                storeObjectLocally("entries", entries, invoiceid)
                dispatch(saveInvoice(invoice, entries, invoiceid))
                resolve(invoice)
            } catch(err) {
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

export function saveInvoice(invoice, invoiceid) {
    return {
        type: 'SAVE_INVOICE',
        invoice,
        invoiceid
    }
}

export function addEntry(invoiceid, entry) {
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

export function removeEntry(invoiceid, index) {
    return {
        type: 'REMOVE_ENTRY',
        invoiceid,
        index
    }
}

export function reorderEntries(invoiceid, oldEntryIndex, newEntryIndex) {
    return {
        type: 'REORDER_ENTRIES',
        invoiceid,
        oldEntryIndex,
        newEntryIndex
    }
}

export function toggleOverlay() {
    return {
        type: 'TOGGLE_OVERLAY'
    }
}

export function showAutosaveNotification() {
    return {
        type: 'SHOW_AUTO_SAVE_NOTIFICATION'
    }
}

export function hideAutosaveNotification() {
    return {
        type: 'HIDE_AUTO_SAVE_NOTIFICATION'
    }
}
