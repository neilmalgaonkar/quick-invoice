import _ from 'lodash'

export function ui(state = {}, action) {
    let defaultState = {
        overlay: false,
        notificationAutoVisible: false
    }
    switch(action.type) {
        case 'TOGGLE_OVERLAY':
            return {
                ...state,
                overlay: !state.overlay
            }
        case 'SHOW_AUTO_SAVE_NOTIFICATION':
            return {
                ...state,
                notificationAutoVisible: true
            }
        case 'HIDE_AUTO_SAVE_NOTIFICATION':
            return {
                ...state,
                notificationAutoVisible: false
            }
        default:
            if(_.isEmpty(state)){
                return defaultState
            } else {
                return state
            }
    }
}
