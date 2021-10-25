import {GET_RECODE_PROCESSION} from "../actions/ActionType"

const initialState = {
    recodePro:[]
}

const recodePro =  (state = initialState, action) => {
    switch (action.type) {
        case GET_RECODE_PROCESSION:
            return {
                data:action.data
            }
        default:
            return state
    }
}
export default recodePro