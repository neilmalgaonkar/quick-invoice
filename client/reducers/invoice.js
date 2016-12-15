export function invoices(state = [], action) {
    switch(action.type) {
        case 'SAVE_INVOICE':
            console.log("completed action")
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
        if(invoices[action.invoiceIndex] === undefined) {
            return [
                ...invoices,
                action.invoice
            ];
        } else {
            return invoices.map((invoice, index) => index == action.invoiceIndex ? action.invoice : invoice)
        }
    }
}
