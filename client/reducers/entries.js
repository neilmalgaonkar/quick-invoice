export function entries(state = {}, action) {
    switch(action.type) {
        case 'SAVE_INVOICE':
            return {
                ...state,
                [action.invoiceid]: action.entries
            }
        default:
            return state
    }
}
