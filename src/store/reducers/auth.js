import {SET_CURRENT_USER,LOG_OUT} from "../actions/ActionType";
import isEmpty from  "lodash/isEmpty"
const initialState = {
    isAuthenticated : false,
    user:{}
}

const auth =  (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { 
                isAuthenticated:!isEmpty(action.user),
                user:action.user
            }
        case LOG_OUT:
            return{
                isAuthenticated:false,
                user:{}
            }
        default:
            return state
    }
}
export default auth