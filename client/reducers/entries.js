export function entries(state = {}, action) {
    switch(action.type) {
        case 'REMOVE_ENTRY':
            return {
                ...state,
                [action.invoiceid]: removeEntry(state, action)
            }
        case 'ADD_ENTRY':
            return {
                ...state,
                [action.invoiceid]: addEntry(state, action)
            }
        case 'UPDATE_ENTRY':
            return {
                ...state,
                [action.invoiceid]: updateEntry(state, action)
            }
        default:
            return state
    }
}

function addEntry(entries, action) {
    if(entries[action.invoiceid] !== undefined) {
        let invoiceEntries = entries[action.invoiceid]
        return [
            ...invoiceEntries,
            action.entry
        ]
    } else {
        return [
            action.entry
        ]
    }
}

function removeEntry(entries, action) {
    if(entries[action.invoiceid] === undefined) {
        return entries
    } else {
        let invoiceEntries = entries[action.invoiceid]
        return [
            ...invoiceEntries.splice(0, action.index),
            ...invoiceEntries.splice(action.index + 1)
        ]
    }
}

function updateEntry(entries, action) {
    if(entries[action.invoiceid] === undefined) {
        return entries;
    } else {
        let invoiceEntries = entries[action.invoiceid]
        let entry = action.entry
        let rate = (isNaN(entry.rate)) ? 0 : entry.rate
        let quantity = (isNaN(entry.quantity)) ? 0 : entry.quantity
        let amount = rate * quantity
        let newEntry = Object.assign({}, action.entry, {
            rate: rate,
            quantity: quantity,
            amount: amount
        });
        if(invoiceEntries[action.index] === undefined) {
            return entries
        } else {
            return invoiceEntries.map((entry, index) => index == action.index ? newEntry : entry)
        }
    }
}
