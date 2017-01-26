import update from 'react/lib/update';
export function entries(state = {}, action) {
    let invoiceid, entries;
    switch(action.type) {
        case 'ADD_ENTRY':
            invoiceid = action.invoiceid
            entries = (state[invoiceid] === undefined) ? [] : state[invoiceid]
            entries.push(action.entry)
            return {
                ...state,
                [invoiceid]: entries
            }
        case 'UPDATE_ENTRY':
            invoiceid = action.invoiceid
            entries = state[invoiceid]
            if(entries === undefined) {
                return {
                    ...state
                }
            }
            entries[action.index] = action.entry
            return {
                ...state,
                [invoiceid]: entries
            }
        case 'REMOVE_ENTRY':
            invoiceid = action.invoiceid
            entries = state[invoiceid]
            if(entries === undefined) {
                return {
                    ...state
                }
            }

            let entry = entries[action.index]
            if(entry === undefined) {
                return {
                    ...state
                }
            }
            entries = [
                ...entries.slice(0, action.index),
                ...entries.slice(action.index+1)
            ]
            console.log("remove ", entries)
            return {
                ...state,
                [invoiceid]: entries
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
