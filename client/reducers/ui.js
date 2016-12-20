export function ui(state = {}, action) {
    let defaultState = {
        overlay: false
    }
    switch(action.type) {
        case 'TOGGLE_OVERLAY':
            return {
                ...state,
                overlay: !state.overlay
            }
        default:
            return defaultState
    }
}
