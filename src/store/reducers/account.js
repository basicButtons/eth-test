import {GET_ACCOUNT,PRIVATE_ACCOUNT,PUBLIC_ACCOUNT} from "../actions/ActionType"

const initialState = {
    username:"",
    publicAccount:0,
    peasonalAccount:0
}

const account =  (state = initialState, action) => {
    switch (action.type) {
        case PRIVATE_ACCOUNT:
            console.log("==mx==1")
            return {
                username:action.data.pea.username,
                publicAccount:state.publicAccount,
                peasonalAccount:action.data.pea.account
            }
        case PUBLIC_ACCOUNT:
            console.log("==mx==2")
            return {
                ...state,
                publicAccount:action.data
            }
        default:
            return state
    }
}
export default account