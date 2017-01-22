import update from 'react/lib/update';
export function entries(state = {}, action) {
    switch(action.type) {
        case 'SAVE_INVOICE':
            return {
                ...state,
                [action.invoiceid]: action.entries
            }
        case 'REORDER_ENTRIES':
            let entries = state[action.invoiceid]
            let moveEntry = entries[action.oldEntryIndex]
            let reorderedEntries = update(entries, {
                $splice: [
                    [action.oldEntryIndex, 1],
                    [action.newEntryIndex, 0, moveEntry]
                ]
            })
            return {
                ...state,
                [action.invoiceid]: reorderedEntries
            }
        default:
            return state
    }
}
