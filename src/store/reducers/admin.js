import {GET_ADMIN_INFO} from "../actions/ActionType"

const initialState = {
    adminInfo : []
}

const admin =  (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMIN_INFO:
            return {
                adminInfo : action.data
            }
        default:
            return state
    }
}
export default admin