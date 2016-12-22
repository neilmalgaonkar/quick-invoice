export function invoices(state = [], action) {
    switch(action.type) {
        case 'SAVE_INVOICE':
            return saveInvoice(state, action);
        default:
            return state
    }
}

function saveInvoice(invoices, action) {
    // return invoices;
    if(invoices.length == 0) {
        return [
            action.invoice
        ];
    } else {
        if(invoices[action.invoiceid] === undefined) {
            return [
                ...invoices,
                action.invoice
            ];
        } else {
            return invoices.map((invoice, index) => index == action.invoiceid ? action.invoice : invoice)
        }
    }
}
